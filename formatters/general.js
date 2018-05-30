const capitalize = word => {
  try {
    return `${word[0].toUpperCase()}${word.slice(1)}`;
  } catch(err) {
    console.error(err);
    return word;
  }
}

const leftpad = (len, pattern, str) => {
  let pad = new Array(len).fill(pattern);
  pad = pad.join("");
  str = str.toString();
  return `${pad.slice(0, len - str.length)}${str}`;
};

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

const flow = (functions) => {
  return (x) => functions.reduce((acc, fn) => fn(acc), x)
}

module.exports = {
  //function composition
  flow,

  //strings
  capitalize,
  leftpad,
  addPostfix,
  separate,

  //numbers
  toFixed,

  //augmentations
  toPercentage,
  separateThounsands,
}
