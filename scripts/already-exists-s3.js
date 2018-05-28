'use strict'

const AWS = require("aws-sdk");
const fs = require("fs");

const format_params = (params, content) => {
  if (!params.Bucket || !params.Key) return false;

  return {
    Bucket: params.Bucket,
    Key: params.Key // Filename with extension
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
const existsInS3 = (params) => {
  if (!params.region) return Promise.reject("AWS REGION is required");
  if (!params.Bucket) return Promise.reject("AWS Bucket is required");
  if (!params.Key) return Promise.reject("AWS Key is required");

  const s3 = new AWS.S3({region: params.region});

  return s3.headObject({
    Bucket: params.Bucket,
    Key: params.Key
  }, (err, meta) => {
    if (err && err.code === "NotFound") {
      //console.log(err)
      console.log(`${params.Key} Key does not exist in Bucket`)
      return false;
    } else {
      console.log(`${params.Key} found`)
      //console.log(meta);
      return true;
    }
  });
}

module.exports = existsInS3;
