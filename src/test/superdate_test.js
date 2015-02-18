const test = require('tap').test
const superdate = require('../')

// test('load superdate', function(t) {
//   t.ok(superdate, 'object loaded');
//   t.end();
// })

// test('resolve day and month to names', function(t){
//   t.plan(3)

//   let date = new Date(2015,0,1) // Jan. 1, 2015
//   t.equal(superdate.dayOfWeek(date), 'Thursday','first day of 2015 is Thursday')
//   t.equal(superdate.month(date), 'January', 'month should be January')
//   t.equal(superdate.year(), new Date().getFullYear(), 
//           'no arg should yield cuurent year')
//   t.end()
// })


// test('increment date', function(t) {
//   t.plan(3)

//   let date = new Date(2015,0,1) // Jan. 1, 2015
//   t.equal(superdate.addDay(date).getDate(),2, 'date should be 2')
//   t.equal(superdate.addDay(date, -1).getDate(), 31, 'date should be 31 (december)')
//   t.equal(superdate.subDay(date).getDate(), 31, 'date should be 31')
//   t.end()
// })

// test('increment month', function(t) {
//   t.plan(4)

//   let date = new Date(2013,0,1) // Jan. 1, 2015
//   t.equal(superdate.addMonth(date).getMonth(), 1, 'should be 1')
//   t.equal(superdate.addMonth(date, 4).getMonth(), 4, 'should be 5')
//   t.equal(superdate.addMonth(date, -1).getMonth(), 11, 'should be 11')
//   t.equal(superdate.subMonth(date, 1).getMonth(), 11, 'should be 11')
//   t.end()
// })

// test('increment year', function(t) {
//   t.plan(3)
  
//   let date = new Date(2015,01,01)
//   t.equal(superdate.addYear(date).getFullYear(), 2016, 'should be 2016')
//   t.equal(superdate.addYear(date, -2).getFullYear(), 2013, 'should be 2013')
//   t.equal(superdate.subYear(date, 2).getFullYear(), 2013, 'should be 2013')
//   t.end()
// })

// test('increment hour', function(t) {
//   t.plan(3)

//   var date = new Date(2015, 0, 1, 12)
//   t.equal(superdate.addHour(date, 4).getHours(), 16, 'should be 16 (4 PM)')
//   t.equal(superdate.addHour(date, -3).getHours(), 9, 'should be 9 AM')
//   t.equal(superdate.subHour(date, 3).getHours(), 9, 'should be 9')
//   t.end();
// })

// test('increment minutes', function(t) {
//   t.plan(3)

//   let date = new Date(2015, 0, 1, 12, 30);
//   t.equal(superdate.addMinute(date).getMinutes(), 31, 'minutes should be 31')
//   t.equal(superdate.addMinute(date, 15).getMinutes(), 45, 'should be 45')
//   t.equal(superdate.subMinute(date, 15).getMinutes(), 15, 'should be 15')
//   t.end()
// })

// test('increment seconds', function(t) {
//   t.plan(4)

//   let date = new Date(2015, 0, 1, 12, 59, 59);
//   t.equal(superdate.addSecond(date).getSeconds(), 0, 'seconds should be 0')
//   t.equal(superdate.addSecond(date, 2).getSeconds(), 1, 'seconds should be 1')
//   t.equal(superdate.subSecond(date, 10).getSeconds(), 49, 'seconds should be 49')
//   t.equal(superdate.subSecond(date, -1).getSeconds(), 0, 'seconds should be 0')
//   t.end();
// })

// test('increment milliseconds', function(t) {
//   t.plan(4)

//   let date = new Date(2015, 0, 1, 12, 59, 59, 999);
//   t.equal(superdate.addMs(date).getMilliseconds(), 0, 'ms should be 0')
//   t.equal(superdate.addMs(date, 10).getMilliseconds(), 9, 'ms should be 9')
//   t.equal(superdate.addMs(date).getSeconds(), 0, 'seconds should be 0')
//   t.equal(superdate.subMs(date).getMilliseconds(), 998, 'ms should be 998')
//   t.end();
// })

