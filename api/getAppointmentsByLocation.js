const { buildAppointmentByLocationPayload } = require('./utils/buildPayload');
const { getAppointmentsByLocationInput } = require('./utils/getInput');
const makeRequest = require('./utils/makeRequest');
const { mapAppointmentByLocationResponse } = require('./utils/mapResponse');

const getAppointmentByLocation = async (event) => {
  const body = JSON.parse(event.body);
  const input = getAppointmentsByLocationInput(body);
  const payload = buildAppointmentByLocationPayload(input);
  const res = await makeRequest(payload);
  return mapAppointmentByLocationResponse(res);
};

module.exports = getAppointmentByLocation;
