
const DAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
]

const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december"
];

export function resolveDate(d=new Date()) {
  if (d.constructor.name === 'Date') {
    return d.getDate()
  }
  else if(d.constructor.name === 'String'){
    return parseInt(d, 10)
  }
  else if(d.constructor.name === 'Number'){
    return d
  }
}

export function resolveDay(d=new Date()) {
  if (d.constructor.name === 'Date') {
    return d.getDay()
  }
  else if(d.constructor.name === 'String'){
    return DAYS.indexOf(d.toLowerCase())
  }
  else if(d.constructor.name === 'Number'){
    return d
  }
}

export function resolveMonth(d=new Date()) {
  if (d.constructor.name === 'Date') {
    return d.getMonth()
  }
  else if(d.constructor.name === 'String'){
    return MONTHS.indexOf(d.toLowerCase())
  }
  else if(d.constructor.name === 'Number'){
    return d
  }
}

function resolveYear(d=new Date()) {
  if (d.constructor.name === 'Date') {
    return d.getFullYear()
  }
  else if(d.constructor.name === 'String'){
    return parseInt(d, 10)
  }
  else if(d.constructor.name === 'Number'){
    return d
  }
}

export function resolveScalar(text){
  const _ = require('lodash')
  if(!text) return null

  let numberWords = {
    zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8,
    nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14,
    fifteen: 15, sixteen: 16, seventeen: 17,  eighteen: 18, nineteen: 19,
    twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70,
    eighty: 80, ninety: 90, hundred: 100, thousand: 1000, million: 1000000,
    billion: 1000000000
  }  
  
  let m = _.flatten(text.split(' ').map((w) => {
    let breakDown = w.replace(/[_\.-]/g, ' ').split(' ')
    .map((m) => numberWords[m])
    .filter((m) => m !== undefined)
    if(breakDown.length)
      return reduceScalars(breakDown, []).reduce((a, b) => a + b)
    return []}))

  if(!m.length) return null
  
  function reduceScalars(m, n){
    if(m.length === 0)  
      return n
    if(n.length === 0) 
      return reduceScalars(_.rest(m), [_.first(m)])

    if(_.first(m) > _.last(n)){
      return reduceScalars(m.slice(1), 
                           _.union(_.initial(n), [_.first(m) * _.last(n)]))
    }

    return reduceScalars(m.slice(1), _.union(n, [m[0]]))
  }
  
  return reduceScalars(m, [])
    .reduce((a, b) => a + b)
}
  
/*--------------------
  ----- Computation --
--------------------*/
export function dayName(date=new Date()) {
  if (date.constructor.name === "Date")
    return DAYS[date.getDay()]
  if (date.constructor.name === 'Number')
    return DAYS[date]

  return null
}

export function monthName(date=new Date()) {
  if (date.constructor.name === 'Date')
    return MONTHS[date.getMonth()]
  if (date.constructor.name === 'Number')
    return MONTHS[d]

  return null
}

export function addDay(date=new Date(), n=1) {
  /*
   * adds n days to date
   */
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + n,
                 date.getHours(), date.getMinutes(), date.getSeconds(),
                 date.getMilliseconds())
}

export function subDay(date, n=1){
  /*
   * subtracts n days from date
   */
  return addDay(date, (n * -1))
}

export function addMonth(date=new Date(), n=1) {
  /* 
   * adds n months to date
   */
  return new Date(date.getFullYear(), date.getMonth() + n, date.getDate(),
                 date.getHours(), date.getMinutes(), date.getSeconds(),
                 date.getMilliseconds())
}

export function subMonth(date, n=1) {
  /*
   * subtracts n months from date
   */
  return addMonth(date, (n * -1))
}

export function addYear(date=new Date(), n=1) {
  /*
   * adds n years to date
   */
  return new Date(date.getFullYear() + n, date.getMonth(), date.getDate(),
                 date.getHours(), date.getMinutes(), date.getSeconds(),
                 date.getMilliseconds())                  
}

