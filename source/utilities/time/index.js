const { leftpad } = require('../string');

/**
 * Time related utilities
 * @module Time
 */

/**
 * Months labels
 * @member {Object} MONTHS
 * @example
 * MONTHS['mx'][0] //=> "Enero"
 */
const MONTHS = {
  'mx': ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
};

/**
 * Months labes in 3 chars style
 * @member {Object} MONTHS_SHORT
 * @example
 * MONTHS_SHORT['mx'][0] //=> "Ene"
 */
const MONTHS_SHORT = {
  'mx': ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
};

/**
 * Days of week labels
 * @member {Object} WEEKDAYS_LONG
 * @example
 * WEEKDAYS_LONG['mx'][0] //=> "Domingo"
 */
const WEEKDAYS_LONG = {
  'mx': ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado']
};

/**
 * Days of week labels in 2 chars style
 * @member {Object} WEEKDAYS_SHORT
 * @example
 * WEEKDAYS_SHORT['mx'][0] //=> "Do"
 */
const WEEKDAYS_SHORT = {
  'mx': ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa']
};

/* ---end of members--- */


/**
 * Concatenates Year, Month, Day, Hour and Mins into a string to form a current time serial
 *
 * @example
 * dateBasedSerial(new Date(2018, 1, 2, 3, 4)); //=> '201802020304'
 *
 * @param {Date} [date] - Date to form serial or current date by default
 * @returns {string}
 */
const dateBasedSerial = (date = new Date()) =>
  dateSpread(date).reduce((acc, e) => `${acc}${e}`, "");

/**
 * Array representation of a date: [YYYY, MM, DD, HH, mm]
 *
 * @example
 * dateSpread(new Date(2018, 1, 2, 3, 4)); //=> ['2018', '02', '02', '03', '04']
 *
 * @param {Date} [date] - Instance of Date. If not provided, date will be Date.now()
 * @param {boolean} [padded] - Defines if response will be padded with zeroes
 * @returns {Array}
 */
const dateSpread = (date = new Date(), padded=true) => [
  "" + date.getFullYear(),
  leftpad(padded ? 2 : 0,0,date.getMonth()+1),
  leftpad(padded ? 2 : 0,0,date.getDate()),
  leftpad(padded ? 2 : 0,0,date.getHours()),
  leftpad(padded ? 2 : 0,0,date.getMinutes()),
];

/**
 * First date of year in YYYY-MM-DD format
 *
 * @example
 * firstDayOfYear(new Date(2018, 1, 2, 3, 4)); //=> '2018-01-01'
 *
 * @param {Date} [date] - Instance of Date. If not provided, date will be Date.now()
 * @returns {string}
 */
const firstDayOfYear = (date = new Date()) => {
  return `${date.getFullYear()}-01-01`;
};

/**
 * Transform a date range into a readable format
 *
 * @example
 * formatDateRange("2018-03-01", "2018-03-31"); //=> "Mar 2018"
 * formatDateRange("2018-03-01", "2018-03-17"); //=> "1 - 17 Mar 2018"
 * formatDateRange("2018-02-23", "2018-03-17"); //=> "23 Feb - 17 Mar 2018"
 * formatDateRange("2017-12-20", "2018-01-10"); //=> "20 Dic - 10 Ene 2018"
 *
 * @param {string} date_gte - Lowest date of range in YYYY-MM-DD format
 * @param {string} date_lte - Highest date of range in YYYY-MM-DD format
 * @returns {string}
 */
const formatDateRange = (date_gte, date_lte) => {
  let d_gte = new Date(date_gte.replace(/-/g, '\/')); //lowest
  let d_lte = new Date(date_lte.replace(/-/g, '\/')); //highest

  if(d_gte.getMonth() === d_lte.getMonth()) {
    if((d_gte.getDate() === 1) && (d_lte.getDate() === getDaysOfMonth(d_gte))) {
      return `${MONTHS_SHORT.mx[d_gte.getMonth()]} ${d_gte.getFullYear()}`;
    } else {
      return `${d_gte.getDate()} - ${d_lte.getDate()} ${MONTHS_SHORT.mx[d_gte.getMonth()]} ${d_gte.getFullYear()}`;
    }
  } else {
    return `${d_gte.getDate()} ${MONTHS_SHORT.mx[d_gte.getMonth()]} - ${d_lte.getDate()} ${MONTHS_SHORT.mx[d_lte.getMonth()]} ${d_lte.getFullYear()}`;
  }
};

/**
 * Formats a date into a YYYY-MM-DD string
 *
 * @example
 * formatDateYYYY_MM_DD(new Date(2018, 1, 2, 3, 4)); //=> '2018-02-02'
 *
 * @param {Date} [date] - Date. If not provided, `Date.now()`
 * @returns {string}
 */
const formatDateYYYY_MM_DD = (date = new Date()) => {
  const [year, month, day] = dateSpread(date);
  return `${year}-${month}-${day}`;
}

/**
 * Formats a date into a `DD de MMMM YYYY` readable string
 *
 * @example
 * formatDayMonthYear(new Date(2018, 1, 2, 3, 4)); //=> '02 de Febrero 2018'
 *
 * @param {Date} [date] - Date. If not provided, `Date.now()`
 * @param {string} [locale] - Locality string. `mx` by default
 * @returns {string}
 */
