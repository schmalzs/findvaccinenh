const { Role, ServicePrincipal } = require('@aws-cdk/aws-iam');
const { Runtime } = require('@aws-cdk/aws-lambda');
const { NodejsFunction } = require('@aws-cdk/aws-lambda-nodejs');
const { Duration } = require('@aws-cdk/core');

const { DOMAIN_NAME, REDIS_HOSTNAME, REDIS_PORT, REDIS_PASSWORD } = process.env;

class FindVaccineNHApiLambda extends NodejsFunction {
  constructor(scope) {
    if (!DOMAIN_NAME) {
      throw new Error('Missing DOMAIN_NAME environment variable');
    }

    if (!REDIS_HOSTNAME || !REDIS_PORT || !REDIS_PASSWORD) {
      throw new Error('Missing redis environment variable(s)');
    }

    super(scope, 'FindVaccineNHApiLambda', {
      functionName: 'FindVaccineNHApiLambda',
      runtime: Runtime.NODEJS_10_X,
      entry: 'api/index.js',
      handler: 'main',
      environment: { DOMAIN_NAME, REDIS_HOSTNAME, REDIS_PORT, REDIS_PASSWORD },
      timeout: Duration.seconds(120),
      role: new Role(scope, 'FindVaccineNHApiLambdaRole', {
        assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      }),
    });
  }
}

module.exports = FindVaccineNHApiLambda;
