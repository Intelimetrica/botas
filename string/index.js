/**
 * addPostfix
 *
 * @returns String
 */
const addPostfix = postfix => {
  return value => {
    return "" + value + postfix;
  }
};

/**
 * addPrefix
 *
 * @returns String
 */
const addPrefix = prefix => {
  return value => {
    return "" + prefix + value;
  }
};

/**
 * capitalize
 *
 * @returns String
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
 * @returns String
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
 *
 * @returns {undefined}
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
