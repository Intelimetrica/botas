const uploadToS3 = require('./scripts/upload-s3');
const signGoogleMapsURL = require('./scripts/sign-googlemaps-api');
const downloadImage = require('./scripts/image-download');
const fluentPromise = require('./scripts/fluent-promise');

module.exports = {
  downloadImage,
  fluentPromise,
  signGoogleMapsURL,
  uploadToS3
};
