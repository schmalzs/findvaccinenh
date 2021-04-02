const {
  CloudFrontAllowedMethods,
  CloudFrontWebDistribution,
  OriginProtocolPolicy,
  OriginSslPolicy,
  ViewerCertificate,
  ViewerProtocolPolicy,
} = require('@aws-cdk/aws-cloudfront');
const { Duration } = require('@aws-cdk/core');

const { DOMAIN_NAME } = process.env;

class CloudFrontDistribution extends CloudFrontWebDistribution {
  constructor(scope, appBucket, originAccessIdentity, apiGateway, certificate) {
    if (!DOMAIN_NAME) {
      throw new Error('Missing DOMAIN_NAME environment variable');
    }

    super(scope, 'FindVaccineNHDistribution', {
      originConfigs: [
        {
          s3OriginSource: { s3BucketSource: appBucket, originAccessIdentity },
          behaviors: [
            {
              pathPattern: 'index.html',
              defaultTtl: Duration.millis(0),
              maxTtl: Duration.millis(0),
            },
            { isDefaultBehavior: true },
          ],
        },
        {
          customOriginSource: {
            domainName: apiGateway.url.split('/')[2],
            allowedOriginSSLVersions: [OriginSslPolicy.TLS_V1_2],
            originProtocolPolicy: OriginProtocolPolicy.HTTPS_ONLY,
          },
          behaviors: [
            {
              pathPattern: '/api/*',
              defaultTtl: Duration.millis(0),
              maxTtl: Duration.millis(0),
              allowedMethods: CloudFrontAllowedMethods.ALL,
              forwardedValues: {
                queryString: true,
                cookies: {
                  forward: 'all',
                },
                headers: ['Referer', 'Authorization'],
              },
            },
          ],
        },
      ],
      errorConfigurations: [
        {
          errorCode: 404,
          errorCachingMinTtl: 300,
          responseCode: 200,
          responsePagePath: '/index.html',
        },
      ],
      viewerCertificate: ViewerCertificate.fromAcmCertificate(certificate, {
        aliases: [DOMAIN_NAME, `www.${DOMAIN_NAME}`],
      }),
      viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    });
  }
}

module.exports = CloudFrontDistribution;
