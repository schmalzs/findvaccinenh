const { OriginAccessIdentity } = require('@aws-cdk/aws-cloudfront');

class CloudFrontOriginAccessIdentity extends OriginAccessIdentity {
  constructor(scope) {
    super(scope, 'FindVaccineNHOriginAccessIdentity');
  }
}

module.exports = CloudFrontOriginAccessIdentity;
