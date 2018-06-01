/**
 * capitalize
 *
 * @returns {undefined}
 */
const capitalize = word => {
  try {
    return `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;
  } catch(err) {
    return word;
  }
}

/**
 * leftpad
 *
 * @returns {undefined}
 */
const leftpad = (len, pattern, str) => {
  if (typeof str === 'object') return str;
  try {
    let pad = new Array(len).fill(pattern);
    pad = pad.join("");
    str = str.toString();
    return `${pad.slice(0, len - str.length)}${str}`;
  } catch(err) {
    return str;
  }
};


/**
 * addPostfix
 *
 * @returns {undefined}
 */
const addPostfix = () => {};

/**
 * addPrefix
 *
 * @returns {undefined}
 */
const addPrefix = () => {};

/**
 * separate
 *
 * @returns {undefined}
 */
const separate = () => {};

module.exports = {
  capitalize,
  leftpad,
  addPrefix,
  addPostfix,
  separate
};
