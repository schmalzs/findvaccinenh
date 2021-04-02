const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('./errors/BadRequestError');
const getAppointments = require('./getAppointments');
const respond = require('./utils/respond');

exports.main = async (event) => {
  try {
    const { httpMethod, resource } = event;
    const operation = `${httpMethod} ${resource}`;

    switch (operation) {
      case 'POST /appointment': {
        const body = await getAppointments(event);
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
