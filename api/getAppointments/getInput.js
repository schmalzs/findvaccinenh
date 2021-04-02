const BadRequestError = require('../errors/BadRequestError');

const isValidZipCode = (zipCode) => /^\d{5}$/.test(zipCode);

const isValidRangeDistance = (rangeDistance) => /^\d+$/.test(rangeDistance);

const getInput = ({ zipCode, rangeDistance = '20' }) => {
  if (!isValidZipCode(zipCode)) {
    throw new BadRequestError('Please provide a valid zip code');
  }

  if (!isValidRangeDistance(rangeDistance)) {
    throw new BadRequestError('Please provide a valid range distance');
  }

  return { zipCode, rangeDistance };
};

module.exports = getInput;