// test('get first day of month', function(t) {
//   t.plan(2)
//   let testDate = new Date(2015, 0, 3) // first Saturday of 2015 was the third
  
//   t.equal(superdate.firstDayInstance(6, 0, 2015).getTime(), testDate.getTime(), 
//           'should equal the first saturday in 2015')
  
//   let today = new Date()
//   let [year, month] = superdate.parts(today)
//   let day = superdate.day(today)
//   let daysUntilSunday = ((d) => {
//     if((d) > 0) return 7-d
//     return d
//   })(day)
  
//   let targetDate = superdate.addDay(today, daysUntilSunday)
//   t.equal(superday.firstDayInstance(0, month, year).getTime(), 
//           targetDate.getTime(), 'shold be equal to first sunda in current mo')
//   t.end();
// })

// test('get last instance of day in month', function(t){
//   t.plan(1)
  
// })

test('convert text number to actual number', function(t){
  t.plan(6)
  t.equal(null, superdate.resolveScalar('foo bar pfft'))
  t.equal(200, superdate.resolveScalar('two hundred'))
  t.equal(34, superdate.resolveScalar('thirty four'))
  t.equal(503, superdate.resolveScalar('five hundred and three'))
  t.equal(100347, superdate.resolveScalar('one hundred thousand three hundred forty seven'))
  t.equal(1347, superdate.resolveScalar('one thousand three hundred forty seven'))
 })

test('test translation from text', function(t){
  
  t.plan(8)
  let currentDate = new Date()

  let twoDaysFuture = superdate.dateFromSpeech('in two days')
  t.equal(Math.floor((twoDaysFuture - currentDate)/86400000), 2)
  
  let threeMonthsFuture = superdate.dateFromSpeech('in three months')
  t.equal(Math.round(((threeMonthsFuture - currentDate)/86400000)/10) * 10, 90)

  let threefoursevenDays = superdate.dateFromSpeech('in three hundred forty seven days')
  t.equal(Math.floor((threefoursevenDays - currentDate)/86400000), 347)
  
  let threefoursevenDaysAgo = superdate.dateFromSpeech('three hundred forty seven days ago')
  t.equal(Math.floor((threefoursevenDaysAgo - currentDate)/86400000), -347)
  
  let janOne = new Date(2015, 0, 1) // January 1, 2015 was a Thursday
  let nextWednesday = superdate.dateFromSpeech('next wednesday', janOne)
  t.equal(nextWednesday.getDate(), 7, 'should be the seventh of January')

  let janSeven = new Date(2015, 0, 7) // January 7, 2015 was a Wednesday
  let lastThursday = superdate.dateFromSpeech('last thursday', janSeven)
  t.equal(lastThursday.getDate(), 1, 'should be the first of January')
  
  let minusTwenty = superdate.dateFromSpeech('minus twenty days')
  t.equal(Math.round((currentDate - minusTwenty)/86400000), 20)
  
  let zeroDays = superdate.dateFromSpeech('zero days from now', currentDate)
  t.equal(Math.round(currentDate - zeroDays), 0, 'dates should be equal')
})

