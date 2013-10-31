(function(){
	// day, month, year resolution
	var resolveDay = function(day, dateObject)
	{
		day = typeof day === 'undefined' ? dateObject.getDay() : day;
		day = day > 7 ? 7 : day < 0 ? 0 : day;
		return day;
	}
	var resolveMonth = function(month, dateObject)
	{
		month = typeof month === 'undefined' ? dateObject.getMonth() : month;
		month = month > 12 ? 12 : month < 0 ? 0 : month;
		return month;
	}
	var resolveYear = function(year, dateObject)
	{
		year = typeof year === 'undefined' ? dateObject.getFullYear() : year;
		return year;
	}
	var resolveN = function(n, defaultValue)
	{
		n = typeof n === 'undefined' ? defaultValue : n;
		return n;
	}
	var days = 
	{
	    0: "Sunday",
	    1: "Monday",
	    2: "Tuesday",
	    3: "Wednesday",
	    4: "Thursday",
	    5: "Friday",
	    6: "Saturday"
	};
	var months =
	{
	    0: "January",
	    1: "February",
	    2: "March",
	    3: "April",
	    4: "May",
	    5: "June",
	    6: "July",
	    7: "August",
	    8: "September",
	    9: "October",
	    10: "November",
	    11: "December"
	};

/*--------------------
  ----- Computation --
--------------------*/

	Date.prototype.dayOfWeek = function(day)
	{
		day = resolveDay(day,this);
		return days[day];
	}

	Date.prototype.month = function(month)
	{
		month = resolveMonth(month,this);
		return months[month];
	}

	Date.prototype.addDay = function(n)
	{
		n = resolveN(n,1);
		this.setDate(this.getDate() + n);
	}

	Date.prototype.addMonth = function(n)
	{
		n = n ? n : 1;
		this.setMonth(this.getMonth() + n);
	}

	Date.prototype.addYear = function(n)
	{
		n = n ? n : 1;
		this.setFullYear(this.getFullYear() + n);
	}

	Date.prototype.addHours = function(n)
	{
		n = n ? n*60 : 60;
		this.setMinutes(this.getMinutes() + n);
	}

	Date.prototype.addMinutes = function(n)
	{
		n = n ? n : 1;
		this.setMinutes(this.getMinutes() + n);
	}
	
	Date.prototype.addSeconds = function(n)
	{
		n = n ? n : 1;
		this.setSeconds(this.getSeconds() + n);
	}	

	Date.prototype.addMilliseconds = function(n)
	{
		n = n ? n : 1;
		this.setMilliseconds(this.getMilliseconds() + n);
	}

/*--------------------
  ----- Getters ------
--------------------*/

	Date.prototype.getFirstDayOfMonth = function(month,year)
	{
		var d;
		year = resolveYear(year, this);
		month = resolveMonth(month, this);

		d = new Date(year,month);	
		d.setDate(1);
		return d.getDay();
	}

	Date.prototype.getLastDateOfMonth = function(month,year)
	{
		var d;
		year = resolveYear(year, this);
		month = resolveMonth(month, this);

		d = new Date(year, month);
		d.addMonth();
		d.addDay(-1);

		return d.getDate();
	}

	Date.prototype.getLastDayOfMonth = function(month,year)
	{
		var d;
		year = resolveYear(year, this);
		month = resolveMonth(month, this);

		d = new Date(year, month);
		d.addMonth();
		d.addDay(-1);
		return d.getDay();
	}

	Date.prototype.getFirstDayInstance = function(day,month,year)
	{
		var d, _day;
		year = resolveYear(year, this);
		month = resolveMonth(month, this);
		day = resolveDay(day, this);
		
		d = new Date(year, month, 1);

		_day = d.getDay();

		if(day > _day)
		{
			d.addDay(day-_day);
		}
		else if(day < _day)
		{
			d.addDay(7-_day);
		}

		return d.getDate();
	}

	Date.prototype.getLastDayInstance = function(day,month,year)
	{
		var d, _day;
		year = resolveYear(year, this);
		month = resolveMonth(month, this);
		day = resolveDay(day, this);
		
		d = new Date(year,month+1,1);
		d.addDay(-1);
		_day = d.getDay();

		if(day > _day)
		{
			d.addDay((7+(_day-day))*-1);
		}
		else if(day < _day)
		{
			d.addDay((day-_day))
		}

		return d.getDate();
	}

	Date.prototype.getNthDayInstance = function(n,day,month,year)
	{
		var d
			, n = typeof n === 'undefined' ? 0 : n;
		year = resolveYear(year, this);
		month = resolveMonth(month, this);
		day = resolveDay(day, this);

		d = new Date(year,month,this.getFirstDayInstance(day,month,year));
		d.addDay(7*n);

		if(d.getMonth() > month)
			d.addDay(-7);

		return d.getDate();
	}

	Date.prototype.getNextDayInstance = function(day,n)
	{
		day = resolveDay(day,this);
		n = resolveN(n,1);
		n--;

		var d = new Date(this.getFullYear(),this.getMonth(),this.getDate())
			, currentDay = d.getDay()
			, dayDiff = Math.abs(currentDay - day);

		if(currentDay > day)
			dayDiff = 7-dayDiff;

		dayDiff += (7*n);
		
		d.addDay(dayDiff);
		return d.getDate();
	}

	Date.prototype.getPriorDayInstance = function(day,n)
	{
		day = resolveDay(day,this);
		n = resolveN(n,1);
		n--;

		var d = new Date(this.getFullYear(),this.getMonth(),this.getDate())
			, currentDay = d.getDay()
			, dayDiff = Math.abs(currentDay - day);

		if(currentDay < day)
			dayDiff = Math.abs(dayDiff-7);

		dayDiff += (7*n);

		d.addDay(dayDiff*-1);
		return d.getDate();
	}

	Date.prototype.getRemainingDaysInYear = function(weekdays)
	{
		var d = new Date(this.getFullYear()+1,0,0)
			, totalDaysRemaining = Math.floor((d-this)/86400000)
			, weekdaysRemaining;

		if(weekdays)
		{
			d = new Date(this.getFullYear(),this.getMonth(),this.getDate());
			weekdaysRemaining = 0;
			for (var i=0;i<=totalDaysRemaining;i++)
			{
				if(d.getDay() > 0 && d.getDay() < 6)
					weekdaysRemaining ++;
				d.addDay();
			}
			return weekdaysRemaining;
		}

		return totalDaysRemaining;
	}

/*--------------------
  ----- Setters ------
--------------------*/
	Date.prototype.correctTimezoneOffset = function(){
		this.setHours(this.getHours() + (this.getTimezoneOffset()/60));
	}
	
	Date.prototype.setLastDayOfMonth = function(month,year)
	{
		var d;

		month = resolveMonth(month,this);
		year = resolveYear(year,this);

		d = new Date(year,month);
		d.addDay(-1);

		this.setFullYear(year);
		this.setMonth(month);
		this.setDate(d.getDate());
	}

	Date.prototype.setFirstDayOfMonth = function(month,year)
	{
		var d;

		month = resolveMonth(month,this);
		year = resolveYear(year,this);

		d = new Date(year,month);

		this.setFullYear(year);
		this.setMonth(month);
		this.setDate(1);
	}

	Date.prototype.setToFutureDayInstance = function(day,n)
	{
		/*
			sets date to nth future instance of day
			if n is omitted, next instance of day is set
		*/ 
		var date
			, daysToAdd;
		n = resolveN(n,0);
		day = resolveDay(day,this);
		date = this.getNextDayInstance(day);
        
        // forward date to next instance of day
        daysToAdd = date - this.getDate();
        // if number of instances is passed, add those days in (default value for n is 0)
        daysToAdd += (7*n);
        this.addDay(daysToAdd);
	}

	Date.prototype.setToRecentDayInstance = function(day,n)
	{
		var date
			, daysToSubtract;

		n = resolveN(n,1);
		n--;
		day = resolveDay(day,this);
		date = this.getPriorDayInstance(day);

		daysToSubtract = date - this.getDate();
		daysToSubtract -= (7*n);

		this.addDay(daysToSubtract);
	}
})()