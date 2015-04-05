"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveDate = resolveDate;
exports.resolveDay = resolveDay;
exports.resolveMonth = resolveMonth;
exports.resolveScalar = resolveScalar;

/*--------------------
  ----- Computation --
--------------------*/
exports.dayName = dayName;
exports.monthName = monthName;
exports.addDay = addDay;
exports.subDay = subDay;
exports.addMonth = addMonth;
exports.subMonth = subMonth;
exports.addYear = addYear;
exports.subYear = subYear;
exports.addHour = addHour;
exports.subHour = subHour;
exports.addMinute = addMinute;
exports.subMinute = subMinute;
exports.addSecond = addSecond;
exports.subSecond = subSecond;
exports.addMs = addMs;
exports.subMs = subMs;
exports.parts = parts;

/*--------------------
  ----- Getters ------
--------------------*/
exports.firstDayInstance = firstDayInstance;
exports.lastDayInstance = lastDayInstance;
exports.nthDayInstance = nthDayInstance;
exports.nextDayInstance = nextDayInstance;
exports.prevDayInstance = prevDayInstance;
exports.daysLeftInYear = daysLeftInYear;
exports.dateFromSpeech = dateFromSpeech;

var DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

var MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

function resolveDate() {
  var d = arguments[0] === undefined ? new Date() : arguments[0];

  if (d.constructor.name === "Date") {
    return d.getDate();
  } else if (d.constructor.name === "String") {
    return parseInt(d, 10);
  } else if (d.constructor.name === "Number") {
    return d;
  }
}

function resolveDay() {
  var d = arguments[0] === undefined ? new Date() : arguments[0];

  if (d.constructor.name === "Date") {
    return d.getDay();
  } else if (d.constructor.name === "String") {
    return DAYS.indexOf(d.toLowerCase());
  } else if (d.constructor.name === "Number") {
    return d;
  }
}

function resolveMonth() {
  var d = arguments[0] === undefined ? new Date() : arguments[0];

  if (d.constructor.name === "Date") {
    return d.getMonth();
  } else if (d.constructor.name === "String") {
    return MONTHS.indexOf(d.toLowerCase());
  } else if (d.constructor.name === "Number") {
    return d;
  }
}

function resolveYear() {
  var d = arguments[0] === undefined ? new Date() : arguments[0];

  if (d.constructor.name === "Date") {
    return d.getFullYear();
  } else if (d.constructor.name === "String") {
    return parseInt(d, 10);
  } else if (d.constructor.name === "Number") {
    return d;
  }
}

function resolveScalar(text) {
  var _ = require("lodash");
  if (!text) {
    return null;
  }var numberWords = {
    zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8,
    nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14,
    fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19,
    twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70,
    eighty: 80, ninety: 90, hundred: 100, thousand: 1000, million: 1000000,
    billion: 1000000000
  };

  var m = _.flatten(text.split(" ").map(function (w) {
    var breakDown = w.replace(/[_\.-]/g, " ").split(" ").map(function (m) {
      return numberWords[m];
    }).filter(function (m) {
      return m !== undefined;
    });
    if (breakDown.length) return reduceScalars(breakDown, []).reduce(function (a, b) {
      return a + b;
    });
    return [];
  }));

  if (!m.length) {
    return null;
  }function reduceScalars(_x47, _x48) {
    var _again = true;

    _function: while (_again) {
      _again = false;
      var m = _x47,
          n = _x48;

      if (m.length === 0) {
        return n;
      }if (n.length === 0) {
        _x47 = _.rest(m);
        _x48 = [_.first(m)];
        _again = true;
        continue _function;
      }

      if (_.first(m) > _.last(n)) {
        _x47 = m.slice(1);
        _x48 = _.union(_.initial(n), [_.first(m) * _.last(n)]);
        _again = true;
        continue _function;
      }

      _x47 = m.slice(1);
      _x48 = _.union(n, [m[0]]);
      _again = true;
      continue _function;
    }
  }

  return reduceScalars(m, []).reduce(function (a, b) {
    return a + b;
  });
}

function dayName() {
  var date = arguments[0] === undefined ? new Date() : arguments[0];

  if (date.constructor.name === "Date") {
    return DAYS[date.getDay()];
  }if (date.constructor.name === "Number") {
    return DAYS[date];
  }return null;
}

