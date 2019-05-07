'use strict'

/**
 * Generates the string to use as download link of a object in JSON format
 *
 * @example
 * <a href={getJSONDownloadString(object)} download={`${fileName}.json`}>Download JSON</a>
 *
 * @memberof module:Scripts
 * @param {Object} obj - Object that will be downloaded as JSON
 * @returns {string}
 */
const getJSONDownloadString = (obj) => {
  const formattedObject = encodeURIComponent(JSON.stringify(obj));
  return `data:text/json;charset=utf-8,${formattedObject}`;
}

module.exports = getJSONDownloadString;
