const _ = require('lodash');
const redis = require('redis');
const {
  buildAppointmentByGeoLocationPayload,
} = require('./utils/buildPayload');
const {
  getAppointmentsByZipCodeInput,
  getAppointmentsByCountyInput,
} = require('./utils/getInput');
const makeRequest = require('./utils/makeRequest');
const { mapAppointmentByGeoLocationResponse } = require('./utils/mapResponse');
const ZIP_CODES = require('./utils/nhZipCodes');

const CACHE_TTL = 60 * 5; // 5-minutes

let client;

const connectToRedis = () =>
  new Promise((resolve, reject) => {
    client = redis.createClient({
      host: process.env.REDIS_HOSTNAME,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
    });

    client.on('error', reject);
    client.on('ready', resolve);
  });

const getCacheKey = ({
  county,
  rangeDistance,
  doseType,
  vaccineType,
  dose1Date,
}) => `${county}|${rangeDistance}|${doseType}|${vaccineType}|${dose1Date}`;

const getCachedAppointments = (input) =>
  new Promise((resolve, reject) => {
    client.get(getCacheKey(input), async (err, appointments) => {
      if (err) reject(err);
      else resolve(JSON.parse(appointments));
    });
  });

const queryAllAppointments = async (input) => {
  let data = [];

  const zipCodeBatches = _.chunk(ZIP_CODES[input.county], 10);

  for (let batch of zipCodeBatches) {
    const responses = await Promise.all(
      batch.map(async (zipCode) => {
        const payload = buildAppointmentByGeoLocationPayload(
          getAppointmentsByZipCodeInput({ zipCode, ...input })
        );
        const res = await makeRequest(payload);
        return { zipCode, result: mapAppointmentByGeoLocationResponse(res) };
      })
    );

    data = [...data, ...responses];
  }

  const dedupedData = _.chain(data)
    .reduce((acc, { result }) => [...acc, ...result], [])
    .uniqWith((a, b) => a.name === b.name && a.city === b.city)
    .sortBy(['date'])
    .value();

  const cacheKey = getCacheKey(input);
  console.info(`SETTING CACHE VALUE FOR KEY ${cacheKey}`);
  client.setex(cacheKey, CACHE_TTL, JSON.stringify(dedupedData));

  return dedupedData;
};

const getAppointmentsByCounty = async (event) => {
  await connectToRedis();

  const body = JSON.parse(event.body);
  const input = getAppointmentsByCountyInput(body);
  const cachedData = await getCachedAppointments(input);

  const cacheKey = getCacheKey(body);

  if (!!cachedData) {
    console.info(`CACHE HIT ON ${cacheKey}`);
    return cachedData;
  }

  console.info(`CACHE MISS ON ${cacheKey}`);
  return await queryAllAppointments(input);
};

module.exports = getAppointmentsByCounty;
