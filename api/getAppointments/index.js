const buildPayload = require('./buildPayload');
const getInput = require('./getInput');
const makeRequest = require('./makeRequest');
const mapResponse = require('./mapResponse');

const getAppointments = async (event) => {
  const body = JSON.parse(event.body);

  const input = getInput(body);
  const payload = buildPayload(input);
  const res = await makeRequest(payload);
  const records = mapResponse(res);

  return records;
};

module.exports = getAppointments;
