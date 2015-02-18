const test = require('tap').test
const superdate = require('../')

test('load superdate', function(t) {
  t.ok(superdate, 'object loaded');
  t.end();
})

test('resolve day and month to names', function(t){
  t.plan(2)

  let date = new Date(2015,0,1) // Jan. 1, 2015
  t.equal(superdate.dayName(date), 'thursday','first day of 2015 is Thursday')
  t.equal(superdate.monthName(date), 'january', 'month should be January')
})


test('increment date', function(t) {
  t.plan(3)

  let date = new Date(2015,0,1) // Jan. 1, 2015
  t.equal(superdate.addDay(date).getDate(),2, 'date should be 2')
  t.equal(superdate.addDay(date, -1).getDate(), 31, 'date should be 31 (december)')
  t.equal(superdate.subDay(date).getDate(), 31, 'date should be 31')
})

test('increment month', function(t) {
  t.plan(4)

  let date = new Date(2013,0,1) // Jan. 1, 2015
  t.equal(superdate.addMonth(date).getMonth(), 1, 'should be 1')
  t.equal(superdate.addMonth(date, 4).getMonth(), 4, 'should be 5')
  t.equal(superdate.addMonth(date, -1).getMonth(), 11, 'should be 11')
  t.equal(superdate.subMonth(date, 1).getMonth(), 11, 'should be 11')
})

test('increment year', function(t) {
  t.plan(3)
  
  let date = new Date(2015,01,01)
  t.equal(superdate.addYear(date).getFullYear(), 2016, 'should be 2016')
  t.equal(superdate.addYear(date, -2).getFullYear(), 2013, 'should be 2013')
  t.equal(superdate.subYear(date, 2).getFullYear(), 2013, 'should be 2013')
})

test('increment hour', function(t) {
  t.plan(3)

  var date = new Date(2015, 0, 1, 12)
  t.equal(superdate.addHour(date, 4).getHours(), 16, 'should be 16 (4 PM)')
  t.equal(superdate.addHour(date, -3).getHours(), 9, 'should be 9 AM')
  t.equal(superdate.subHour(date, 3).getHours(), 9, 'should be 9')
})

test('increment minutes', function(t) {
  t.plan(3)

  let date = new Date(2015, 0, 1, 12, 30);
  t.equal(superdate.addMinute(date).getMinutes(), 31, 'minutes should be 31')
  t.equal(superdate.addMinute(date, 15).getMinutes(), 45, 'should be 45')
  t.equal(superdate.subMinute(date, 15).getMinutes(), 15, 'should be 15')
})

test('increment seconds', function(t) {
  t.plan(4)

  let date = new Date(2015, 0, 1, 12, 59, 59);
  t.equal(superdate.addSecond(date).getSeconds(), 0, 'seconds should be 0')
  t.equal(superdate.addSecond(date, 2).getSeconds(), 1, 'seconds should be 1')
  t.equal(superdate.subSecond(date, 10).getSeconds(), 49, 'seconds should be 49')
  t.equal(superdate.subSecond(date, -1).getSeconds(), 0, 'seconds should be 0')
})

test('increment milliseconds', function(t) {
  t.plan(4)

  let date = new Date(2015, 0, 1, 12, 59, 59, 999);
  t.equal(superdate.addMs(date).getMilliseconds(), 0, 'ms should be 0')
  t.equal(superdate.addMs(date, 10).getMilliseconds(), 9, 'ms should be 9')
  t.equal(superdate.addMs(date).getSeconds(), 0, 'seconds should be 0')
  t.equal(superdate.subMs(date).getMilliseconds(), 998, 'ms should be 998')
})

test('get first day of month', function(t) {
  t.plan(1)
  let testDate = new Date(2015, 0, 3) // first Saturday of 2015 was the third
  
  t.equal(superdate.firstDayInstance(6, 0, 2015).getTime(), testDate.getTime(), 
          'should equal the first saturday in 2015')
})

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

  let twoDaysFuture = superdate.dateFromSpeech(currentDate, 'in two days')
  t.equal(Math.floor((twoDaysFuture - currentDate)/86400000), 2)
  
  let threeMonthsFuture = superdate.dateFromSpeech(currentDate, 'in three months')
  t.equal(Math.round(((threeMonthsFuture - currentDate)/86400000)/10) * 10, 90)

  let threefoursevenDays = superdate.dateFromSpeech(currentDate, 'in three hundred forty seven days')
  t.equal(Math.floor((threefoursevenDays - currentDate)/86400000), 347)
  
  let threefoursevenDaysAgo = superdate.dateFromSpeech(currentDate, 'three hundred forty seven days ago')
  t.equal(Math.floor((threefoursevenDaysAgo - currentDate)/86400000), -347)
  
  let janOne = new Date(2015, 0, 1) // January 1, 2015 was a Thursday
  let nextWednesday = superdate.dateFromSpeech(janOne, 'next wednesday')
  t.equal(nextWednesday.getDate(), 7, 'should be the seventh of January')

  let janSeven = new Date(2015, 0, 7) // January 7, 2015 was a Wednesday
  let lastThursday = superdate.dateFromSpeech(janSeven, 'last thursday')
  t.equal(lastThursday.getDate(), 1, 'should be the first of January')
  
  let minusTwenty = superdate.dateFromSpeech(currentDate, 'minus twenty days')
  t.equal(Math.round((currentDate - minusTwenty)/86400000), 20)
  
  let zeroDays = superdate.dateFromSpeech(currentDate, 'zero days from now')
  t.equal(Math.round(currentDate - zeroDays), 0, 'dates should be equal')
})

