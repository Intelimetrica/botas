'use strict'

const AWS = require("aws-sdk");

/**
 * Uploads a file S3.
 * In order to use this method you should have AWS_ACCESS_KEY_ID and
 * AWS_SECRET_ACCESS_KEY env variables set in the process.env
 *
 * @param {string} filename - Filename of Object to be uploaded. Must contain extension
 * @param {Binary string} content - File content in a Binary string.
 * @param {string} permission - Object's permission. "private" by default. Available options private | public-read | public-read-write | authenticated-read | aws-exec-read | bucket-owner-read | bucket-owner-full-control
 * @param {string} AWS_region - Bucket's AWS region. https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html
 * @param {string} AWS_bucket - AWS Bucket name.
 *
 * @returns {Promise}
 */
const uploadToS3 = (filename, content, permission="private", AWS_region, AWS_bucket) => {
  if (!content) return Promise.reject("Content cannot be empty");
  if (!AWS_region) return Promise.reject("AWS REGION is required");
  if (!params.Bucket || !params.Key) return Promise.reject("AWS_bucket and filename cannot be empty");

  let params = {
    Key: filename,
    ACL: permission,
    Body: content,
    Bucket: AWS_bucket
  };

  const s3 = new AWS.S3({region: AWS_region});

  return s3.putObject(params).promise();
}

module.exports = uploadToS3;
