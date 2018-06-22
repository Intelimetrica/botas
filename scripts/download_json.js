'use strict'

/**
 * Random scripts
 * @module Scripts
 */

/**
 * Generates the string to use as download link of a object in JSON format
 *
 *
 * @param {object} Object - Object that will be downloaded as JSON
 * Example:
 *  <a href={getJSONDownloadString(object)} download={`${your_name}.json`}>
 *    Download JSON
 *  </a>
 * @returns {string}
 */
const getJSONDownloadString = (object) => {
  const formatedObject = encodeURIComponent(JSON.stringify(object));
  return `data:text/json;charset=utf-8,${formattedObject}`;
}

module.exports = getJSONDownloadString;
