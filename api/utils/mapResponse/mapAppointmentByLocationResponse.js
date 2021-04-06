const mapAppointmentByLocationResponse = (res) =>
  JSON.parse(res.data.actions[0].returnValue.returnValue).map(
    (item) => item.Date__c
  );

module.exports = mapAppointmentByLocationResponse;