function monthName() {
  var date = arguments[0] === undefined ? new Date() : arguments[0];

  if (date.constructor.name === "Date") {
    return MONTHS[date.getMonth()];
  }if (date.constructor.name === "Number") {
    return MONTHS[d];
  }return null;
}

function addDay() {
  var date = arguments[0] === undefined ? new Date() : arguments[0];
  var n = arguments[1] === undefined ? 1 : arguments[1];

  /*
   * adds n days to date
   */
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + n, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
}

function subDay(date) {
  var n = arguments[1] === undefined ? 1 : arguments[1];

  /*
   * subtracts n days from date
   */
  return addDay(date, n * -1);
}

function addMonth() {
  var date = arguments[0] === undefined ? new Date() : arguments[0];
  var n = arguments[1] === undefined ? 1 : arguments[1];

  /* 
   * adds n months to date
   */
  return new Date(date.getFullYear(), date.getMonth() + n, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
}

function subMonth(date) {
  var n = arguments[1] === undefined ? 1 : arguments[1];

  /*
   * subtracts n months from date
   */
  return addMonth(date, n * -1);
}

function addYear() {
  var date = arguments[0] === undefined ? new Date() : arguments[0];
  var n = arguments[1] === undefined ? 1 : arguments[1];

  /*
   * adds n years to date
   */
  return new Date(date.getFullYear() + n, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
}

function subYear(date) {
  var n = arguments[1] === undefined ? 1 : arguments[1];

  /*
   * subtracts n years from date
   */
  return addYear(date, n * -1);
}

function addHour() {
  var date = arguments[0] === undefined ? new Date() : arguments[0];
  var n = arguments[1] === undefined ? 1 : arguments[1];

  /*
   * adds n hours to date
   */
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + n, date.getMinutes(), date.getSeconds(), date.getMilliseconds());
}

function subHour(date) {
  var n = arguments[1] === undefined ? 1 : arguments[1];

  /*
   * subtracts n hours from date
   */
  return addHour(date, n * -1);
}

function addMinute() {
  var date = arguments[0] === undefined ? new Date() : arguments[0];
  var n = arguments[1] === undefined ? 1 : arguments[1];

  /*
   * adds n minutes to date
   */
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() + n, date.getSeconds(), date.getMilliseconds());
}

function subMinute(date) {
  var n = arguments[1] === undefined ? 1 : arguments[1];

  /* 
   * subtracts n minutes from date
   */
  return addMinute(date, n * -1);
}

function addSecond() {
  var date = arguments[0] === undefined ? new Date() : arguments[0];
  var n = arguments[1] === undefined ? 1 : arguments[1];

  /*
   * adds n seconds to date
   */
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds() + n, date.getMilliseconds());
}

function subSecond(date) {
  var n = arguments[1] === undefined ? 1 : arguments[1];

  /*
   * subtracts n seconds from date
   */
  return addSecond(date, n * -1);
}

function addMs() {
  var date = arguments[0] === undefined ? new Date() : arguments[0];
  var n = arguments[1] === undefined ? 1 : arguments[1];

  /*
   * adds n milliseconds to date
   */
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds() + n);
}

function subMs(date) {
  var n = arguments[1] === undefined ? 1 : arguments[1];

  /*
   * subtracts n milliseconds from date
   */
  return addMs(date, n * -1);
}

function parts() {
  var date = arguments[0] === undefined ? null : arguments[0];

  /*
   * returns an array of the parts of a date object
   * if date is omitted from arguments it resolves to the current date
   */
  var d = date || new Date();
  return [d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getSeconds(), d.getMilliseconds()];
}

