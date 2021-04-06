const {
  buildAppointmentByGeoLocationPayload,
} = require('./utils/buildPayload');
const { getAppointmentsByZipCodeInput } = require('./utils/getInput');
const makeRequest = require('./utils/makeRequest');
const { mapAppointmentByGeoLocationResponse } = require('./utils/mapResponse');

const getAppointmentsByZipCode = async (event) => {
  const body = JSON.parse(event.body);

  const input = getAppointmentsByZipCodeInput(body);
  const payload = buildAppointmentByGeoLocationPayload(input);
  const res = await makeRequest(payload);
  const records = mapAppointmentByGeoLocationResponse(res);

  return records;
};

module.exports = getAppointmentsByZipCode;
