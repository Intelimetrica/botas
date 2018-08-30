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
  formatMonthYearShort,
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
    expect(Object.keys(util)).toHaveLength(18);
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
  const DATE = new Date(1529474520000); // 2018-06-20T06:02:00.000Z
  const mockDate = () => {
    Date = class extends Date {
      constructor() {
        return DATE;
      }
    }
  };

  const RealDate = Date;
  afterEach(() => {
    global.Date = RealDate;
  })

  describe("dateSpread()", () => {
    const {dateSpread} = util;
    it("Generates an array representation of a date", () => {
      expect(dateSpread(DATE)).toEqual(['2018', '06', '20', '01', '02']);
      expect(dateSpread(DATE, false)).toEqual(['2018', '6', '20', '1', '2']);

      mockDate();
      expect(dateSpread()).toEqual(['2018', '06', '20', '01', '02']);
    });
  });

  describe("dateBasedSerial()", () => {
    const {dateBasedSerial} = util;
    it("Generates a serial based on the provided date", () => {
      const serial = '201806200102';
      expect(dateBasedSerial(DATE)).toEqual(serial);

      mockDate();
      expect(dateBasedSerial()).toEqual(serial);
    });
  });

  describe("firstDayOfYear()", () => {
    const {firstDayOfYear} = util;
    it("Generates a string representing first date of year", () => {
      expect(firstDayOfYear(DATE)).toEqual('2018-01-01');
      expect(firstDayOfYear(new Date('2016','05','01'))).toEqual('2016-01-01');

      mockDate();
      expect(firstDayOfYear()).toEqual('2018-01-01');
    });
  });

  describe("formatDateRange()", () => {
    const {formatDateRange} = util;
    it("Generates a range within the same month", () => {
      expect(formatDateRange("2018-03-01", "2018-03-17")).toEqual("1 - 17 Mar 2018");
      expect(formatDateRange("2018-01-05", "2018-01-17")).toEqual("5 - 17 Ene 2018");
    });

    it("Generates a range containing the entire month", () => {
      expect(formatDateRange("2018-03-01", "2018-03-31")).toEqual("Mar 2018");
      expect(formatDateRange("2018-02-01", "2018-02-28")).toEqual("Feb 2018");
    });

    it("Generates a range containing dates of different months", () => {
      expect(formatDateRange("2018-02-23", "2018-03-17")).toEqual("23 Feb - 17 Mar 2018");
      expect(formatDateRange("2018-01-20", "2018-03-17")).toEqual("20 Ene - 17 Mar 2018");
    });

    it("Generate a range containing dates differing years", () => {
      expect(formatDateRange("2017-12-20", "2018-01-10")).toEqual("20 Dic - 10 Ene 2018");
      expect(formatDateRange("2017-10-10", "2018-03-17")).toEqual("10 Oct - 17 Mar 2018");
    });
  });

  describe("formatDateRange()", () => {
    const {formatDateYYYY_MM_DD} = util;
    it("Generates a YYYY-MM-DD format", () => {
      expect(formatDateYYYY_MM_DD(DATE)).toEqual('2018-06-20');
      expect(formatDateYYYY_MM_DD(new Date('2018-02-17T10:10:10'))).toEqual('2018-02-17');

      mockDate();
      expect(formatDateYYYY_MM_DD()).toEqual('2018-06-20');
    });
  });

  describe("formatDayMonthYear()", () => {
    const {formatDayMonthYear} = util;
    it("Generates a DD de MMMM YYYY format", () => {
      expect(formatDayMonthYear(DATE)).toEqual('20 de Junio 2018');
      expect(formatDayMonthYear(new Date('2018-02-17T10:10:10'))).toEqual('17 de Febrero 2018');

      mockDate();
      expect(formatDayMonthYear()).toEqual('20 de Junio 2018');
    });
  });

  describe("formatDayMonthYearShort()", () => {
    const {formatDayMonthYearShort} = util;
    it("Generates a DD de MMM YY format", () => {
      expect(formatDayMonthYearShort(DATE)).toEqual('20 Jun 18');
      expect(formatDayMonthYearShort(new Date('2018-02-17T10:10:10'))).toEqual('17 Feb 18');

      mockDate();
      expect(formatDayMonthYearShort()).toEqual('20 Jun 18');
    });
  });

  describe("formatMonthYearShort()", () => {
    const {formatMonthYearShort} = util;
    it("Generates a MMM YY format", () => {
      expect(formatMonthYearShort(DATE)).toEqual('Jun 18');
      expect(formatMonthYearShort(new Date('2018-02-17T10:10:10'))).toEqual('Feb 18');

      mockDate();
      expect(formatMonthYearShort()).toEqual('Jun 18');
    });
  });

  describe("getDaysOfMonth()", () => {
    const {getDaysOfMonth}  = util;
    it("Gives the count of days for the month in given date", () => {
      expect(getDaysOfMonth(DATE)).toEqual(30);
      expect(getDaysOfMonth(new Date('2018-02-17T10:10:10'))).toEqual(28);
      expect(getDaysOfMonth(new Date('2016-02-17T10:10:10'))).toEqual(29);
    });
  });

  describe("getUTCDate()", () => {
    const {getUTCDate} = util;

    let date_arr = ['2018','05','06'];
    let date_str = '2018-06-06T00:00:00.000Z'

    it("Remove timeoffset", () => {
      expect(getUTCDate(new Date(...date_arr))).toEqual(new Date(date_str));
      expect(getUTCDate(new Date(...date_arr)).getUTCHours()).toEqual(0);
    });
  });

  describe("isDate", () => {
    const {isDate} = util;
    it("Verifies the received variable is an instance of Date", () => {
      expect(isDate(DATE)).toBe(true);
      expect(isDate('2018-06-20')).toBe(false);
    });
  });

  describe("monthRange()", () => {
    const {monthRange} = util;
    it("Creates a range of dates for the given month", () => {
      let expected = {from: '2018-06-01', to: '2018-06-30'};
      expect(monthRange(DATE)).toEqual(expected);
      expect(monthRange(new Date('2018-02-17T10:10:10')))
        .toEqual({from: '2018-02-01', to: '2018-02-28'});
      expect(monthRange(new Date('2018-02-01T00:00:00')))
        .toEqual({from: '2018-02-01', to: '2018-02-28'});
    });
  });

  describe("yesterday()", () => {
    const {yesterday} = util;
    it("Generates a day before than today", () => {
      mockDate();
      expect(yesterday().getDate()).toEqual(19);
    });
  });
});

