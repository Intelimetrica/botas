const { flow } = require("../utils");

//TODO: force string
const addPostfix = postfix => {
  return value => {
    return value + postfix;
  }
};

const toFixed = decimals => {
  return value => {
    return value.toFixed(decimals);
  };
};

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

const separate = (what, every, separator, from_r_to_l=true) => {
  what += "";
  let stack = [];
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
}


module.exports = {
  //strings
  addPostfix,
  separate,

  //numbers
  toFixed,

  //augmentations
  toPercentage,
  separateThounsands,
}