test('get date of first instance of day [in month] [in year]', function(t){
  t.plan(2)
  let dayDate = superdate.firstDayInstance(0, 0, 2014)
  t.equal(dayDate.getDate(), 5, 'should be 5 for first Sunday in Jan/2014')
  
  let nextDayDate = superdate.firstDayInstance(5, 0, 2014)
  t.equal(nextDayDate.getDate(), 3, 'should be 3 for first Friday in Jan/2014')
})

test('get date of last instance of day [in month] [in year]', function(t){
  t.plan(2)
  let dayDate = superdate.lastDayInstance(0, 0, 2014)
  t.equal(dayDate.getDate(), 26, 'should be 26 for last Sunday in Jan/2014')
  
  let nextDayDate = superdate.lastDayInstance(5, 0, 2014)
  t.equal(nextDayDate.getDate(), 31, 'should be 31 for last Friday in Jan/2014')
})

test('get nth instance of day [in month] [in year]', function(t){
  t.plan(6)
  let date = new Date()
  /* 
     methods with omitted parameters commented out for purposes of showing how the method works. To test, you will need to update the dates to match the current month/year
  */
  let day = superdate.nthDayInstance(new Date(2015, 0), 0, 1)
  t.equal(day.getDate(), 4, 'date should be 4 for first Sunday in Jan/2015')

  day = superdate.nthDayInstance(new Date(2013, 6), 3, 1)
  t.equal(day.getDate(), 3, 'date should be 3 for first Wednesday in July/2013')
  day = superdate.nthDayInstance(new Date(2013, 6), 0, 3)
  t.equal(day.getDate(), 21, 'date should be 21 for third Sunday in July/2013')
  day = superdate.nthDayInstance(new Date(2013, 0), 0, 3)
  t.equal(day.getDate(), 20, 'date should be 20 for third Sunday in January/2013')
  day = superdate.nthDayInstance(new Date(2014, 0, 1), 0, 3)
  t.equal(day.getDate(), 19, 'date should be 19 for third Sunday in January/2014')
  day = superdate.nthDayInstance(new Date(2013, 0), 0, -2)
  t.equal(day.getDate(), 23, 'date should be 23 for fourth Sunday in December/2012')
})

test('get next instance of day', function(t){
  t.plan(2)
  let date = new Date(2015, 0, 1) // January 1, 2015
  t.equal(superdate.nextDayInstance(date, 0).getDate(), 4, 'date should be Jan 4, 2015')
  t.equal(superdate.nextDayInstance(date, 2).getDate(), 6, 'date should be Jan 6, 2015')
})

test('get prior instance of day', function(t){
  t.plan(4)
  /* set the date to Feb 5, 2015 (a Thursday), then fetch the date of the
   * previous Sunday (Feb 1, 2015) and the previous Friday (Jan 30, 2015). 
   */
  var date = new Date(2015, 1, 5) // Feb. 5, 2015
  t.equal(superdate.prevDayInstance(date, 0).getDate(), 1, 'date should be 1 (Feb 1, 2015)')
  t.equal(superdate.prevDayInstance(date, 0).getMonth(), 1, 'month should be 1 (February)')
  t.equal(superdate.prevDayInstance(date, 5).getDate(), 30,'date should be 30 (Jan 30, 2015)')
  t.equal(superdate.prevDayInstance(date, 5).getMonth(), 0, 'month should be 0 (January)')
})

test('get number of days remaining in year', function(t){
  // takes one optional parameter, weekdays, which will limit return number of days to weekdays only
  t.plan(2)
  var date = new Date(2015, 11, 1) // Dec 1, 2015 (30 days left, 23 weekdays)
  t.equal(superdate.daysLeftInYear(date),30, 'there are 30 days left in the year after 12/1/2015')
  t.equal(superdate.daysLeftInYear(date,true), 22,'there are 22 weekdays left in the year after 12/1/2015')
})



