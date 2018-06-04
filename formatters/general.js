const { flow } = require("../utils");
const { addPostfix, separate } = require("../string");

//TODO: Add option for decimals
const toPercentage = value => flow([
  x => x * 100,
  toFixed(2),
  addPostfix(" %")
])(value);

const separateThounsands = value => {
  if (isNil(value)) return null;
  return separate(value, 3, ',', true);
}


module.exports = {
  //numbers
  toFixed,

  //augmentations
  toPercentage,
  separateThounsands,
}
