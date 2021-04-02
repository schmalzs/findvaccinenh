const { Bucket } = require('@aws-cdk/aws-s3');

const { APP_BUCKET_NAME } = process.env;

class AppBucket extends Bucket {
  constructor(scope, originAccessIdentity) {
    if (!APP_BUCKET_NAME) {
      throw new Error('Missing APP_BUCKET_NAME environment variable');
    }

    super(scope, APP_BUCKET_NAME, {
      bucketName: APP_BUCKET_NAME,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: false,
    });

    this.grantRead(originAccessIdentity);
  }
}

module.exports = AppBucket;
