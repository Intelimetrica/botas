const utils = require('./index');

/*
module.exports = {
  containNils,
  formatIfExist,
  isNil,
  isTruthy,
  isUndefined
}
*/

describe("Testing utils", () => {
  it('utils is an object', () => {
    expect(typeof utils).toEqual('object');
  });

  it('utils exports a fixed number of functions', () => {
    expect(Object.keys(utils)).toHaveLength(5);
  });

  describe("containNils()", () => {
    const { containNils } = utils;
    it("identifies if a nil value exists in the given params", () => {
      const truthy_values = [1, 0, 5/0, false, true];

      expect(containNils(null, ...truthy_values)).toBe(true);
      expect(containNils(...truthy_values)).toBe(false);
      expect(containNils(...truthy_values, undefined)).toBe(true);
    });
  });

  describe("formatIfExist()", () => {
    const { formatIfExist } = utils;
    it("understand `Exist` as truthy values", () => {
      expect(formatIfExist(str => str)('-')(5)).toBe(5);
      expect(formatIfExist(str => str)('-')(false)).toBe('-');
      expect(formatIfExist(str => str)('-')(null)).toBe('-');
      expect(formatIfExist(str => str)('-')(undefined)).toBe('-');
      expect(formatIfExist(str => str)('-')({})).toEqual({});
    });
    it("runs the value through a formatter", () => {
      const obj = {a: 1, b: 4, c:5};
      const addToEach = to_add => list => list.map(e => e + to_add);
      const addPercentageSign = value => value + "%";

      expect(formatIfExist(JSON.stringify)('-')(obj)).toEqual(JSON.stringify(obj));
      expect(formatIfExist(addToEach(10))('-')([2,20,200])).toEqual([12,30,210]);
      expect(formatIfExist(addPercentageSign)('-')(50)).toEqual('50%');
    });
  });

  describe("isNil()", () => {
    const { isNil } = utils;
    it("identifies nil alike values", () => {
      expect(isNil(undefined)).toEqual(true);
      expect(isNil(null)).toEqual(true);
    });
    it("identifies not nil alike values", () => {
      expect(isNil(0)).toEqual(false);
      expect(isNil([])).toEqual(false);
      expect(isNil({})).toEqual(false);
      expect(isNil("")).toEqual(false);
    });
  });

  describe("isTruthy()", () => {
    const { isTruthy } = utils;
    it("behaves as javascript expects", () => {
      expect(isTruthy(false)).toBe(false);
      expect(isTruthy(true)).toBe(true);
      expect(isTruthy({})).toBe(true);
      expect(isTruthy([])).toBe(true);
      expect(isTruthy(42)).toBe(true);
      expect(isTruthy("foo")).toBe(true);
      expect(isTruthy(new Date())).toBe(true);
      expect(isTruthy(-42)).toBe(true);
      expect(isTruthy(3.14)).toBe(true);
      expect(isTruthy(-3.14)).toBe(true);
    });
    it("judges Infinities as not truthful values (this is not js common behavior)", () => {
      expect(isTruthy(-Infinity)).toBe(false);
      expect(isTruthy(Infinity)).toBe(false);
    });
  });

  describe("isUndefined()", () => {
    const { isUndefined } = utils;
    it("matches only undefined as true", () => {
      expect(isUndefined(undefined)).toBe(true);
      expect(isUndefined(null)).toBe(false);
      expect(isUndefined([])).toEqual(false);
      expect(isUndefined({})).toEqual(false);
      expect(isUndefined("")).toEqual(false);
    });
  });
});

