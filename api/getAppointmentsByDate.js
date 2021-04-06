const { buildAppointmentByDatePayload } = require('./utils/buildPayload');
const { getAppointmentsByDateInput } = require('./utils/getInput');
const makeRequest = require('./utils/makeRequest');
const { mapAppointmentByDateResponse } = require('./utils/mapResponse');

const getAppointmentByDate = async (event) => {
  const body = JSON.parse(event.body);
  const input = getAppointmentsByDateInput(body);
  const payload = buildAppointmentByDatePayload(input);
  const res = await makeRequest(payload);
  return mapAppointmentByDateResponse(res);
};

module.exports = getAppointmentByDate;
