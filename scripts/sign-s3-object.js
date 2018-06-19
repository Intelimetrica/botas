/**
 * Random scripts
 * @module Scripts
 */
'use strict'
/* *
 * Signature generating algorithm: (extracted from https://docs.aws.amazon.com/AmazonS3/latest/dev/RESTAuthentication.html#RESTAuthenticationQueryStringAuth)
 * 1. Create a string_to_sign containing the http verb, time to expire in
 *    seconds since epoch and route to object - for example:
 *    "GET\n\n\n1528921484\n/bucketname/object.png"
 *
 *    Note: use the same amount of line breaks, since they are headers. We
 *    are not taking them into consideration right now. Maybe later...
 * 2. Sign the string_to_sign using HMAC-SHA1 and the AWS secretAccessKey
 * 3. Encode the result into Base64
 * 4. Make resulting binary Url-safe
 * 5. Use this signature as the ?Signature= param in the url
 *
 * 6. You migh also need to add AWSAccessKeyId= and Expires= params to the url.
 *    At the end, the url will look like the following:
 *    https://s3.aws.com/bucket/obj.png?AWSAccessKeyId=XXXX&Signature=YYYY&Expires=12345
 * */
const crypto = require('crypto');
const { parse, format } = require('url');

const encodeBase64Hash = (key, data) => crypto
  .createHmac('sha1', key)
  .update(data)
  .digest('base64');

const expiracyIn = seconds => Math.floor(Date.now()/1000) + seconds;

/**
 * signS3Object
 *
 * @param {string} s3_domain - for example https://s3-west.aws.com
 * @param {string} s3_bucket
 * @param {string} s3_object_key
 * @param {string} AWSAccessKeyId
 * @param {string} AWSSecretAccessKey
 * @param {number} secs_to_expire - Number of seconds in which signature will expire
 *                                  this param is set to 120secs by default
 * @returns {string} - signed url to s3 object
 */
const signS3Object = (s3_domain, s3_bucket, s3_object_key, AWSAccessKeyId, AWSSecretAccessKey, secs_to_expire=120) => {
  let time_to_expire = expiracyIn(secs_to_expire);
  let string_to_sign = `GET\n\n\n${time_to_expire}\n/${s3_bucket}/${s3_object_key}`;

  let signature = encodeURIComponent(
    encodeBase64Hash(AWSSecretAccessKey, string_to_sign)
  );

  return `${s3_domain}/${s3_bucket}/${s3_object_key}?AWSAccessKeyId=${AWSAccessKeyId}&Signature=${signature}&Expires=${time_to_expire}`;
}

module.exports = signS3Object;

