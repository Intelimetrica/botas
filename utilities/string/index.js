/**
 * String Utilities module.
 * @module Strings
 */

/**
 * Adds a postfix to a given value
 *
 * Note:
 * - This is a composed function, so check the example to know how to call it
 *
 * @example
 * addPostfix(5)("%"); //=> '5%'
 *
 * @param {string|number} postfix - Postfix
 * @param {string|number} value - Value
 * @returns {string}
 */
const addPostfix = postfix => {
  return value => {
    return "" + value + postfix;
  }
};

/**
 * Adds a prefix to a given value
 *
 * Note:
 * - This is a composed function, so check the example to know how to call it
 *
 * @example
 * addPrefix(5)(">"); //=> '>5'
 *
 * @param {string|number} prefix - Prefix
 * @param {string|number} value - Value
 *
 * @returns {string}
 */
const addPrefix = prefix => {
  return value => {
    return "" + prefix + value;
  }
};

/**
 * Set first charater to UpperCase and the rest to LowerCase
 *
 * @example
 * capitalize("botas"); //=> 'Botas'
 * capitalize("this is a sentence"); //=> 'This is a sentence'
 *
 * @param {string} word - String to capitalize
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
 * Adds pattern to left of str until it fills len
 * @example
 * leftpad(5, "*", "hey"); //=> "**hey"
 * leftpad(10, "_*", "hey"); //=> "_*_*_*_hey"
 *
 * @param {number} len - Length of final string
 * @param {string|number} pattern - Pattern to fill in the blanks
 * @param {string|number} str - Value to be padded
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
 * Adds separator every given number of characters
 *
 * Separator applies from right to left by default, but it can be configured
 * to apply from left to right too by setting from_r_to_l=false
 *
 * @example
 * separate(12345678, 3, ","); //=> "12,345,678"
 * separate(12345678, 3, "-", false); //=> "123-456-78"
 *
 * @param {string|number} what - Value to separate
 * @param {number} every - Periocity of separation
 * @param {string|number} separator - Value to use in separation
 * @param {boolean} [from_r_to_l=true] - False to separate from left to right
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