describe("Testing time classes", () => {
  describe("Clock()", () => {
    const {Clock} = util;
    const c0 = new Clock();
    const c1 = new Clock(0.5);
    const c2 = new Clock(1);
    const c3 = new Clock(24.25430789);
    const c4 = new Clock(36.3333);

    it("Generates hh_mm_ss format", () => {
      expect(c0.hh_mm_ss()).toBe("00:00:00");
      expect(c1.hh_mm_ss()).toBe("00:30:00");
      expect(c2.hh_mm_ss()).toBe("01:00:00");
      expect(c3.hh_mm_ss()).toBe("24:15:16");
      expect(c4.hh_mm_ss()).toBe("36:19:60");
    });
    it("Generates hrs_min format", () => {
      expect(c0.verbose_hrs_min()).toBe("0h 0m");
      expect(c1.verbose_hrs_min()).toBe("0h 30m");
      expect(c2.verbose_hrs_min()).toBe("1h 0m");
      expect(c3.verbose_hrs_min()).toBe("24h 15m");
      expect(c4.verbose_hrs_min()).toBe("36h 19m");
    });
    it("Generates hrs_min_secs format", () => {
      expect(c0.verbose_hrs_min_secs()).toBe("0h 0m 0s");
      expect(c1.verbose_hrs_min_secs()).toBe("0h 30m 0s");
      expect(c2.verbose_hrs_min_secs()).toBe("1h 0m 0s");
      expect(c3.verbose_hrs_min_secs()).toBe("24h 15m 16s");
      expect(c4.verbose_hrs_min_secs()).toBe("36h 19m 60s");
    });
  });
});