// test('get date of last instance of day [in month] [in year]', function(t)
//      {
//        //parameters: ([day],[month],[year])
// 	superdate = require('../');
// 	var date = new Date(), dayDate;
// 	//for paramater handling, see preceding test suite for getFirstInstanceOfDay(); the methods function the same
// 	/* 
// 		methods with omitted parameters commented out for purposes of showing how the method works. To test, you will need to update the dates to match the current month/year
// 	*/
// 	// dayDate = date.getLastDayInstance();
// 	// t.equal(dayDate,31,'date should be 31 for last Wednesday in July/2013');
// 	// dayDate = date.getLastDayInstance(0);
// 	// t.equal(dayDate,28,'date should be 28 for last Sunday in July/2013');
// 	// dayDate = date.getLastDayInstance(0,0);
// 	// t.equal(dayDate,27,'date should be 27 for last Sunday in Jan/2013');
// 	dayDate = date.getLastDayInstance(0,0,2000);
// 	t.equal(dayDate,30,'date should be 30 for last Sunday in Jan/2000');
// 	t.end();
// })
// test('get nth instance of day [in month] [in year]', function(t)
// {
// 	//parameters: (n,[day],[month],[year]) 
// 	// n is zero-indexed
// 	superdate = require('../');
// 	var date = new Date(), dayDate;
// 	/* 
// 		methods with omitted parameters commented out for purposes of showing how the method works. To test, you will need to update the dates to match the current month/year
// 	*/
// 	dayDate = date.getNthDayInstance(); // no parameters gets first instance of current day in current month in current year
// 	t.equal(dayDate,3,'date should be 3 for first Wednesday in July/2013');
// 	dayDate = date.getNthDayInstance(0); 
// 	t.equal(dayDate,3,'date should be 10 for first Wednesday in July/2013');
// 	dayDate = date.getNthDayInstance(2,0);
// 	t.equal(dayDate,21,'date should be 21 for third Sunday in July/2013');
// 	dayDate = date.getNthDayInstance(2,0,0);
// 	t.equal(dayDate,20,'date should be 20 for third Sunday in January/2013');
// 	dayDate = date.getNthDayInstance(2,0,0,2014);
// 	t.equal(dayDate,19,'date should be 19 for third Sunday in January/2014');
// 	t.end();
// })
// test('get next instance of day', function(t)
// {
// 	superdate = require('../');
// 	var date = new Date();
// 	t.equal(date.getNextDayInstance(0),21,'date should be 21 for next Sunday from 7/17/2013');
// 	t.equal(date.getNextDayInstance(0,2),28, 'date should be 28 for two Sundays from 7/17/2013');
// 	t.end();
// })
// test('get prior instance of day', function(t)
// {
// 	superdate = require('../');
// 	var date = new Date();
// 	t.equal(date.getPriorDayInstance(0),14,'date should be 14 for Sunday prior to 7/17/2013');
// 	t.equal(date.getPriorDayInstance(0,2),7,'date should be 7 for two Sundays prior to 7/17/2013');
// 	t.end();
// })
// test('get number of days remaining in year', function(t)
// {
// 	// takes one optional parameter, weekdays, which will limit return number of days to weekdays only
// 	superdate = require('../');
// 	var date = new Date();
// 	t.equal(date.getRemainingDaysInYear(),166,'there are 166 days left in the year as of 7/17/2013');
// 	t.equal(date.getRemainingDaysInYear(true),119,'there are 119 weekdays left in the year as of 7/17/2013');
// 	t.end();
// })
// test('set last day of month', function(t)
// {
// 	superdate = require('../');
// 	var date = new Date();
// 	var setDate = new Date(2000,0,31);
// 	date.setLastDayOfMonth(0,2000);

// 	t.equal(date.toLocaleDateString(),setDate.toLocaleDateString(),'date should be set to jan 31,2000');
// 	t.end();
// })
// test('set first day of month', function(t)
// {
// 	superdate = require('../');
// 	var date = new Date();
// 	var setDate = new Date(2000,0,1);
// 	date.setFirstDayOfMonth(0,2000);
// 	t.equal(date.toLocaleDateString(),setDate.toLocaleDateString(), 'date should be set to jan 1, 2000');
// 	t.end();
// })
// test('set date to next instance of day of week', function(t)
// {
// 	superdate = require('../');
// 	var date = new Date();
// 	date.setToFutureDayInstance(0);
// 	t.equal(date.getDate(),21,'date of next sunday from 7/17/2013 is 21');
// 	t.end();
// })
// test('set date to last (most recently past) instance of day of week', function(t)
// {
// 	superdate = require('../');
// 	var date = new Date();
// 	date.setToRecentDayInstance(0);
// 	t.equal(date.getDate(),14,'date of most recent sunday from 7/17/2013 is 14');
// 	date.setToRecentDayInstance(4,2);
// 	t.equal(date.getDate(),4,'date of two Thursdays prior to 7/17/2013 is 4')
// 	t.end();
// })

