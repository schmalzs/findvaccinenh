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
    accounts.addMethod('POST', integration);
  }
}

module.exports = ApiGateway;
