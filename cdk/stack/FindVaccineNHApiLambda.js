const { Role, ServicePrincipal } = require('@aws-cdk/aws-iam');
const { Runtime } = require('@aws-cdk/aws-lambda');
const { NodejsFunction } = require('@aws-cdk/aws-lambda-nodejs');
const { Duration } = require('@aws-cdk/core');

const { DOMAIN_NAME } = process.env;

class FindVaccineNHApiLambda extends NodejsFunction {
  constructor(scope) {
    if (!DOMAIN_NAME) {
      throw new Error('Missing DOMAIN_NAME environment variable');
    }

    super(scope, 'FindVaccineNHApiLambda', {
      functionName: 'FindVaccineNHApiLambda',
      runtime: Runtime.NODEJS_10_X,
      entry: 'api/index.js',
      handler: 'main',
      environment: { DOMAIN_NAME },
      timeout: Duration.seconds(10),
      role: new Role(scope, 'FindVaccineNHApiLambdaRole', {
        assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      }),
    });
  }
}

module.exports = FindVaccineNHApiLambda;
