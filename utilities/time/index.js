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
 * Validates that an input is instance of Date
 *
 * @param {*} date - Element to check if is instance of Date
 * @returns {boolean}
 */
const isDate = date => date instanceof Date;

/**
 * Give the count of how many days a month has. Supports leap-years
 *
 * @example
 * getDaysOfMonth()
 *
 * @param {Date} date - Date
 * @returns {number}
 */
function getDaysOfMonth(date = new Date()) {
  if (!isDate(date)) date = new Date(date);

  const year = date.getFullYear();
  const month = date.getMonth();
  return 32 - new Date(year, month, 32).getDate();
};

const monthRange = (date = new Date()) => {
  let [year, month] = dateSpread(getUTFDate(date), false);
  let [_year, padded_month, lday] = dateSpread(
    getUTFDate(new Date(year, month, 0)),
    true
  );

  return {
    from: `${year}-${padded_month}-01`,
    to: `${year}-${padded_month}-${lday}`
  };
}

const formatDayMonthYear = (date = new Date(), locale='mx') => {
  let [year, month, day] = dateSpread(getUTFDate(date), false);
  return `${day} de ${MONTHS[locale][month-1]} ${year}`;
}

const formatDayMonthYearShort = (date = new Date(), locale='mx') => {
  let [year, month, day] = dateSpread(getUTFDate(date), false);
  return `${day} ${MONTHS_SHORT[locale][month-1]} ${year % 100}`;
}

function formatDateRange(date) {
  let fecha_gte = new Date(date.fecha_gte.replace(/-/g, '\/')); //lowest
  let fecha_lte = new Date(date.fecha_lte.replace(/-/g, '\/')); //highest

  if(fecha_gte.getMonth() === fecha_lte.getMonth()) {
    if((fecha_gte.getDate() === 1) && (fecha_lte.getDate() === getDaysOfMonth(fecha_gte))) {
      return `${MONTHS_SHORT.mx[fecha_gte.getMonth()]} ${fecha_gte.getFullYear()}`
    } else {
      return `${fecha_gte.getDate()} - ${fecha_lte.getDate()} ${MONTHS_SHORT.mx[fecha_gte.getMonth()]} ${fecha_gte.getFullYear()}`;
    }
  } else {
    return `${fecha_gte.getDate()} ${MONTHS_SHORT.mx[fecha_gte.getMonth()]} - ${fecha_lte.getDate()} ${MONTHS_SHORT.mx[fecha_lte.getMonth()]} ${fecha_lte.getFullYear()}`;

    return `${fecha_gte.getDate()} ${MONTHS_SHORT.mx[fecha_gte.getMonth()]} - ${fecha_lte.getDate()} ${MONTHS_SHORT.mx[fecha_lte.getMonth()]} ${fecha_lte.getFullYear()}`;
  }
};

/**
 * Array representation of a date: [YYYY, MM, DD, HH, mm]
 *
 * @param {Date} date - Instance of Date. If not provided, date will be Date.now()
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

const formatDateYYYYMMDD = (date) => {
  const [year, month, day] = dateSpread(date);
  return `${year}-${month}-${day}`;
}

const yesterday = () => {
  let a_day_before = new Date();
  a_day_before.setDate(a_day_before.getDate() - 1);

  return formatDateYYYYMMDD(a_day_before);
};

const firstDayOfYear = () => {
  const now = new Date();
  return `2017-09-01`;
  return `${now.getFullYear()}-01-01`;
};

const getUTFDate = (date) => {
  date = new Date(date);
  return new Date(date.getTime() + date.getTimezoneOffset()*60*1000);
};

const dateBasedSerial = () =>
  dateSpread().reduce((acc, e) => `${acc}${e}`, "");

/**
 * Clock
 * constructor = time in float format
 * example:
 * new Clock(37.32454);
 * Clock { time: 37.32454, hours: 37, minutes: 19, seconds: 28 }
 * */
class Clock {
  constructor(time=Date.now()) {
    this.time = time;
    this.hours = Math.floor(this.time);
    this.minutes = Math.floor((this.time % 1) * 60);
    this.seconds = Math.round((this.time * 3600) % 60);
  }

  hh_mm_ss() {
    const hh = this.hours;
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
  formatDateYYYYMMDD,
  formatDayMonthYear,
  formatDayMonthYearShort,
  getDaysOfMonth,
  getUTFDate,
  isDate,
  monthRange,
  yesterday,

  Clock
};

