/**
 * General Utilities module.
 * @module General
 *
 */

/**
 * Verifies whether any of the arguments provided is nil.
 *
 * @example
 * containNils(1, 0, NaN, false, null); //=> true
 * containNils(1, 0, NaN, false, undefined); //=> true
 * containNils(1, 0, NaN, false); //=> false
 *
 * @param {...*} args - Arguments of any type.
 * @returns {boolean}
 */
const containNils = (...args) =>
  !args.reduce((acc, curr) => !isNil(curr) && acc, true);

/**
 * Creates a pipe with all the functions provided, where the output of each
 * function will served as the input of the next function
 *
 * The final result is the input value with all the transformations provided
 * applied in order
 *
 * Note:
 * - This is a composed function, so check the example to know how to call it
 *
 * @example
 * //generate random positive or negative percentage
 * const pipeline = [
 *   x => x * 100, // multiply it by 100
 *   x => x.toFixed(2), // fix number to 2 fixed-points
 *   x => (Math.random() > 0.5 ? "+" : "-") + x, // add a random sign
 *   x => x + " %" // add postfix
 * ];
 * flow(pipeline)(Math.random()); //=> -45.23 %
 * flow(pipeline)(Math.random()); //=> +89.92 %
 *
 * @param {Array} functions - Array of functions to be applied in the pipeline
 * @param {*} value - Value to apply pipeline
 * @returns {*} - fnN(...fn2(fn1(value)))
 */
const flow = (functions) => {
  return (value) => functions.reduce((acc, fn) => fn(acc), value)
}

/**
 * Composed function that returns
 * - A `string` placeholder if the value is not truthy or
 * - A `fn(value)` formatted value
 *
 * Note:
 * - 0 is considered a truthy value
 * - This is a composed function, so check the example to know how to call it
 *
 * @example
 * // format the content of a variable. If the variable has a truthy content, run a formatter on it,
 *  var amount = api.getAmount(); //=> 0.6778
 *  formatIfExist(toPercentage)('-')(amount); //=> "67.78 %"
 *
 * // if not, return '-'
 *  var amount = api.getAmount(); //=> undefined
 *  formatIfExist(toPercentage)('-')(amount); //=> "-"
 *
 * @param {function} fn - Formatter to be applied if value is truthy
 * @param {string|number} placeholder - Placeholder to return if value is not truthy
 * @param {string|number} value - Value to be judged and transformed if truthy
 * @returns {*|placeholder} - Whatever the formatter returns or the placeholder
 */
function formatIfExist(fn) {
  return function(placeholder) {
    return function(value) {
      if(isUndefined(value)) {
        return placeholder;
      }else if (isTruthy(value) || value === 0) {
        return fn(value);
      } else {
        return placeholder;
      }
    }
  }
}

/**
 * Checks if value is null or undefined
 *
 * @param {*} value - Value
 * @returns {boolean}
 */
const isNil = value => (value === undefined || value === null);

/**
 * Checks if value is truthy.
 * This means not undefined, not null, not 0, not infinite
 *
 * @param {*} value - Value
 * @returns {boolean}
 */
function isTruthy(value) {
  if (value === false) return false;
  if(typeof value === 'number') {
    return isFinite(value) && value !== 0;
  }
  return !isUndefined(value) && !isNil(value) && value !== '';
}

/**
 * Checks if value is undefined
 * You might want this ¯\\\_(ツ)\_/¯
 *
 * @param {*} value - Value
 * @returns {boolean}
 */
const isUndefined = value => (value === undefined);

/**
 * A functional interface of toFixed
 *
 * Note:
 * - This is a composed function, so check the example to know how to call it
 *
 * @example
 * toFixed()(0.1234); //=> "0.12"
 * toFixed(1)(0.1234); //=> "0.1"
 * toFixed(2)(0.1234); //=> "0.12"
 *
 * @param {number} digits - Number of floating points to be used
 * @param {number} value - Floating precision number to be fixed
 *
 * @return {string}
 */
const toFixed = (digits=2) => {
  return value => {
    if (typeof value !== 'number') return value;
    return value.toFixed(digits);
  };
};


module.exports = {
  containNils,
  flow,
  formatIfExist,
  isNil,
  isTruthy,
  isUndefined,
  toFixed
}
