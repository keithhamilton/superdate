// date, day, month, year resolution
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
    return DAYS[d]
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
    return MONTHS[d]
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
export function dayOfWeek(date) {
  let d = date || new Date()
  if (d.constructor.name === "Date")
    return DAYS[resolveDay(d)]
}

export function month(date) {
  let d = date || new Date()
  if (d.constructor.name === 'Date')
    return MONTHS[resolveMonth(d)]
}

export function year(date){
  let d = date || new Date()
  if (d.constructor.name === "Date")
    return d.getFullYear()
}

export function addDay(date=new Date(), n=1) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + n,
                 date.getHours(), date.getMinutes(), date.getSeconds(),
                 date.getMilliseconds())
}

export function subDay(date, n=1){
  return addDay(date, (n * -1))
}

export function addMonth(date=new Date(), n=1) {
  return new Date(date.getFullYear(), date.getMonth() + n, date.getDate(),
                 date.getHours(), date.getMinutes(), date.getSeconds(),
                 date.getMilliseconds())
}

export function subMonth(date, n=1) {
  return addMonth(date, (n * -1))
}

export function addYear(date=new Date(), n=1) {
  return new Date(date.getFullYear() + n, date.getMonth(), date.getDate(),
                 date.getHours(), date.getMinutes(), date.getSeconds(),
                 date.getMilliseconds())                  
}

export function subYear(date, n=1) { 
  return addYear(date, (n * -1))
}

export function addHour(date=new Date(), n=1) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                 date.getHours() + n, date.getMinutes(), date.getSeconds(),
                 date.getMilliseconds())
}

export function subHour(date, n=1) {
  return addHour(date, (n * -1))
}
 
export function addMinute(date=new Date(), n=1) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                 date.getHours(), date.getMinutes() + n, date.getSeconds(),
                 date.getMilliseconds())
}

export function subMinute(date, n=1) { 
  return addMinute(date, (n * -1))
}

export function addSecond(date=new Date(), n=1){
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                  date.getHours(), date.getMinutes(), date.getSeconds() + n,
                  date.getMilliseconds())
}

export function subSecond(date, n=1) { 
  return addSecond(date, (n * -1))
}

export function addMs(date=new Date(), n=1){
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                  date.getHours(), date.getMinutes(), date.getSeconds(),
                  date.getMilliseconds() + n)
}

export function subMs(date, n=1) { 
  return addMs(date, (n * -1))
}

export function parts(date=null) {
  let d = date || new Date()
  return [d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(),
          d.getSeconds(), d.getMilliseconds()]
}

/*--------------------
  ----- Getters ------
--------------------*/
export function firstDayInstance(day=0, month=undefined, year=undefined) {
  let y = year === undefined ? new Date().getFullYear() : year
  let m = month === undefined ?  new Date().getMonth() : month
  let date = new Date(y, m, 1)
  let dayOfDate = date.getDay()

  if (day > dayOfDate) {
    return addDay(date, (day - dayOfDate))
  }
  else if (day < dayOfDate) {
    return addDay(date, (7 - dayOfDate))
  }

  return date
}

export function lastDayInstance(day=0, month=undefined, year=undefined) {
  let day = resolveDay(day)
  let date = subDay(new Date(resolveYear(year), (resolveMonth(month) + 1), 1))
  let dayOfDate = date.getDay()

  if(day > dayOfDate){
    return date.addDay((7 + (dayOfDate - day)) * -1)
  }
  else if(day < dayOfDate){
    return date.addDay(day - dayOfDate)
  }

  return date
 }

export function nthDayInstance(n=1, day=undefined, month=undefined, year=undefined) {
  let n = n - 1
  let day = day === undefined ? resolveDay() : day
  let month = month === undefined ? resolveMonth() : month
  let year = year === undefined ? resolveYear() : year
  let firstDay = firstDayInstance(day, month, year)
  let date = addDay(firstDay, (7 * n))

  if(date.getMonth() > month) {
    return subDay(date, 7)
  }
  return date
}

