/**
 * containNils
 *
 * @param arguments object
 * @param curr
 * @returns boolean
 */
const containNils = (...args) =>
  !args.reduce((acc, curr) => !isNil(curr) && acc, true);

/**
 * flow
 * Creates a pipe with all the functions provided, where the output of each
 * function will serve as the input of the next function
 * The final result is the input value with all the transformations provided
 * applied in order
 *
 * @param [functions]
 * @returns fnN(...fn2(fn1(value)))
 */
const flow = (functions) => {
  return (value) => functions.reduce((acc, fn) => fn(acc), value)
}

/**
 * formatIfExist
 * Composed function that returns
 * - A placeholder if the value is not truthy or
 * - A formatted value
 *
 * The way to use this function is: i.e.
 *  - format the content of a variable. If the variable has a truthy content,
 *    run a formatter on it, if not, return '-'
 *
 *    var amount = api.getAmount(); //=> 0.6778
 *    formatIfExist(toPercentage)('-')(amount); //=> "67.78 %"
 *
 *    var amount = api.getAmount(); //=> undefined
 *    formatIfExist(toPercentage)('-')(amount); //=> "-"
 *
 * @param fn
 * @returns function
 *
 * @param placeholder
 * @returns function
 *
 * @param value
 * @returns fn(value) || placeholder
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
 * isNil
 * Checks if value is null or undefined
 *
 * @param value
 * @returns boolean
 */
const isNil = value => (value === undefined || value === null);

/**
 * isTruthy
 * Checks if value is truthy.
 * This means not undefined, not null, not 0, not infinite
 *
 * @param value
 * @returns boolean
 */
function isTruthy(value) {
  if (value === false) return false;
  if(typeof value === 'number') {
    return isFinite(value) && value !== 0;
  }
  return !isUndefined(value) && !isNil(value) && value !== '';
}

/**
 * isUndefined
 * Checks if value is undefined
 * You might want this ¯\_(ツ)_/¯
 *
 * @param value
 * @returns boolean
 */
const isUndefined = value => (value === undefined);

module.exports = {
  containNils,
  flow,
  formatIfExist,
  isNil,
  isTruthy,
  isUndefined
}
