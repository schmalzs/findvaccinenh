const isValidZipCode = (zipCode) => /^\d{5}$/.test(zipCode);

const isValidRangeDistance = (rangeDistance) => /^\d+$/.test(rangeDistance);

const isValidDoseType = (doseType) => ['dose-1', 'dose-2'].includes(doseType);

const isValidVaccineType = (vaccineType) =>
  ['all', 'pfizer', 'moderna', 'johnson-and-johnson'].includes(vaccineType);

const isValidDate = (dose1Date) => /^\d{4}-\d{2}-\d{2}$/.test(dose1Date);

const isVaidCounty = (county) =>
  [
    'BELKNAP',
    'CARROLL',
    'CHESHIRE',
    'COOS',
    'GRAFTON',
    'HILLSBOROUGH',
    'MERRIMACK',
    'ROCKINGHAM',
    'STRAFFORD',
    'SULLIVAN',
  ].includes(county);

module.exports = {
  isValidZipCode,
  isValidRangeDistance,
  isValidDoseType,
  isValidVaccineType,
  isValidDate,
  isVaidCounty,
};
