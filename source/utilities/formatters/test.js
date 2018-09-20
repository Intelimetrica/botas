const formatters = require('./index');
/*
module.exports = {
  separateThousands,
  snakeToCamelCase
  toPercentage,
}
*/

describe("Testing formatters", () => {
  it('formatters is an object', () => {
    expect(typeof formatters).toEqual('object');
  });

  it('formatters exports a fixed number of functions', () => {
    //Dear developer, if you are modifying this number, remember to write the corresponding test
    //                                           ▼
    expect(Object.keys(formatters)).toHaveLength(3);
  });

  describe("toPercentage()", () => {
    const { toPercentage } = formatters;
    const fnumber = 2/3;
    const matcher = decimal_points => new RegExp(`\\d{1,2}\\.\\d{${decimal_points}}\\ %`);

    it("format 0-1 numbers into a readable percentage", () => {
      expect(toPercentage(fnumber,1)).toEqual(expect.stringMatching(matcher(1)));
      expect(toPercentage(fnumber,2)).toEqual(expect.stringMatching(matcher(2)));
      expect(toPercentage(fnumber,3)).toEqual(expect.stringMatching(matcher(3)));
      expect(toPercentage(fnumber,4)).toEqual(expect.stringMatching(matcher(4)));
    });

    it("assumes a 2 floating points number", () => {
      expect(toPercentage(fnumber)).toEqual(expect.stringMatching(matcher(2)));
    });
  });

  describe("snakeToCamelCase()", () => {
    const { snakeToCamelCase } = formatters;
    it("format snake case string into camel case", () => {
      expect(snakeToCamelCase("snake_case_text")).toEqual("snakeCaseText");
      expect(snakeToCamelCase("snakeCase_text")).toEqual("snakecaseText");
      expect(snakeToCamelCase("snake_caseText")).toEqual("snakeCasetext");
    });

    it("format snake case string into camel case including the first letter", () => {
      expect(snakeToCamelCase("snake_case_text", true)).toEqual("SnakeCaseText");
    });

    it("throws an error when the var name is invalid", () => {
      expect(() => { snakeToCamelCase("snake_ca@#se_text") }).toThrowError('Var name is not valid');
      expect(() => { snakeToCamelCase("do") }).toThrowError('Var name is not valid');
      expect(() => { snakeToCamelCase("#snake_case_text") }).toThrowError('Var name is not valid');
    });
  });

  describe("separateThousands()", () => {
    const { separateThousands } = formatters;
    it("separate numbers with commas every 1000", () => {
      expect(separateThousands(1)).toEqual("1");
      expect(separateThousands(10)).toEqual("10");
      expect(separateThousands(100)).toEqual("100");
      expect(separateThousands(1000)).toEqual("1,000");
      expect(separateThousands(10000)).toEqual("10,000");
      expect(separateThousands(100000)).toEqual("100,000");
      expect(separateThousands(1000000)).toEqual("1,000,000");
      expect(separateThousands(10000000)).toEqual("10,000,000");
    });

    it("won't work with strings", () => { // so be careful non numeric strings
      expect(separateThousands("1000000")).toEqual("1,000,000");
      expect(separateThousands("10000000")).toEqual("10,000,000");
      expect(separateThousands("hola")).toEqual("hola");
      expect(separateThousands("0.123456")).toEqual("0.123456");
      expect(separateThousands("1000.1234567")).toEqual("1,000.1234567");
      expect(separateThousands("10000.1234567")).toEqual("10,000.1234567");
    });

    it("handles float numbers", () => {
      expect(separateThousands(0.1)).toEqual("0.1");
      expect(separateThousands(10.10)).toEqual("10.1");
      expect(separateThousands(100.100)).toEqual("100.1");
      expect(separateThousands(1000.1000)).toEqual("1,000.1");
      expect(separateThousands(1000.11)).toEqual("1,000.11");
      expect(separateThousands(1000.111)).toEqual("1,000.111");
    });

    it("handles negative numbers", () => {
      expect(separateThousands(-1)).toEqual("-1");
      expect(separateThousands(-10)).toEqual("-10");
      expect(separateThousands(-100)).toEqual("-100");
      expect(separateThousands(-1000)).toEqual("-1,000");
      expect(separateThousands("-1000000")).toEqual("-1,000,000");
      expect(separateThousands("-10000000")).toEqual("-10,000,000");
      expect(separateThousands("-100.10000")).toEqual("-100.10000");
      expect(separateThousands("-1000.1234567")).toEqual("-1,000.1234567");
      expect(separateThousands("-10000.1234567")).toEqual("-10,000.1234567");
    });
  });
});
