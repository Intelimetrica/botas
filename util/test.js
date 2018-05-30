const utils = require('./index');

test('utils is an object', () => {
  expect(typeof utils).toEqual('object');
});

test('utils exports a fixed number of functions', () => {
  expect(Object.keys(utils)).toHaveLength(5);
});


