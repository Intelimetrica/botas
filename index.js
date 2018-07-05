const formatters = require('./utilities/formatters');
const general = require('./utilities/general');
const string = require('./utilities/string');
//TODO: write documentation and tests for time
const time = require('./utilities/time');

module.exports = Object.assign({},
  formatters,
  general,
  string,
  time
);
