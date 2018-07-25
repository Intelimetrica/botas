const util = require('./index');

/*
module.exports = {
  addPostfix,
  addPrefix,
  capitalize,
  leftpad,
  separate
};
*/

describe("Testing string utilities", () => {
  it('util is an object', () => {
    expect(typeof util).toEqual('object');
  });

  it('util exports a fixed number of functions', () => {
    //Dear developer, if you are modifying this number, remember to write the corresponding test
    //                                    ▼
    expect(Object.keys(util)).toHaveLength(5);
  });

  describe("addPostfix()", () => {
    const { addPostfix } = util;
    it("adds postfix successfully", () => {
      expect(addPostfix(" %")(100));
      expect(addPostfix(" %")("100"));
    });

    it("handle numerical values as strings", () => {
      expect(addPostfix(5)(10)).toEqual("105");
      expect(addPostfix("5")(10)).toEqual("105");
      expect(addPostfix(5)("10")).toEqual("105");
    });
  });

  describe("addPrefix()", () => {
    const { addPrefix } = util;
    it("adds prefix successfully", () => {
      expect(addPrefix(">> ")(100));
      expect(addPrefix(">> ")("100"));
    });

    it("handle numerical values as strings", () => {
      expect(addPrefix(5)(10)).toEqual("510");
      expect(addPrefix("5")(10)).toEqual("510");
      expect(addPrefix(5)("10")).toEqual("510");
    });
  });

  describe("capitalize()", () => {
    const { capitalize } = util;
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
    const { leftpad } = util;
    it("adds pads as expected with numbers and characters", () => {
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

    it("handle invalid patterns (interpret falsy patterns as empty string)", () => {
      expect(leftpad(4, "", 34)).toEqual("34");
      expect(leftpad(4, null, 34)).toEqual("34");
      expect(leftpad(4, undefined, 34)).toEqual("34");
      expect(leftpad(4, [], 34)).toEqual("34");
    });
  });

  describe("separate()", () => {
    const { separate } = util;
    it("adds separator every x number of characters", () => {
      expect(separate("helloWorld", 1, "-")).toEqual("h-e-l-l-o-W-o-r-l-d");
      expect(separate("helloWorld", 2, "-")).toEqual("he-ll-oW-or-ld");
      expect(separate(123456, 2, "-")).toEqual("12-34-56");
      expect(separate(123456, 2, 0)).toEqual("12034056");
    });

    it("handles non string inputs as strings", () => {
      expect(separate(0, 2, "-")).toEqual("0");
      expect(separate("", 2, "-")).toEqual("");
      expect(separate(false, 2, "-")).toEqual("f-al-se");
      expect(separate(undefined, 2, "-")).toEqual("u-nd-ef-in-ed");
      expect(separate([], 2, "-")).toEqual("");
    });

    it("handles weird separators and count", () => {
      //weird counts
      expect(separate("helloworld", null, "-")).toEqual("helloworld");
      expect(separate("helloworld", undefined, "-")).toEqual("helloworld");
      expect(separate("helloworld", "", "-")).toEqual("helloworld");
      expect(separate("helloworld", "2", "-")).toEqual("helloworld");

      //weird separators
      expect(separate("helloworld", 2, "")).toEqual("helloworld");
      expect(separate("helloworld", 2, null)).toEqual("helloworld");
      expect(separate("helloworld", 2, undefined)).toEqual("helloworld");
      expect(separate("helloworld", 2, [])).toEqual("helloworld");
      expect(separate("helloworld", 2, {})).toEqual("helloworld");
    });

    it("separates string from right to left by default", () => {
      expect(separate(1234567, 3, ",")).toEqual("1,234,567");
    });

    it("separates string from left to right", () => {
      expect(separate(1234567, 3, ",", false)).toEqual("123,456,7");
    });
  });

});