export function subYear(date, n=1) { 
  /*
   * subtracts n years from date
   */
  return addYear(date, (n * -1))
}

export function addHour(date=new Date(), n=1) {
  /*
   * adds n hours to date
   */
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                 date.getHours() + n, date.getMinutes(), date.getSeconds(),
                 date.getMilliseconds())
}

export function subHour(date, n=1) {
  /*
   * subtracts n hours from date
   */
  return addHour(date, (n * -1))
}
 
export function addMinute(date=new Date(), n=1) {
  /*
   * adds n minutes to date
   */
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                 date.getHours(), date.getMinutes() + n, date.getSeconds(),
                 date.getMilliseconds())
}

export function subMinute(date, n=1) { 
  /* 
   * subtracts n minutes from date
   */
  return addMinute(date, (n * -1))
}

export function addSecond(date=new Date(), n=1){
  /*
   * adds n seconds to date
   */
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                  date.getHours(), date.getMinutes(), date.getSeconds() + n,
                  date.getMilliseconds())
}

export function subSecond(date, n=1) { 
  /*
   * subtracts n seconds from date
   */
  return addSecond(date, (n * -1))
}

export function addMs(date=new Date(), n=1){
  /*
   * adds n milliseconds to date
   */
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                  date.getHours(), date.getMinutes(), date.getSeconds(),
                  date.getMilliseconds() + n)
}

export function subMs(date, n=1) { 
  /*
   * subtracts n milliseconds from date
   */
  return addMs(date, (n * -1))
}

export function parts(date=null) {
  /*
   * returns an array of the parts of a date object
   * if date is omitted from arguments it resolves to the current date
   */
  let d = date || new Date()
  return [d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(),
          d.getSeconds(), d.getMilliseconds()]
}

/*--------------------
  ----- Getters ------
--------------------*/
export function firstDayInstance(day=undefined, month=undefined, year=undefined) {
  /*
   * returns a date object for the first instance of some day in a month and year
   * if day is omitted from arguments, it will resolve to the current day
   * if month is omitted from arguments, it will resolve to the current month
   * if year is omitted from arguments, it will resolve to the current yearr
   *
   * Example ******************************************************************
   * superdate.firstDayInstance(0, 0, 2015) // returns 1/4/2015
   */
  let d = day === undefined ? new Date().getDay() : day
  let y = year === undefined ? new Date().getFullYear() : year
  let m = month === undefined ?  new Date().getMonth() : month
  let date = new Date(y, m, 1)
  let dayOfDate = date.getDay()

  if (d > dayOfDate) {
    return addDay(date, (d - dayOfDate))
  }
  else if (d < dayOfDate) {
    return addDay(date, (7 - dayOfDate))
  }
  return date
}

export function lastDayInstance(day=undefined, month=undefined, year=undefined) {
  /*
   * returns a date object for the last instance of some day in a month and year
   * if day is omitted from arguments, it will be resolve to the current day
   * if month is omitted from arguments, it will resolve to the current month
   * if year is omitted from arguments, it will resolve to the current yearr
   *
   * Example ******************************************************************
   * superdate.lastDayInstance(0, 0, 2015) // returns 1/25/2015
   */
  let d = day === undefined ? new Date().getDay() : day
  let y = year === undefined ? new Date().getFullYear() : year
  let m = month === undefined ?  new Date().getMonth() : month
  let date = subDay(new Date(y, (m + 1), 1))
  let dayOfDate = date.getDay()

  if(d > dayOfDate){
    return addDay(date, (7 + (dayOfDate - d)) * -1)
  }
  else if(d < dayOfDate){
    return addDay(date, d - dayOfDate)
  }

  return date
 }

export function nthDayInstance(date=new Date(), day=undefined, n=1) {
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
  let _n = n > 0 ? n - 1 : n < 0 ? n + 1 : 0
  let _day = day === undefined ? date.getDay() : day
  let month = month === undefined ? date.getMonth() : month
  let year = year === undefined ? date.getFullYear() : year
  let firstDay = firstDayInstance(_day, month, year)
  let nthDate = addDay(firstDay, (7 * _n))

  if(nthDate.getMonth() > month) {
    return subDay(nthDate, 7)
  }
  return nthDate
}