function firstDayInstance() {
  var day = arguments[0] === undefined ? undefined : arguments[0];
  var month = arguments[1] === undefined ? undefined : arguments[1];
  var year = arguments[2] === undefined ? undefined : arguments[2];

  /*
   * returns a date object for the first instance of some day in a month and year
   * if day is omitted from arguments, it will resolve to the current day
   * if month is omitted from arguments, it will resolve to the current month
   * if year is omitted from arguments, it will resolve to the current yearr
   *
   * Example ******************************************************************
   * superdate.firstDayInstance(0, 0, 2015) // returns 1/4/2015
   */
  var d = day === undefined ? new Date().getDay() : day;
  var y = year === undefined ? new Date().getFullYear() : year;
  var m = month === undefined ? new Date().getMonth() : month;
  var date = new Date(y, m, 1);
  var dayOfDate = date.getDay();

  if (d > dayOfDate) {
    return addDay(date, d - dayOfDate);
  } else if (d < dayOfDate) {
    return addDay(date, 7 - dayOfDate);
  }
  return date;
}

function lastDayInstance() {
  var day = arguments[0] === undefined ? undefined : arguments[0];
  var month = arguments[1] === undefined ? undefined : arguments[1];
  var year = arguments[2] === undefined ? undefined : arguments[2];

  /*
   * returns a date object for the last instance of some day in a month and year
   * if day is omitted from arguments, it will be resolve to the current day
   * if month is omitted from arguments, it will resolve to the current month
   * if year is omitted from arguments, it will resolve to the current yearr
   *
   * Example ******************************************************************
   * superdate.lastDayInstance(0, 0, 2015) // returns 1/25/2015
   */
  var d = day === undefined ? new Date().getDay() : day;
  var y = year === undefined ? new Date().getFullYear() : year;
  var m = month === undefined ? new Date().getMonth() : month;
  var date = subDay(new Date(y, m + 1, 1));
  var dayOfDate = date.getDay();

  if (d > dayOfDate) {
    return addDay(date, (7 + (dayOfDate - d)) * -1);
  } else if (d < dayOfDate) {
    return addDay(date, d - dayOfDate);
  }

  return date;
}

function nthDayInstance() {
  var date = arguments[0] === undefined ? new Date() : arguments[0];
  var day = arguments[1] === undefined ? undefined : arguments[1];
  var n = arguments[2] === undefined ? 1 : arguments[2];

  /*
   * returns the nth instance of some day, i.e. Sunday, from the date passed
   * in as an argument. 
   * if the date is ommitted from arguments, the current date will be used
   * if the day is ommitted from arguments, the day of the current date will
   * be used
   * if n is ommitted from arguments, the next instance will be returned
   * if n is not undefined, the nth instance of the day will be returned
   *
   * Example ************************************************************
   * superdate.nthDayInstance(new Date(), 5, 3) // returns the third Friday from
                                                // the current Date
   * superdate.nthDayInstance(new Date(), 5, -3) // returns the third past 
                                                 // Friday from the current Date
   */
  // if n > 0, decrement, if n < 0, increment, if n === 0, leave it
  var _n = n > 0 ? n - 1 : n < 0 ? n + 1 : 0;
  var _day = day === undefined ? date.getDay() : day;
  var month = month === undefined ? date.getMonth() : month;
  var year = year === undefined ? date.getFullYear() : year;
  var firstDay = firstDayInstance(_day, month, year);
  var nthDate = addDay(firstDay, 7 * _n);

  if (nthDate.getMonth() > month) {
    return subDay(nthDate, 7);
  }
  return nthDate;
}

function nextDayInstance(_x38, day) {
  var date = arguments[0] === undefined ? new Date() : arguments[0];

  /*
   * returns the most immediate future instance of some day, i.e., Sunday
   * from the date passed in to the argument list
   * if date is omitted from arguments, current date will be used
   * 
   * Example ************************************************************
   * superdate.nextDayInstance(new Date(2015, 0, 5), 0) // returns 1/4/2015
   */
  var delta = (function (d, cD) {
    if (cD > d) {
      return 7 - Math.abs(cD - d);
    }
    return Math.abs(cD - d) + 7;
  })(day, date.getDay());

  return addDay(date, delta);
}

function prevDayInstance(_x39, day) {
  var date = arguments[0] === undefined ? new Date() : arguments[0];

  /*
   * returns the most immediate previous instance of some day, i.e., Sunday
   * from the date passed in to the argument list
   * if date is omitted from arguments, current date will be used
   * 
   * Example ************************************************************
   * superdate.prevDayInstance(new Date(2015, 0, 5), 0) // returns 12/28/2014
   */
  var delta = (function (d, cD) {
    if (cD < d) {
      return 7 - Math.abs(cD - d);
    }
    return Math.abs(cD - d);
  })(day, date.getDay());

  return subDay(date, delta);
}

