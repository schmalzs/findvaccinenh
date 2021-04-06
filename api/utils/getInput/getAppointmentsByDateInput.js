const BadRequestError = require('../../errors/BadRequestError');
const {
  isValidDoseType,
  isValidVaccineType,
  isValidDate,
} = require('./validators');

const getAppointmentsByDateInput = ({
  locationId,
  date,
  doseType = 'dose-1',
  vaccineType = 'all',
}) => {
  if (!locationId) {
    throw new BadRequestError('Please provide a valid location id');
  }

  if (!isValidDate(date)) {
    throw new BadRequestError('Please provide a valid date');
  }

  if (!isValidDoseType(doseType)) {
    throw new BadRequestError('Please provide a valid dose type');
  }

  if (!isValidVaccineType(vaccineType)) {
    throw new BadRequestError('Please provide a valid vaccine type');
  }

  return { locationId, date, doseType, vaccineType };
};

module.exports = getAppointmentsByDateInput;
