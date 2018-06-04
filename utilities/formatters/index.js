const { flow, toFixed, isNil } = require("../general");
const { addPostfix, separate } = require("../string");

/**
 * toPercentage
 * Run a pipeline of formatters to transform a ranged 0 to 1 number into a
 * readable percentage.
 * The output would look like `XX.XX %`
 *
 * @param {number} value
 * @param {number} decimal_points
 * @returns {string}
 */
const toPercentage = (value, decimal_points=2) => flow([
  x => x * 100,
  toFixed(decimal_points),
  addPostfix(" %")
])(value);

/**
 * separateThounsands
 *
 * @param {number|string} value
 * @returns {string}
 */
const separateThounsands = value => {
  if (isNil(value)) return null;
  return separate(value, 3, ',', true);
}

//TODO: Add price, area, distance and range formatters

module.exports = {
  separateThounsands,
  toPercentage
}
