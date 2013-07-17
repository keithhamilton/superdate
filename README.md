superdate
=========

Extends Date.prototype with many convenience methods. Superdate transforms a date object into a much stronger object that can generate dates (integers), find remaining days in the year, find the next occurence of Thursday (for example), and much more.

To check out how the methods work, see the test suite (all methds tested in test suite);

# methods
``` js
var superdate = require('superdate');
```

# usage
``` js
var superdate = require('superdate');
var date = new Date(2013,6,17); // July 17, 2013 

// computations on date object
date.addDay(); // date --> July 18, 2013
date.addDay(10); // date --> July 28, 2013
date.addMonth(); // date --> August 28, 2013
console.log(date.month()); // outputs 'August'
console.log(date.dayOfWeek()); // outputs 'Wednesday'

// get information about dates surrounding your date object
var day = date.getFirstDayOfMonth() // day === 4 (Thursday, August 1)
var nextSundayDate = date.getNextDayInstance(0); // nextSundayDate === 1 (September 1)

var date = new Date(2013,6,17); // resetting to July 17, 2013
var numDaysLeftInYear = date.getRemainingDaysInYear(); // numDaysLeftInYear === 166
var numWeekdaysLeftInYear = date.getRemainingDaysInYear(true); numWeekdaysLeftInYear === 119

//set the date object to relative dates to current
date.setLastDayOfMonth(); // date --> July 31, 2013
date.setFirstDayOfMonth(3,2013); // date --> April 1, 2013
date.setToFutureDayInstance(0,3); // date --> April 19, 2013 (three sundays from April 1)
date.setToRecentDayInstance(3,3); // date --> April 1, 2013 (three wednesdays prior to April 19)
```

Again, for a more complete look, check out the tests. Many of the methods have optional parameters that will default to the current value of the date's properties if omitted (month would resolve to date.getMonth(), for example if omitted from a method).





