const uploadToS3 = require('./scripts/upload-s3');
const signGoogleMapsURL = require('./scripts/sign-googlemaps-api');
const downloadImage = require('./scripts/image-download');
const fluentPromise = require('./scripts/fluent-promise');
const existsInS3 = require('./scripts/already-exists-s3');

module.exports = {
  downloadImage,
  existsInS3,
  fluentPromise,
  signGoogleMapsURL,
  uploadToS3
};
