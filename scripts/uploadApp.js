const aws = require('aws-sdk');
const path = require('path');
const uploadArtifactsToS3 = require('./uploadArtifactsToS3');

const s3 = new aws.S3();

const getObjects = () =>
  new Promise((resolve, reject) => {
    const params = { Bucket: process.env.APP_BUCKET_NAME };
    s3.listObjectsV2(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

const deleteObjects = (objectKeys) =>
  new Promise((resolve, reject) => {
    const done = (data) => {
      console.info(
        `Successfully deleted objects from ${process.env.APP_BUCKET_NAME}`
      );
      resolve(data);
    };

    if (!objectKeys || objectKeys.length === 0) return done();

    const params = {
      Bucket: process.env.APP_BUCKET_NAME,
      Delete: { Objects: objectKeys.map((Key) => ({ Key })) },
    };
    s3.deleteObjects(params, (err, data) => {
      if (err) reject(err);
      else done(data);
    });
  });

(async () => {
  try {
    const { Contents: objects } = await getObjects();
    const objectKeys = objects.map(({ Key }) => Key);

    await deleteObjects(objectKeys);

    await uploadArtifactsToS3(
      path.join(__dirname, '..', 'build'),
      process.env.APP_BUCKET_NAME
    );
  } catch (error) {
    console.error(error.message, error.stack);
    process.exitCode = 1;
  }
})();
