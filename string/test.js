const str = require('./index');

/*
module.exports = {
  capitalize,
  leftpad,
  addPrefix,
  addPostfix,
  separate
};
*/

describe("Testing string utilities", () => {
  it('str is an object', () => {
    expect(typeof str).toEqual('object');
  });

  it('str exports a fixed number of functions', () => {
    //Dear developer, if you are modifying this number, remember to write the corresponding test
    //                                    ▼
    expect(Object.keys(str)).toHaveLength(5);
  });

  describe("capitalize()", () => {
    const { capitalize } = str;
    it("makes uppercase the first letter of strings", () => {
      expect(capitalize("")).toEqual("");
      expect(capitalize("a")).toEqual("A");
      expect(capitalize("A")).toEqual("A");
      expect(capitalize("aa")).toEqual("Aa");
      expect(capitalize("AA")).toEqual("Aa");
      expect(capitalize("~~hola")).toEqual("~~hola");
    });

    it("does nothing if non string values", () => {
      expect(capitalize(null)).toEqual(null);
      expect(capitalize(undefined)).toEqual();
      expect(capitalize(0)).toEqual(0);
      expect(capitalize(500)).toEqual(500);
    });
  });

  describe("leftpad()", () => {
    const { leftpad } = str;
    it("add pads as expected with numbers and characters", () => {
      expect(leftpad(4, "*", 34)).toEqual("**34");
      expect(leftpad(4, "*", -1)).toEqual("**-1");
      expect(leftpad(4, "*", "ab")).toEqual("**ab");
      expect(leftpad(4, "*", "")).toEqual("****");
      expect(leftpad(-1, "*", 34)).toEqual(34);
    });

    it("returns the input if the value to pad is not number or string", () => {
      expect(leftpad(4, "*", [])).toEqual([]);
      expect(leftpad(4, "*", {})).toEqual({});
      expect(leftpad(4, "*", undefined)).toEqual(undefined);
      expect(leftpad(4, "*", null)).toEqual(null);
    });

    //TODO test valid patterns like
    console.log(leftpad(4, "", 34));
    console.log(leftpad(7, "ab", 34));
    console.log('hola');

  });
});
