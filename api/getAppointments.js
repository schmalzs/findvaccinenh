const buildPayload = require('./utils/buildPayload');
const { getAppointmentsInput } = require('./utils/getInput');
const makeRequest = require('./utils/makeRequest');
const mapResponse = require('./utils/mapResponse');

const getAppointments = async (event) => {
  const body = JSON.parse(event.body);

  const input = getAppointmentsInput(body);
  const payload = buildPayload(input);
  const res = await makeRequest(payload);
  const records = mapResponse(res);

  return records;
};

module.exports = getAppointments;
