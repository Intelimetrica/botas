/**
 * Formatter Utilities module.
 *
 * Common formatters that we use across different projects. Note that many methods
 * in this module use methods from other modules.
 * @module Formatters
 */
const { flow, toFixed, isNil, isValidVarName } = require("../general");
const { addPostfix, separate, capitalize } = require("../string");
const { sign, abs }            = Math;
const { isInteger }            = Number;


/**
 * Separate input from right to left in buckets of 3 digits using commas.
 * Useful to format prices.
 *
 * @example
 * separateThousands(12000); //=>'12,000'
 * separateThousands('1250000'); //=> '1,250,000'
 * separateThousands(-1000); //=> '-1,000'
 * separateThousands(1000.111); //=> '1,000.111'
 *
 * Note that this function won't work with non numerical values. So expect:
 *
 * @example
 * separateThousands("hola"); //> 'hola'
 * separateThousands("0.123456"); //=> '0.123456'
 * separateThousands("1000.1234567"); //=> '1,000.1234567'
 * separateThousands("-100.10000"); //=> '-100.10000'
 *
 * @param {number|string} value - Input that will be separated with commas every 3 elements
 * @returns {string}
 */
const separateThousands = value => {
  if (isNil(value)) return null;
  if (isNaN(value)) return value;

  const v_sign = (sign(value)<0) ? '-' : '';
  const integer = separate(parseInt(abs(value)), 3, ',', true);
  const floating_points = isInteger(Number(value)) ? '' : `.${("" + value).split(".")[1]}`;

  return `${v_sign}${integer}${floating_points}`
};

/**
* Run a pipeline of formatters to transform a string in snake_case style to camelCase
*
* @example
* snakeToCamelCase('snake_case_string'); //=> 'snakeCaseString'
* snakeToCamelCase('snake_case_string', true); //=> 'SnakeCaseString'
*
* @param {string} value - String in snake case style to be transformed to camel case
* @param {boolean} first_letter - Boolean that indicates if the first letter should be capitalized
* @returns {string}
*
*/
const snakeToCamelCase = (value, pascal_case=false) => {
  const pipeline = [
    word    => word.split('_'),
    words   => words.map(w => capitalize(w)),
    words   => { if (!pascal_case) { words[0] = words[0].toLowerCase() } return words },
    words   => words.join(''),
    varName => { if(!isValidVarName(varName)) { throw "Var name is not valid" } else return varName }
  ];
  return flow(pipeline)(value);
};

/**
 * Run a pipeline of formatters to transform a ranged 0 to 1 number into a
 * readable percentage.
 * The output would look like `XX.XX %`
 *
 * @example
 * toPercentage(0.67489); //=> '67.49 %'
 * toPercentage(0.67439, 1); //=> '67.4 %'
 *
 * @param {number} value - Floating precision number to transform into percentage
 * @param {number} decimal_points - Floating points to take in the final format
 * @returns {string}
 *
 */
const toPercentage = (value, decimal_points=2) => flow([
  x => x * 100,
  toFixed(decimal_points),
  addPostfix(" %")
])(value);

//TODO: Add price, area, distance and range formatters

module.exports = {
  separateThousands,
  snakeToCamelCase,
  toPercentage
}
