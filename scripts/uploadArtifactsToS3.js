const aws = require('aws-sdk');
const fs = require('fs');
const mime = require('mime-types');
const path = require('path');

const s3 = new aws.S3();

const walkSync = (currentDirPath, callback) => {
  fs.readdirSync(currentDirPath).forEach((name) => {
    const filePath = path.join(currentDirPath, name);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      callback(filePath, stat);
    } else if (stat.isDirectory()) {
      walkSync(filePath, callback);
    }
  });
};

module.exports = (directory, bucketName) => {
  walkSync(directory, async (filePath) => {
    const bucketPath = filePath.substring(directory.length + 1);
    const params = {
      Bucket: bucketName,
      Key: bucketPath,
      Body: fs.readFileSync(filePath),
      ContentType: mime.lookup(filePath),
    };

    try {
      await s3.putObject(params).promise();
      console.log(`Successfully uploaded ${bucketPath} to ${bucketName}`);
    } catch (error) {
      console.error(`error in uploading ${bucketPath} to ${bucketName}`);
      throw new Error(`error in uploading ${bucketPath} to ${bucketName}`);
    }
  });
};
