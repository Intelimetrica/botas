const utils = require('./index');
const mockMath = Object.create(global.Math);
mockMath.random = () => 0.6789;
global.Math = mockMath;

/*
module.exports = {
  containNils,
  flow,
  formatIfExist,
  isNil,
  isTruthy,
  isUndefined,
  isValidVarName
  toFixed,
}
*/

describe("Testing utils", () => {
  it('utils is an object', () => {
    expect(typeof utils).toEqual('object');
  });

  it('utils exports a fixed number of functions', () => {
    //Dear developer, if you are modifying this number, remember to write the corresponding test
    //                                      ▼
    expect(Object.keys(utils)).toHaveLength(8);
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

  describe("flow()", () => {
    const { flow } = utils;

    const randomPercentagePipeline = [
      Math.random, //create a random number
      x => x * 100, // multiply it by 100
      x => x.toFixed(2), //fix number to 2 fixed-points
      x => (Math.random()>0.5 ? "+" : "-") + x, //add a random sign
      x => x +"%" //add the percentage sign
    ];

    it("executes the functions provided in order", () => {
      expect(flow(randomPercentagePipeline)()).toEqual("+67.89%");
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

  describe("isValidVarName()", () => {
    const { isValidVarName } = utils;
    it("reserved names invalid", () => {
      expect(isValidVarName("do")).toEqual(false);
      expect(isValidVarName("class")).toEqual(false);
      expect(isValidVarName("if")).toEqual(false);
    });

    it("start with invalid character", () => {
      expect(isValidVarName("#$%name")).toEqual(false);
      expect(isValidVarName("%^#another_name")).toEqual(false);
    });

    it("contains invalid character", () => {
      expect(isValidVarName("n#%ame")).toEqual(false);
      expect(isValidVarName("an#other_na%me")).toEqual(false);
    });

    it("valid names", () => {
      expect(isValidVarName("valid_var_name")).toEqual(true);
      expect(isValidVarName("AnotherValidName")).toEqual(true);
      expect(isValidVarName("ಠ_ಠ")).toEqual(true);
    });
  });

  describe("toFixed()", () => {
    const { toFixed } = utils;
    it("returns value unchanged if non numerical value is provided", () => {
      expect(toFixed(2)("non numeric")).toEqual("non numeric");
      expect(toFixed(2)("9.12345")).toEqual("9.12345");
    });

    it("adds a fixed amount of decimal points", () => {
      expect(toFixed(1)(0.123456)).toEqual("0.1");
      expect(toFixed(2)(0.123456)).toEqual("0.12");
      expect(toFixed(3)(0.123456)).toEqual("0.123");
      expect(toFixed(4)(0.123456)).toEqual("0.1235"); //toFixed rounds up
    });

    it("fixes 2 decimal points by default", () => {
      expect(toFixed()(0.123456)).toEqual("0.12");
      expect(toFixed()(1)).toEqual("1.00");
    });
  });
});
