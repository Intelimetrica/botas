'use strict'

const AWS = require("aws-sdk");
const fs = require("fs");

const format_params = (params, content) => {
  if (!params.Bucket || !params.Key) return false;

  return {
    Bucket: params.Bucket,
    Key: params.Key, // Filename with extension
    Body: content,
    ACL: params.ACL || "private"
  }
};


/**
 * uploadToS3
 *
 * @param params = {
 *   +Bucket: S3 Bucket name,
 *   +Key: Filename WITH extension,
 *   -ACL: File permissions. If not provided will be set to private,
 *   +region: AWS REGION
 * }
 * @param content = File content
 * @returns {Promise}
 */
const uploadToS3 = (params, content) => {
  if (!content) return Promise.reject("Content cannot be empty");
  if (!params.region) return Promise.reject("AWS REGION is required");

  const params_formatted = format_params(params, content);
  if (!params_formatted) return Promise.reject("S3 Params missing");

  const s3 = new AWS.S3({region: params.region});

  return s3.putObject(params_formatted).promise()
    .then(data => {
      console.log(data);
      console.log(`${params.Key} uploaded to s3`);
      //process.exit(0);
    }).catch(err => {
      console.log("Error uploading the file to S3")
      console.log(err);
      //process.exit(4);
    });
}

module.exports = uploadToS3;
