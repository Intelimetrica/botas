/**
 * addPostfix
 * Adds a postfix to a given value
 *
 * @param {string|number} postfix
 * @returns {function}
 *
 * @param {string|number} value
 * @returns {string}
 */
const addPostfix = postfix => {
  return value => {
    return "" + value + postfix;
  }
};

/**
 * addPrefix
 * Adds a prefix to a given value
 *
 * @param {string|number} prefix
 * @returns {function}
 *
 * @param {string|number} value
 *
 * @returns {string}
 */
const addPrefix = prefix => {
  return value => {
    return "" + prefix + value;
  }
};

/**
 * capitalize
 * Set first charater to UpperCase and the rest to LowerCase
 *
 * @param {string} word
 * @returns {string}
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
 * Adds pattern to left of str until it fills len
 * example:
 *   leftpad(5, "*", "hey") //=> "**hey"
 *
 * @param {number} len
 * @param {string|number} pattern
 * @param {string|number} str
 *
 * @returns {string}
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
 * separate
 * Adds separator every given number of characters
 * example:
 *   separate(12345678, 3, ",") //=> "12,345,678"
 *
 * Separator applies from right to left by default, but it can be configured
 * to apply from left to right too by setting from_r_to_l=false
 *
 * @param {string|number} what
 * @param {number} every
 * @param {string|number} separator
 * @param {boolean} [from_r_to_l=true]
 *
 * @returns {string}
 */
const separate = (what, every, separator, from_r_to_l=true) => {
  what += "";
  let stack = [];
  if (typeof every !== "number") return what;
  if (typeof separator === "object") return what;
  try {
  for (let i = 0; i < what.length; i++) {
    if (i % every === 0 && i !== 0) {
      stack.push(separator);
    }

    stack.push(from_r_to_l ?
      what[what.length - i - 1] :
      what[i]
    );
  }
  if (from_r_to_l) stack = stack.reverse();

  return stack.join('');
  } catch (err) {
    return what;
  }
}


module.exports = {
  addPostfix,
  addPrefix,
  capitalize,
  leftpad,
  separate
};
