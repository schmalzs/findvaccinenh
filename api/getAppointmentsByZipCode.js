const buildPayload = require('./utils/buildPayload');
const { getAppointmentsByZipCodeInput } = require('./utils/getInput');
const makeRequest = require('./utils/makeRequest');
const mapResponse = require('./utils/mapResponse');

const getAppointmentsByZipCode = async (event) => {
  const body = JSON.parse(event.body);

  const input = getAppointmentsByZipCodeInput(body);
  const payload = buildPayload(input);
  const res = await makeRequest(payload);
  const records = mapResponse(res);

  return records;
};

module.exports = getAppointmentsByZipCode;
