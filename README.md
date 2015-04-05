superdate
=========

Superdate is a functional convenience library for working with Date objects.
I decided I really hated having to write:

``` js
var date = new Date()
// I want to add two days
date.setDate(date.getDate() + 2)
```

and decided to embark on writing this library. Originally it used to extend the
Date.prototype object, now refactored to have the same functionality, but also
to be 100% functional, using only pure functions.

Instead of the above code to change the date by a couple days, with superdate,
you just call the ``addDate`` method:

```js
var newDate = superdate.addDate(date, 2);
```

Superdate provides functionality to stuff like:

- find the first Tuesday in a month
- add/subtract any relevant part of a date (year, month, milisecond, etc.)
- advance your date three Tuesdays into the future
- parse date differences from speech ("Set that for three days from now")
- a whole lot more.

To check out all the methods, see the source or the tests (for examples). 

# building, cleaning, testing
To build the script, run ```gulp build```
To run the tests, run ```gulp test```
To clean, run ```gulp clean```

# usage
``` js
const superdate = require('superdate');
const date = new Date(2015,6,17); // July 4, 2015

// computations on date object
superdate.addDay(date); // July 5, 2015
superdate.addDay(date, 10); // July 14, 2015
superdate.addMonth(date); // August 4, 2015
console.log(superdate.resolveMonth('January')); // 0
console.log(superdate.dayOfWeek('Sunday')); // 0

// get information about dates surrounding your date object
superdate.getFirstDayOfMonth() // 3 (Wednesday, July 1)
let nextSundayDate = superdate.getNextDayInstance(date, 0); // July 5, 2015

let numDaysLeftInYear = superdate.daysLeftInYear(date); // 180
```

Again, for a more complete look, check out the tests. Many of the methods have
optional parameters that will default to the current date's
properties if omitted (month would resolve to ``new Date.getMonth()``,
for example, if omitted from a method).





