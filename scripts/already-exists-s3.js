'use strict'

const AWS = require("aws-sdk");

/**
 * Checks if a file exists in S3.
 * In order to use this method you should have AWS_ACCESS_KEY_ID and
 * AWS_SECRET_ACCESS_KEY env variables set in the process.env
 *
 * @param {string} filename - Filename of Object to be checked. Must contain extension.
 * @param {string} AWS_region - Bucket's AWS region. https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html
 * @param {string} AWS_bucket - AWS Bucket name.
 *
 * @returns {Promise}
 */
const existsInS3 = (filename, AWS_region, AWS_bucket) => {
  if (!AWS_region) return Promise.reject("AWS REGION is required");
  if (!AWS_bucket) return Promise.reject("AWS Bucket is required");
  if (!filename) return Promise.reject("filename with extension is required");

  const s3 = new AWS.S3({region: AWS_region});

  return s3.headObject({
    Bucket: AWS_bucket,
    Key: filename
  }, (err, meta) => {
    if (err && err.code === "NotFound") {
      console.log(`${filename} Key does not exist in Bucket`)
      return false;
    } else {
      console.log(`${filename} found`)
      return true;
    }
  });
}

module.exports = existsInS3;
