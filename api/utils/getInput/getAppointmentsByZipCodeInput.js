const BadRequestError = require('../../errors/BadRequestError');
const {
  isValidZipCode,
  isValidRangeDistance,
  isValidDoseType,
  isValidVaccineType,
  isValidDate,
} = require('./validators');

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

  if (!isValidDate(dose1Date)) {
    throw new BadRequestError('Please provide a valid dose 1 date');
  }

  return { zipCode, rangeDistance, doseType, vaccineType, dose1Date };
};

module.exports = getAppointmentsByZipCodeInput;
