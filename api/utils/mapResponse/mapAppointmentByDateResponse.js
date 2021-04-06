const mapAppointmentByDateResponse = (res) =>
  JSON.parse(res.data.actions[0].returnValue.returnValue).map((item) => ({
    id: item.Id,
    date: item.Date__c,
    startTime: item.SchedStartTime__c,
    endTime: item.SchedEndTime__c,
  }));

module.exports = mapAppointmentByDateResponse;
