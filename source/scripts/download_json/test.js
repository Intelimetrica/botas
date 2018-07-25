const getJSONDownloadString = require('./index');

/*
module.exports = {
  getJSONDownloadString
};
*/

describe("Testing download json script", () => {
  it('getJSONDownloadString is a function', () => {
    expect(typeof getJSONDownloadString).toEqual('function');
  });


  describe("getJSONDownloadString()", () => {
    const basicObject = {a: 1, b: 2};
    const specialCharsObject = {a: "W/ spaces", b: "%!-=+"}
    it("formats correctly the download string", () => {
      expect(getJSONDownloadString(basicObject))
      .toBe("data:text/json;charset=utf-8,%7B%22a%22%3A1%2C%22b%22%3A2%7D");
    });

    it("formats a downoad string with special characters", () => {
      expect(getJSONDownloadString(specialCharsObject))
      .toBe("data:text/json;charset=utf-8,%7B%22a%22%3A%22W%2F%20spaces%22%2C%22b%22%3A%22%25!-%3D%2B%22%7D");
    });
  });
});
