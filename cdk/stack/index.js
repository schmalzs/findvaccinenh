const cdk = require('@aws-cdk/core');
const FindVaccineNHApiLambda = require('./FindVaccineNHApiLambda');
const ApiGateway = require('./ApiGateway');
const AppBucket = require('./AppBucket');
const Certificate = require('./Certificate');
const CloudFrontDistribution = require('./CloudFrontDistribution');
const CloudFrontOriginAccessIdentity = require('./CloudFrontOriginAccessIdentity');

class Stack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const apiLambda = new FindVaccineNHApiLambda(this);

    const apiGateway = new ApiGateway(this, {
      handlers: { api: apiLambda },
    });

    const originAccessIdentity = new CloudFrontOriginAccessIdentity(this);
    const appBucket = new AppBucket(this, originAccessIdentity);

    const certificate = new Certificate(this);

    new CloudFrontDistribution(
      this,
      appBucket,
      originAccessIdentity,
      apiGateway,
      certificate
    );
  }
}

module.exports = Stack;
