'use strict'

/**
 * Wrap a promise resolution into a `{value, status}` object.
 *
 * Used along with `Promise.all` allows rejected promises without breaking execution of other Promises.
 * To see how to use it along with Promise.all go to https://gist.github.com/Rantelo/84684a7b7babf64183587e61d98945df
 *
 * @memberof module:Scripts
 * @param {Promise} promise - `Promise` to be wrapped
 * @returns {Object} - {value, status}
 */
const fluentPromise = promise =>
  promise.then(
    solved => ({value: solved, status: "RESOLVED"}),
    rejected => ({value: rejected, status: "REJECTED"})
  );

module.exports = fluentPromise;