export function getNextDayInstance(date=new Date(), day) {
  let delta = ((d, cD) => {
    if(cD > d) {
      return (7 - Math.abs(cD - d))
    }
    return Math.abs(cD - d) + 7
  })(day, date.getDay())

  return addDay(date, delta)
}

export function getPrevDayInstance(date=new Date(), day) {
  let delta = ((d, cD) => {
    if(cD < d) {
      return 7 - Math.abs(cD - d)
    }
    return Math.abs(cD - d)
  })(day, date.getDay())

  return subDay(date, delta)
}

export function daysLeftInYear(date=new Date(), weekdays=false) {
  if(!weekdays)
    return Math.floor(new Date(((date.getFullYear() + 1), 0, 0) - date)/86400000)
  
  let remainingDays = function(d=date, weekdays=true, acc=0){
    if(d - new Date(d.getFullYear()+1, 0, 0) === 0){
      return acc
    }
    return remainingDays(addDay(d), weekdays, (acc + 1))
  }
  
  return remainingDays(date, weekdays, 0)
}


export function dateFromSpeech(text=undefined, date=new Date()){
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
        return getNextDayInstance(date, day)
      return getPrevDayInstance(date, day)
    case 'o\'clock':
      break
   }
}  


  /*
   * tomorrow, next (week|month|MTWThFSaSu|year|decade|century|millenium),
   * in (an|[0-9]+) (second|minute|hour|day|week|year)(s)?, 
   * ([\\d]+ o'clock)
  
}
//   Date.prototype.getRemainingDaysInYear = function(weekdays)
//   {
//     var d = new Date(this.getFullYear()+1,0,0)
//     , totalDaysRemaining = Math.floor((d-this)/86400000)
//     , weekdaysRemaining;

//     if(weekdays)
//     {
//       d = new Date(this.getFullYear(),this.getMonth(),this.getDate());
//       weekdaysRemaining = 0;
//       for (var i=0;i<=totalDaysRemaining;i++)
//       {
// 	if(d.getDay() > 0 && d.getDay() < 6)
// 	  weekdaysRemaining ++;
// 	d.addDay();
//       }
//       return weekdaysRemaining;
//     }

//     return totalDaysRemaining;
//   }

// /*--------------------
//   ----- Setters ------
// --------------------*/
//   Date.prototype.correctTimezoneOffset = function () {
//     this.setHours(this.getHours() + (this.getTimezoneOffset()/60));
//   }

//   Date.prototype.setLastDayOfMonth = function (month,year) {
//     var d

//     month = resolveMonth(month,this);
//     year = resolveYear(year,this);

//     d = new Date(year,month);
//     d.addDay(-1);

//     this.setFullYear(year);
//     this.setMonth(month);
//     this.setDate(d.getDate());
//   }

//   Date.prototype.setFirstDayOfMonth = function(month,year)
//   {
//     var d;

//     month = resolveMonth(month,this);
//     year = resolveYear(year,this);

//     d = new Date(year,month);

//     this.setFullYear(year);
//     this.setMonth(month);
//     this.setDate(1);
//   }

//   Date.prototype.setToFutureDayInstance = function(day,n)
//   {
//     /*
//       sets date to nth future instance of day
//       if n is omitted, next instance of day is set
//     */ 
//     var date
//     , daysToAdd;
//     n = resolveN(n,0);
//     day = resolveDay(day,this);
//     date = this.getNextDayInstance(day);

//     // forward date to next instance of day
//     daysToAdd = date - this.getDate();
//     // if number of instances is passed, add those days in (default value for n is 0)
//     daysToAdd += (7*n);
//     this.addDay(daysToAdd);
//   }

//   Date.prototype.setToRecentDayInstance = function(day,n)
//   {
//     var date
//     , daysToSubtract;

//     n = resolveN(n,1);
//     n--;
//     day = resolveDay(day,this);
//     date = this.getPriorDayInstance(day);

//     daysToSubtract = date - this.getDate();
//     daysToSubtract -= (7*n);

//     this.addDay(daysToSubtract);
//   }
