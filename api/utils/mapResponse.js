const _ = require('lodash');

const mapResponse = (res) => {
  const { LocationInfo } = JSON.parse(
    res.data.actions[0].returnValue.returnValue
  );

  return _.chain(LocationInfo)
    .map((location) => ({
      date: _.get(location, 'VMS_Service_Appointments__r.records[0].Date__c'),
      city: _.get(location, 'VAMS_City__c', '').toUpperCase(),
      name: _.get(location, 'Name', '').toUpperCase(),
    }))
    .filter((record) => !!record.date)
    .sortBy(['date'])
    .value();
};

module.exports = mapResponse;