const formatDayMonthYear = (date = new Date(), locale='mx') => {
  let [year, month, day] = dateSpread(date, false);
  return `${day} de ${MONTHS[locale][month-1]} ${year}`;
}

/**
 * Formats a date into a `DD de MMM YY` readable string
 *
 * @example
 * formatDayMonthYearShort(new Date(2018, 1, 2, 3, 4)); //=> '02 Feb 18'
 *
 * @param {Date} [date] - Date. If not provided, `Date.now()`
 * @param {string} [locale] - Locality string. `mx` by default
 * @returns {string}
 */
const formatDayMonthYearShort = (date = new Date(), locale='mx') => {
  let [year, month, day] = dateSpread(date, false);
  return `${day} ${MONTHS_SHORT[locale][month-1]} ${year % 100}`;
}

/**
 * Formats a date into a `MMM YY` readable string
 *
 * @example
 * formatMonthYearShort(new Date(2018, 1, 2, 3, 4)); //=> 'Feb 18'
 *
 * @param {Date} [date] - Date. If not provided, `Date.now()`
 * @param {string} [locale] - Locality string. `mx` by default
 * @returns {string}
 */
const formatMonthYearShort = (date = new Date(), locale='mx') => {
  let [year, month] = dateSpread(date, false);
  return `${MONTHS_SHORT[locale][month-1]} ${year % 100}`;
}

/**
 * Give the count of how many days a month has. Supports leap-years
 *
 * @example
 * getDaysOfMonth(new Date(2018, 1, 2, 3, 4)); //=> 28
 *
 * @param {Date} [date] - Date. If not provided, `Date.now()`
 * @returns {number}
 */
const getDaysOfMonth = (date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return 32 - new Date(year, month, 32).getDate();
};

/**
 *  Get Coordinated Universal Time
 *  - Why I might want to use this? `new Date()` adds a timezone offset. So `new Date('2018','01','01'); //=> 2018-02-01T06:00:00.000Z`.
 *  - Notice the 6 hours added in the result? That is the timezone. To avoid this, we can use UTC format. Hence, this function.
 *
 * @param {Date} date - Instance of `Date`
 * @returns {Date}
 */
const getUTCDate = (date) => {
  let [year, month, ...rest] = dateSpread(date);
  return new Date(Date.UTC(year, month-1, ...rest));
}

/**
 * Validates that an input is instance of Date
 *
 * @example
 * isDate(new Date()); //=> true
 *
 * @param {*} date - Element to check if is instance of Date
 * @returns {boolean}
 */
const isDate = date => date instanceof Date;

/**
 * Generates the date_range of the month given in date
 *
 * @example
 * monthRange(new Date('2018', '06')); //=> {from: '2018-05-01', to: '2018-05-31'}
 *
 * @param {Date} [date] - Instance of `Date`. Date.now() if not provided
 * @returns {Object}
 */
const monthRange = (date = new Date()) => {
  let [year, month] = dateSpread(date, false);
  let [_year, padded_month, lday] = dateSpread(new Date(year, month, 0));

  return {
    from: `${year}-${padded_month}-01`,
    to: `${year}-${padded_month}-${lday}`
  };
}

/**
 * Generates the `Date` of yesterday ¯\\\_(ツ)\_/¯
 *
 * @returns {Date}
 */
const yesterday = () => {
  let a_day_before = new Date();
  a_day_before.setDate(a_day_before.getDate() - 1);

  return a_day_before;
};


/**
 * Clock class to transform a `float` represented time into different formats
 *
 * @class
 *
 * @example
 * let clock = new Clock(37.32454);
 * //=> clock = Clock { time: 37.32454, hours: 37, minutes: 19, seconds: 28 }
 * clock.hh_mm_ss(); //=> 37:19:28
 * clock.verbose_hrs_min(); //=> 37h 19m
 * clock.verbose_hrs_min_secs(); //=> 37h 19m 28s
 *
 * @param {number} - Float number representing a time
 * @return {Clock}
 * */
class Clock {
  constructor(time=0) {
    this.time = time;
    this.hours = Math.floor(this.time);
    this.minutes = Math.floor((this.time % 1) * 60);
    this.seconds = Math.round((this.time * 3600) % 60);
  }

  hh_mm_ss() {
    const hh = leftpad(2, "0", this.hours);
    const mm = leftpad(2, "0", this.minutes);
    const ss = leftpad(2, "0", this.seconds);

    return `${hh}:${mm}:${ss}`;
  }

  verbose_hrs_min() {
    const hh = this.hours;
    const mm = this.minutes;
    const ss = this.seconds;

    return `${hh}h ${mm}m`;
  }

  verbose_hrs_min_secs() {
    const hh = this.hours;
    const mm = this.minutes;
    const ss = this.seconds;

    return `${hh}h ${mm}m ${ss}s`;
  }
}

module.exports = {
  MONTHS,
  MONTHS_SHORT,
  WEEKDAYS_LONG,
  WEEKDAYS_SHORT,

  dateBasedSerial,
  dateSpread,
  firstDayOfYear,
  formatDateRange,
  formatDateYYYY_MM_DD,
  formatDayMonthYear,
  formatDayMonthYearShort,
  formatMonthYearShort,
  getDaysOfMonth,
  getUTCDate,
  isDate,
  monthRange,
  yesterday,

  Clock
};

