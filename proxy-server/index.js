const aws = require('aws-sdk');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const { LOCAL_CONTENT_DIRECTORY, CONTENT_BUCKET_NAME } = process.env;

const s3 = new aws.S3();

const PORT = 3000;

const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:3002',
    changeOrigin: true,
    pathRewrite: { '^/api': '/' },
  })
);

app.use(
  '/content',
  LOCAL_CONTENT_DIRECTORY
    ? express.static(LOCAL_CONTENT_DIRECTORY)
    : async (req, res) => {
        const object = await s3
          .getObject({
            Bucket: CONTENT_BUCKET_NAME,
            Key: req.originalUrl.substr(1), // remove leading `/` character
          })
          .promise();

        res.contentType(object.ContentType).send(object.Body);
      }
);

app.use(
  '*',
  createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true })
);

app.listen(PORT, () => console.info(`Proxy server running on port ${PORT}`));
