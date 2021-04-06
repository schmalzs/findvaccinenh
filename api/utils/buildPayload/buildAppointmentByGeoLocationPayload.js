const qs = require('qs');
const { mapDose1Date, mapDoseType, mapVaccineType } = require('./mappers');

const buildAppointmentByGeoLocationPayload = ({
  zipCode,
  rangeDistance,
  doseType,
  vaccineType,
  dose1Date,
}) => {
  const message = JSON.stringify({
    actions: [
      {
        id: '789;a',
        descriptor: 'aura://ApexActionController/ACTION$execute',
        callingDescriptor: 'UNKNOWN',
        params: {
          namespace: '',
          classname: 'VMS_AppointmentScheduleCtrl',
          method: 'geocodeAddress',
          params: {
            inputAddress: zipCode,
            rangeDistance: Number(rangeDistance),
            manuName: mapVaccineType(vaccineType),
            doseType: mapDoseType(doseType),
            dose1Date: mapDose1Date(dose1Date),
            doLocSearch: true,
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
      'COMPONENT@markup://forceCommunity:objectHome': 'zpGLKfzW65h00DHvPTeqsg',
    },
    dn: [],
    globals: {},
    uad: false,
  });

  const pageUri =
    '/providers/s/appointmentschedule?cancelAppointmentId=a2Qt0000000xdtvEAA&recipientId=001t000000dDhIeAAK';

  return qs.stringify({
    message,
    'aura.context': context,
    'aura.pageURI': pageUri,
    'aura.token': '',
  });
};

module.exports = buildAppointmentByGeoLocationPayload;
