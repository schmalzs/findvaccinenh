const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('./errors/BadRequestError');
const getAppointmentsByCounty = require('./getAppointmentsByCounty');
const getAppointmentsByDate = require('./getAppointmentsByDate');
const getAppointmentsByLocation = require('./getAppointmentsByLocation');
const getAppointmentsByZipCode = require('./getAppointmentsByZipCode');
const respond = require('./utils/respond');

exports.main = async (event) => {
  try {
    const { httpMethod, resource } = event;
    const operation = `${httpMethod} ${resource}`;

    switch (operation) {
      case 'POST /appointment/county': {
        const body = await getAppointmentsByCounty(event);
        return respond({
          statusCode: StatusCodes.OK,
          body,
        });
      }

      case 'POST /appointment/zip-code': {
        const body = await getAppointmentsByZipCode(event);
        return respond({
          statusCode: StatusCodes.OK,
          body,
        });
      }

      case 'POST /appointment/location': {
        const body = await getAppointmentsByLocation(event);
        return respond({
          statusCode: StatusCodes.OK,
          body,
        });
      }

      case 'POST /appointment/date': {
        const body = await getAppointmentsByDate(event);
        return respond({
          statusCode: StatusCodes.OK,
          body,
        });
      }

      default: {
        return respond({
          statusCode: StatusCodes.BAD_REQUEST,
          body: `Unsupported operation: ${operation}`,
        });
      }
    }
  } catch (error) {
    console.error(`${error.message}\n${error.stack}`);

    if (error instanceof BadRequestError) {
      return respond({
        statusCode: StatusCodes.BAD_REQUEST,
        body: 'Invalid input',
      });
    }

    return respond({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: 'Unexpected error',
    });
  }
};
