const formatters = require('./index');
/*
module.exports = {
  separateThounsands,
  toPercentage
}
*/

describe("Testing formatters", () => {
  it('formatters is an object', () => {
    expect(typeof formatters).toEqual('object');
  });

  it('formatters exports a fixed number of functions', () => {
    //Dear developer, if you are modifying this number, remember to write the corresponding test
    //                                           ▼
    expect(Object.keys(formatters)).toHaveLength(2);
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

  describe("separateThounsands()", () => {
    const { separateThounsands } = formatters;
    it("separate numbers with commas every 1000", () => {
      expect(separateThounsands(1)).toEqual("1");
      expect(separateThounsands(10)).toEqual("10");
      expect(separateThounsands(100)).toEqual("100");
      expect(separateThounsands(1000)).toEqual("1,000");
      expect(separateThounsands(10000)).toEqual("10,000");
      expect(separateThounsands(100000)).toEqual("100,000");
      expect(separateThounsands(1000000)).toEqual("1,000,000");
      expect(separateThounsands(10000000)).toEqual("10,000,000");
    });

    it("works with strings also", () => { // so be careful with floats or non numeric strings
      expect(separateThounsands("1000000")).toEqual("1,000,000");
      expect(separateThounsands("10000000")).toEqual("10,000,000");
      expect(separateThounsands("hola")).toEqual("h,ola");
      expect(separateThounsands("0.123456")).toEqual("0.,123,456");
    });
  })
});