function daysLeftInYear() {
  var date = arguments[0] === undefined ? new Date() : arguments[0];
  var weekdays = arguments[1] === undefined ? false : arguments[1];

  /*
   * returns the number of days left in the year after the date
   * specified in the argument list.
   * if the date argument is omitted, the current date will be used.
   * if the weekdays argument is omitted, all days, inclusive of weekends
   * will be counted.
   * to count only weekdays, set weekdays to truthy value
   *
   * Example ************************************************************
   * superdate.daysLeftInYear(new Date(2015, 11, 1), false) // 30 days
   * superdate.daysLeftInYear(new Date(2015, 11, 1), true) // 22 days
   */
  if (!weekdays) {
    var nextYear = new Date(date.getFullYear() + 1, 0, 0);
    return parseInt((nextYear - date) / 86400000, 10);
  }

  var remainingDays = (function (_remainingDays) {
    function remainingDays() {
      return _remainingDays.apply(this, arguments);
    }

    remainingDays.toString = function () {
      return remainingDays.toString();
    };

    return remainingDays;
  })(function () {
    var d = arguments[0] === undefined ? date : arguments[0];
    var weekdays = arguments[1] === undefined ? true : arguments[1];
    var acc = arguments[2] === undefined ? 0 : arguments[2];

    if (d - new Date(d.getFullYear() + 1, 0, 0) === 0) {
      return acc;
    }

    if (d.getDay() === 0 || d.getDay() === 6) return remainingDays(addDay(d), weekdays, acc);

    return remainingDays(addDay(d), weekdays, acc + 1);
  });

  return parseInt(remainingDays(date, weekdays, 0), 10);
}

function dateFromSpeech() {
  var date = arguments[0] === undefined ? new Date() : arguments[0];
  var text = arguments[1] === undefined ? undefined : arguments[1];

  /*
   * parses English for number expressions and returns a date relative to 
   * the date supplied in the arguments list based off of what was said.
   * if date is omitted, the current date will be used
   * if text is omitted, a null value will be returned.
   *
   * Example ************************************************************
   * superdate.dateFromSpeech('two days from now') // returns date two days in 
   *                                               // future from current date
   * superdate.dateFromSpeech('forty-five days from now')
   */

  if (!text) {
    return null;
  } // start by looking for specific entities
  var primeTemporalRelevancePattern = "(next|after|between|before|until){1,2}((\\s{1}d+){1,}";
  var entitiesPattern = "monday|tuesday|wednesday|thursday|friday|saturday|" + "sunday|o' clock|week|day|month|year|decade|millenium|second|minute|" + "hour|millisecond|yesterday|tomorrow|today";

  var timePattern = "([0-2]?[0-9][:][0-5][0-9])|one|two|three|four|five|six|" + "seven|eight|nine|ten|eleven|twelve|thirty";

  var entity = text.match(new RegExp(entitiesPattern, "i"))[0];
  var isFuture = text.match(/negative|minus|ago|yester|before|last/) ? 0 : 1;
  var scalar = resolveScalar(text);
  var scale = isFuture ? scalar * 1 : scalar * -1;

  switch (entity) {
    case "millisecond":
      return addMs(date, scale);
    case "second":
      return addSecond(date, scale);
    case "minute":
      return addMinute(date, scale);
    case "hour":
      return addHour(date, scale);
    case "day":
      return addDay(date, scale);
    case "week":
      return addDay(date, scale * 7);
    case "month":
      return addMonth(date, scale);
    case "year":
      return addYear(date, scale);
    case "century":
      return addYear(date, scale * 100);
    case "millenium":
      return addYear(date, scale * 1000);
    case "monday":
    case "tuesday":
    case "wednesday":
    case "thursday":
    case "friday":
    case "saturday":
    case "sunday":
      var day = resolveDay(entity);
      if (isFuture) {
        return nextDayInstance(date, day);
      }return prevDayInstance(date, day);
    case "o'clock":
      break;
  }
}