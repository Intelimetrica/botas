const util = require('./index');

/*
module.exports = {
  MONTHS,
  MONTHS_SHORT,
  WEEKDAYS_LONG,
  WEEKDAYS_SHORT,

  dateBasedSerial,
  dateSpread,
  firstDayOfYear,
  formatDateRange,
  formatDateYYYYMMDD,
  formatDayMonthYear,
  formatDayMonthYearShort,
  getDaysOfMonth,
  getUTFDate,
  monthRange,
  yesterday,

  Clock
*/

describe("Testing time export", () => {
  it('util is an object', () => {
    expect(typeof util).toEqual('object');
  });

  it('util exports a fixed number of functions', () => {
    //Dear developer, if you are modifying this number, remember to write the corresponding test
    //                                     ▼
    expect(Object.keys(util)).toHaveLength(17);
  });
});

describe("Testing time constants", () => {
  const { MONTHS, MONTHS_SHORT, WEEKDAYS_LONG, WEEKDAYS_SHORT } = util;

  const constants = [ MONTHS, MONTHS_SHORT, WEEKDAYS_LONG, WEEKDAYS_SHORT ];
  it("constants expose 'mx' property", () => {
    for (let c of constants) {
      expect(c).toHaveProperty('mx');
    }
  });

  const month_labels = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  it("MONTHS expose right labels", () => {
    expect(MONTHS['mx']).toEqual(month_labels);
  });
  it("MONTHS_SHORT expose the 3 first chars of each month label", () => {
    expect(MONTHS_SHORT['mx']).toEqual(month_labels.map(e => e.substring(0, 3)));
  });

  const weekdays_labels = [
    "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"
  ];
  it("WEEKDAYS_LONG expose right labels", () => {
    expect(WEEKDAYS_LONG['mx']).toEqual(weekdays_labels);
  });
  it("WEEKDAYS_SHORT expose the 2 first chars of each weekday label", () => {
    expect(WEEKDAYS_SHORT['mx']).toEqual(weekdays_labels.map(e => e.substring(0, 2)));
  });
});

describe("Testing time utilities", () => {
  describe("dateSpread()", () => {
    const {dateSpread} = util;
    let date = new Date("2018-06-20T01:02:00");
    it("Generates an array representation of a date", () => {
      expect(dateSpread(date)).toEqual(['2018', '06', '20', '01', '02']);
      expect(dateSpread(date, false)).toEqual(['2018', '6', '20', '1', '2']);
    });
  });
});

describe("Testing time classes", () => {
  it("", () => {
    expect();
  });
});