export function nextDayInstance(date=new Date(), day) {
  /*
   * returns the most immediate future instance of some day, i.e., Sunday
   * from the date passed in to the argument list
   * if date is omitted from arguments, current date will be used
   * 
   * Example ************************************************************
   * superdate.nextDayInstance(new Date(2015, 0, 5), 0) // returns 1/4/2015
   */
  let delta = ((d, cD) => {
    if(cD > d) {
      return (7 - Math.abs(cD - d))
    }
    return Math.abs(cD - d) + 7
  })(day, date.getDay())

  return addDay(date, delta)
}

export function prevDayInstance(date=new Date(), day) {
  /*
   * returns the most immediate previous instance of some day, i.e., Sunday
   * from the date passed in to the argument list
   * if date is omitted from arguments, current date will be used
   * 
   * Example ************************************************************
   * superdate.prevDayInstance(new Date(2015, 0, 5), 0) // returns 12/28/2014
   */
  let delta = ((d, cD) => {
    if(cD < d) {
      return 7 - Math.abs(cD - d)
    }
    return Math.abs(cD - d)
  })(day, date.getDay())

  return subDay(date, delta)
}

export function daysLeftInYear(date=new Date(), weekdays=false) {
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
  if(!weekdays) {
    let nextYear = new Date(date.getFullYear() + 1, 0, 0)
    return parseInt((nextYear - date)/86400000, 10)
  }
  
  let remainingDays = function(d=date, weekdays=true, acc=0){
    if(d - new Date(d.getFullYear()+1, 0, 0) === 0){
      return acc
    }

    if(d.getDay() === 0 || d.getDay() === 6)
      return remainingDays(addDay(d), weekdays, acc)

    return remainingDays(addDay(d), weekdays, (acc + 1))
  }
  
  return parseInt(remainingDays(date, weekdays, 0), 10)
}


export function dateFromSpeech(date=new Date(), text=undefined){
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

  if (!text) return null

  // start by looking for specific entities
  let primeTemporalRelevancePattern = 
      '(next|after|between|before|until){1,2}((\\s{1}\d+){1,}'
  let entitiesPattern = 'monday|tuesday|wednesday|thursday|friday|saturday|' + 
      'sunday|o\' clock|week|day|month|year|decade|millenium|second|minute|' +
      'hour|millisecond|yesterday|tomorrow|today'

  let timePattern = '([0-2]?[0-9][:][0-5][0-9])|one|two|three|four|five|six|' + 
      'seven|eight|nine|ten|eleven|twelve|thirty'
  
  let entity = text.match(new RegExp(entitiesPattern, 'i'))[0]
  let isFuture = text.match(/negative|minus|ago|yester|before|last/) ? 0 : 1
  let scalar = resolveScalar(text)
  let scale = isFuture ? scalar * 1 : scalar * -1
  
  switch(entity){
    case 'millisecond':
      return addMs(date, scale)
    case 'second': 
      return addSecond(date, scale)
    case 'minute':
      return addMinute(date, scale)
    case 'hour':
      return addHour(date, scale)
    case 'day':
      return addDay(date, scale)
    case 'week':
      return addDay(date, scale * 7)
    case 'month': 
      return addMonth(date, scale)
    case 'year':
      return addYear(date, scale)
    case 'century':
      return addYear(date, scale * 100)
    case 'millenium':
      return addYear(date, scale * 1000)
    case 'monday':
    case 'tuesday':
    case 'wednesday':
    case 'thursday':
    case 'friday':
    case 'saturday':
    case 'sunday':
      let day = resolveDay(entity)
      if(isFuture)
        return nextDayInstance(date, day)
      return prevDayInstance(date, day)
    case 'o\'clock':
      break
   }
}  
