const BadRequestError = require('../../errors/BadRequestError');
const {
  isValidDoseType,
  isValidVaccineType,
  isValidDate,
} = require('./validators');

const getAppointmentsByLocationInput = ({
  locationId,
  doseType = 'dose-1',
  vaccineType = 'all',
  dose1Date = new Date().toISOString().split('T')[0],
}) => {
  if (!locationId) {
    throw new BadRequestError('Please provide a valid location id');
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

  return { locationId, doseType, vaccineType, dose1Date };
};

module.exports = getAppointmentsByLocationInput;
