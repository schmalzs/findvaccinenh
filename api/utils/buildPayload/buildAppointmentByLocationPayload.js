const qs = require('qs');
const { mapDose1Date, mapDoseType, mapVaccineType } = require('./mappers');

const buildAppointmentByLocationPayload = ({
  locationId,
  vaccineType,
  doseType,
  dose1Date,
}) => {
  const message = JSON.stringify({
    actions: [
      {
        id: '262;a',
        descriptor: 'aura://ApexActionController/ACTION$execute',
        callingDescriptor: 'UNKNOWN',
        params: {
          namespace: '',
          classname: 'AppointmentCalendarController',
          method: 'getAppointments',
          params: {
            clinicLocationId: locationId,
            manufacturerName: mapVaccineType(vaccineType),
            doseType: mapDoseType(doseType),
            dose1Date: mapDose1Date(dose1Date),
          },
          cacheable: false,
          isContinuation: false,
        },
      },
    ],
  });

  const context = JSON.stringify({
    mode: 'PROD',
    fwuid: 'Q8onN6EmJyGRC51_NSPc2A',
    app: 'siteforce:communityApp',
    loaded: {
      'APPLICATION@markup://siteforce:communityApp': 'XrAWq7KlNf8wSyobBsPNEA',
      'COMPONENT@markup://force:listViewManagerDisplayActionConfiguration':
        'K0MPL_LwOy2sSjXr4ZDwQA',
      'COMPONENT@markup://force:outputField': 'AicR8X3GofV-uF385LcFAg',
    },
    dn: [],
    globals: {},
    uad: false,
  });

  const pageUri = '/providers/s/appointmentschedule';

  return qs.stringify({
    message,
    'aura.context': context,
    'aura.pageURI': pageUri,
    'aura.token': '',
  });
};

module.exports = buildAppointmentByLocationPayload;
