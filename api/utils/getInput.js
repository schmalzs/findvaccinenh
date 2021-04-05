const BadRequestError = require('../errors/BadRequestError');

const isValidZipCode = (zipCode) => /^\d{5}$/.test(zipCode);

const isValidRangeDistance = (rangeDistance) => /^\d+$/.test(rangeDistance);

const isValidDoseType = (doseType) => ['dose-1', 'dose-2'].includes(doseType);

const isValidVaccineType = (vaccineType) =>
  ['all', 'pfizer', 'moderna', 'johnson-and-johnson'].includes(vaccineType);

const isValidDose1Date = (dose1Date) => /^\d{4}-\d{2}-\d{2}$/.test(dose1Date);

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

const getAppointmentsByZipCodeInput = ({
  zipCode,
  rangeDistance = '20',
  doseType = 'dose-1',
  vaccineType = 'all',
  dose1Date = new Date().toISOString().split('T')[0],
}) => {
  if (!isValidZipCode(zipCode)) {
    throw new BadRequestError('Please provide a valid zip code');
  }

  if (!isValidRangeDistance(rangeDistance)) {
    throw new BadRequestError('Please provide a valid range distance');
  }

  if (!isValidDoseType(doseType)) {
    throw new BadRequestError('Please provide a valid dose type');
  }

  if (!isValidVaccineType(vaccineType)) {
    throw new BadRequestError('Please provide a valid vaccine type');
  }

  if (!isValidDose1Date(dose1Date)) {
    throw new BadRequestError('Please provide a valid dose 1 date');
  }

  return { zipCode, rangeDistance, doseType, vaccineType, dose1Date };
};

const getAppointmentsByCountyInput = ({
  county,
  rangeDistance = '5',
  doseType = 'dose-1',
  vaccineType = 'all',
  dose1Date = new Date().toISOString().split('T')[0],
}) => {
  if (!isVaidCounty(county)) {
    throw new BadRequestError('Please provide a valid county');
  }

  if (!isValidRangeDistance(rangeDistance)) {
    throw new BadRequestError('Please provide a valid range distance');
  }

  if (!isValidDoseType(doseType)) {
    throw new BadRequestError('Please provide a valid dose type');
  }

  if (!isValidVaccineType(vaccineType)) {
    throw new BadRequestError('Please provide a valid vaccine type');
  }

  if (!isValidDose1Date(dose1Date)) {
    throw new BadRequestError('Please provide a valid dose 1 date');
  }

  return { county, rangeDistance, doseType, vaccineType, dose1Date };
};

module.exports = {
  getAppointmentsByZipCodeInput,
  getAppointmentsByCountyInput,
};
