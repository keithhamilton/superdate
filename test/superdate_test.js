var test = require('tap').test
	, superdate;
// var superdate = require('../');

test('load superdate', function(t)
{
	superdate = require('../');
	t.ok(superdate, 'object loaded');
	t.end();
})
test('resolve day and month to names', function(t)
{
	superdate = require('../');
	var date = new Date();
	t.equal(date.dayOfWeek(0),'Sunday','day 0 should be Sunday');
	t.equal(date.month(), 'July', 'current month should be July');
	t.equal(date.month(0), 'January', 'month 0 should be January');
	t.end();
})
test('increment date', function(t)
{
	superdate = require('../');
	var date = new Date(2013,01,01);
	date.addDay();
	t.equal(date.getDate(),2, 'date should be 2');
	date.addDay(-1);
	t.equal(date.getDate(),1,'date should be 1');
	t.end();
})
test('increment month', function(t)
{
	superdate = require('../');
	var date = new Date(2013,01,01);
	date.addMonth();
	t.equal(date.getMonth(),2,'month should be 2');
	date.addMonth(4);
	t.equal(date.getMonth(),6,'month should be 6');
	date.addMonth(-5);
	t.equal(date.getMonth(),1,'month should be 1');
	t.end();
})
test('increment year', function(t)
{
	superdate = require('../');
	var date = new Date(2013,01,01);
	date.addYear();
	t.equal(date.getFullYear(),2014,'year should be 2014');
	date.addYear(-2);
	t.equal(date.getFullYear(),2012,'year should be 2012');
	t.end();
})
test('increment hour', function(t)
{
	superdate = require('../');
	// noon Jan 01, 2013
	var date = new Date(2013,01,01,12);
	date.addHours(4);
	t.equal(date.getHours(),16,'hours should be 16 (4 PM)');
	date.addHours(-3);
	t.equal(date.getHours(),13,'hours should be 12 (noon)');
	date.addHours(1.5);
	t.equal(date.getHours(),14,'hours should be 14 (1 PM)');
	t.equal(date.getMinutes(),30,'minutes should be 30');
	t.end();
})
test('increment minutes', function(t)
{
	superdate = require('../');
	//12:30, Jan 01, 2013
	var date = new Date(2013,01,01,12,30);
	date.addMinutes(30);
	t.equal(date.getMinutes(),0,'minutes should be 0');
	t.equal(date.getHours(),13,'hours should be 13 (1 PM)');
	t.end();
})
test('increment seconds', function(t)
{
	superdate = require('../');
	//12:59:59, Jan 01, 2013
	var date = new Date(2013,01,01,12,59,59);
	date.addSeconds(1);
	t.equal(date.getSeconds(),0,'seconds should be 0');
	t.equal(date.getMinutes(),0,'minutes should be 0');
	t.equal(date.getHours(),13,'hours should be 13 (1 PM)');
	t.end();
})
test('increment milliseconds', function(t)
{
	superdate = require('../');
	//12:59:59:999, Jan 01, 2013
	var date = new Date(2013,01,01,12,59,59,999);
	date.addMilliseconds(1);
	t.equal(date.getMilliseconds(),0,'milliseconds should be 0');
	t.equal(date.getSeconds(),0,'seconds should be 0');
	t.equal(date.getMinutes(),0,'minutes should be 0');
	t.equal(date.getHours(),13,'hours should be 13 (1 PM)');
	t.end();
})
test('get first/last day of month', function(t)
{
	superdate = require('../');
	var date = new Date(), day;
	// passing in month, year gets first day of month for month in year
	day = date.getFirstDayOfMonth(0,2013);
	t.equal(day,2,'day should be 2 (Tuesday)');
	// omitting year gets last day of month for current year
	day = date.getLastDayOfMonth(0);
	t.equal(day,4,'day should be 4 (Thursday)');
	day = date.getLastDayOfMonth();
	// omitting both parameters gets current month and year (July 2013)
	t.equal(day,3,'day should be 3 (Wednesday)')
	t.end(); 
})
test('get date of first instance of day [in month] [in year]', function(t)
{
	//parameters: ([day], [month], [year])
	superdate = require('../');
	var date = new Date(), dayDate;
	/* 
		methods with omitted parameters commented out for purposes of showing how the method works. To test, you will need to update the dates to match the current month/year
	*/
	// omitting all parameters gets first date instance of current day of week in current month in current year
	// dayDate = date.getFirstDayInstance();
	// t.equal(dayDate,3,'date should be 3 for first Wednesday in July/2013');
	// // passing a day (0-6) will return date of first instance of that day in current month of current year
	// dayDate = date.getFirstDayInstance(0); //first Sunday of current month, current year
	// t.equal(dayDate,7,'date should be 7 for first Sunday in July/2013');
	// // passing a day and month will return the date of the first instance of that day in the given month in the current year
	// dayDate = date.getFirstDayInstance(0,0); // first Sunday of January in current year
	// t.equal(dayDate,6,'date should be 6 for first Sunday in January/2013');
	
	// passing all three (day, month, year) will return the date of the first instance of that day in the given month in the given year
	dayDate = date.getFirstDayInstance(0,0,2000); // first sunday of January/2000
	t.equal(dayDate,2,'date should be 2 for first Sunday in January/2000');
	t.end(); 
})
test('get date of last instance of day [in month] [in year]', function(t)
{
	//parameters: ([day],[month],[year])
	superdate = require('../');
	var date = new Date(), dayDate;
	//for paramater handling, see preceding test suite for getFirstInstanceOfDay(); the methods function the same
	/* 
		methods with omitted parameters commented out for purposes of showing how the method works. To test, you will need to update the dates to match the current month/year
	*/
	// dayDate = date.getLastDayInstance();
	// t.equal(dayDate,31,'date should be 31 for last Wednesday in July/2013');
	// dayDate = date.getLastDayInstance(0);
	// t.equal(dayDate,28,'date should be 28 for last Sunday in July/2013');
	// dayDate = date.getLastDayInstance(0,0);
	// t.equal(dayDate,27,'date should be 27 for last Sunday in Jan/2013');
	dayDate = date.getLastDayInstance(0,0,2000);
	t.equal(dayDate,30,'date should be 30 for last Sunday in Jan/2000');
	t.end();
})
test('get nth instance of day [in month] [in year]', function(t)
{
	//parameters: (n,[day],[month],[year]) 
	// n is zero-indexed
	superdate = require('../');
	var date = new Date(), dayDate;
	/* 
		methods with omitted parameters commented out for purposes of showing how the method works. To test, you will need to update the dates to match the current month/year
	*/
	dayDate = date.getNthDayInstance(); // no parameters gets first instance of current day in current month in current year
	t.equal(dayDate,3,'date should be 3 for first Wednesday in July/2013');
	dayDate = date.getNthDayInstance(0); 
	t.equal(dayDate,3,'date should be 10 for first Wednesday in July/2013');
	dayDate = date.getNthDayInstance(2,0);
	t.equal(dayDate,21,'date should be 21 for third Sunday in July/2013');
	dayDate = date.getNthDayInstance(2,0,0);
	t.equal(dayDate,20,'date should be 20 for third Sunday in January/2013');
	dayDate = date.getNthDayInstance(2,0,0,2014);
	t.equal(dayDate,19,'date should be 19 for third Sunday in January/2014');
	t.end();
})
test('get next instance of day', function(t)
{
	superdate = require('../');
	var date = new Date();
	t.equal(date.getNextDayInstance(0),21,'date should be 21 for next Sunday from 7/17/2013');
	t.equal(date.getNextDayInstance(0,2),28, 'date should be 28 for two Sundays from 7/17/2013');
	t.end();
})
test('get prior instance of day', function(t)
{
	superdate = require('../');
	var date = new Date();
	t.equal(date.getPriorDayInstance(0),14,'date should be 14 for Sunday prior to 7/17/2013');
	t.equal(date.getPriorDayInstance(0,2),7,'date should be 7 for two Sundays prior to 7/17/2013');
	t.end();
})
test('get number of days remaining in year', function(t)
{
	// takes one optional parameter, weekdays, which will limit return number of days to weekdays only
	superdate = require('../');
	var date = new Date();
	t.equal(date.getRemainingDaysInYear(),166,'there are 166 days left in the year as of 7/17/2013');
	t.equal(date.getRemainingDaysInYear(true),119,'there are 119 weekdays left in the year as of 7/17/2013');
	t.end();
})
test('set last day of month', function(t)
{
	superdate = require('../');
	var date = new Date();
	var setDate = new Date(2000,0,31);
	date.setLastDayOfMonth(0,2000);

	t.equal(date.toLocaleDateString(),setDate.toLocaleDateString(),'date should be set to jan 31,2000');
	t.end();
})
test('set first day of month', function(t)
{
	superdate = require('../');
	var date = new Date();
	var setDate = new Date(2000,0,1);
	date.setFirstDayOfMonth(0,2000);
	t.equal(date.toLocaleDateString(),setDate.toLocaleDateString(), 'date should be set to jan 1, 2000');
	t.end();
})
test('set date to next instance of day of week', function(t)
{
	superdate = require('../');
	var date = new Date();
	date.setToFutureDayInstance(0);
	t.equal(date.getDate(),21,'date of next sunday from 7/17/2013 is 21');
	t.end();
})
test('set date to last (most recently past) instance of day of week', function(t)
{
	superdate = require('../');
	var date = new Date();
	date.setToRecentDayInstance(0);
	t.equal(date.getDate(),14,'date of most recent sunday from 7/17/2013 is 14');
	date.setToRecentDayInstance(4,2);
	t.equal(date.getDate(),4,'date of two Thursdays prior to 7/17/2013 is 4')
	t.end();
})