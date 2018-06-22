'use strict'

const fs = require('fs');
const axios = require('axios');

/**
 * downloadImage
 *
 * @memberof module:Scripts
 * @param {string} url - Url of image to download
 * @param {string} file_path - Complete path to final filename, for example: ~/home/user/Documents/project/download.png
 * @returns {Promise}
 */
async function downloadImage(url, file_path) {
  //axios image download with response type "stream"
  const response = await axios({
    method: 'GET',
    url: url,
    responseType: 'stream'
  });

  // pipe the result stream into a file on disc
  response.data.pipe(fs.createWriteStream(file_path));

  // return a promise and resolve when download finishes
  return new Promise((resolve, reject) => {
    response.data.on('end', () => resolve(file_path));
    response.data.on('error', err => reject(err));
  });

}

module.exports = downloadImage;
