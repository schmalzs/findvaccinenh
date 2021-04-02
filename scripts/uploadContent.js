// const { program } = require('commander');
const path = require('path');
const uploadArtifactsToS3 = require('./uploadArtifactsToS3');

// program
//   .option('-d, --directory <directory>', 'directory to upload')
//   .option('-e, --extension <extension>', 'file extensions to upload');
// program.parse(process.argv);

(async () => {
  try {
    await uploadArtifactsToS3(
      path.join(__dirname, '..', '..', 'dauntless-content'),
      process.env.CONTENT_BUCKET_NAME
    );
  } catch (error) {
    console.error(error.message, error.stack);
    process.exitCode = 1;
  }
})();
