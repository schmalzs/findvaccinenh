const { LambdaIntegration, RestApi } = require('@aws-cdk/aws-apigateway');

class ApiGateway extends RestApi {
  constructor(scope, { handlers }) {
    super(scope, 'FindVaccineNHApi', {
      deployOptions: { stageName: 'api' },
    });

    this.addApiResource(handlers.api);
  }

  addApiResource(handler) {
    const integration = new LambdaIntegration(handler);

    const accounts = this.root.addResource('appointment');

    const county = accounts.addResource('county');
    county.addMethod('POST', integration);

    const zipCode = accounts.addResource('zip-code');
    zipCode.addMethod('POST', integration);

    const location = accounts.addResource('location');
    location.addMethod('POST', integration);

    const date = accounts.addResource('date');
    date.addMethod('POST', integration);
  }
}

module.exports = ApiGateway;
