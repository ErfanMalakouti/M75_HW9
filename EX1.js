class Dates {
  constructor(year, month, day) {
    this.year = year;
    this.month = month;
    this.day = day;
  }
  set year(value) {
    if (value >= 1922 && value < 2022) {
      this._year = value;
    } else {
      console.log("input is out of range");
      return;
    }
  }
  get year() {
    return this._year;
  }
  set month(value) {
    if (value >= 1 && value <= 12) {
      this._month = value;
    } else {
      console.log("input is out of range");
      return;
    }
  }
  get month() {
    return this._month;
  }
  set day(value) {
    if (this._month >= 1 && this._month <= 6) {
      if (value >= 1 && value <= 30) {
        this._day = value;
      } else {
        console.log("input is out of range");
        return;
      }
    } else if (this._month > 6 && this._month <= 12) {
      if (value >= 1 && value <= 31) {
        this._day = value;
      } else {
        console.log("input is out of range");
        return;
      }
    }
  }
  get day() {
    return this._day;
  }
  toString(format) {
    let temp = format.split("/");
    let result = [];
    for (let i = 0; i < temp.length; i++) {
      switch (temp[i]) {
        case "d":
          result.push(this._day);
          break;
        case "m":
          result.push(this._month);
          break;
        case "y":
          result.push(this._year % 100);
          break;
        case "Y":
          result.push(this._year);
          break;
      }
    }
    return result.join("/");
  }
  compareDate(date1, date2) {
    let dateOne = new Date(date1).getTime();
    let dateTwo = new Date(date2).getTime();
    if (dateOne > dateTwo) {
      return 1;
    } else if (dateOne < dateTwo) {
      return -1;
    } else {
      return 0;
    }
  }
}
let date11 = new Dates(2000, 5, 31);
date11.year = 2010;
date11.month = 7;
date11.day = 31;
console.log(date11);
console.log(date11.toString("Y/m/d"));
console.log(date11.compareDate("2000/4/11", "2000/4/11"));
////////////////////////////////////////////////
class Times {
  constructor(hour, minute, second) {
    this.hour = hour;
    this.minute = minute;
    this.second = second;
  }
  set hour(value) {
    if (value >= 0 && value <= 23) {
      this._hour = value;
    } else {
      console.log("input is out of range");
      return;
    }
  }
  get hour() {
    return this._hour;
  }
  set minute(value) {
    if (value >= 0 && value <= 59) {
      this._minute = value;
    } else {
      console.log("input is out of range");
      return;
    }
  }
  get minute() {
    return this._minute;
  }
  set second(value) {
    if (value >= 0 && value <= 59) {
      this._second = value;
    } else {
      console.log("input is out of range");
      return;
    }
  }
  get second() {
    return this._second;
  }
  toString(format) {
    let temp = format.split(" ");
    let temp1 = temp[0].split(":");
    let result = [];
    for (let i = 0; i < temp1.length; i++) {
      switch (temp1[i]) {
        case "h":
          this._hour > 12
            ? result.push(this._hour - 12 + ":")
            : result.push(this._hour + ":");
          break;
        case "H":
          result.push(this._hour + ":");
          break;
        case "i":
          result.push(this._minute + ":");
          break;
        case "s":
          result.push(this._second);
          break;
      }
    }
    if (temp[1] === "a") {
      this.hour > 12 ? result.push(" p.m") : result.push(" a.m");
    }
    return result.join("");
  }
  compareTime(time1, time2) {
    if (time1 > time2) {
      return 1;
    } else if (time1 < time2) {
      return -1;
    } else {
      return 0;
    }
  }
}
let time12 = new Times(22, 4, 59);
console.log(time12);
console.log(time12.toString("h:i:s a"));
console.log(time12.compareTime("12:11:11", "12:12:11"));
/////////////////////////////////////////////////////////////////////////
class TimeStamp {
  constructor(year, month, day, hour, minute, second) {
    this.dates = new Dates(year, month, day);
    this.times = new Times(hour, minute, second);
  }
  toStrings(format) {
    let temp = format.split(" ");
    let temp1 = this.dates.toString(temp[0]);
    let temp2 = this.times.toString(temp[1]);
    return `${temp1} ${temp2}`;
  }
  compares(timeStamp1, timeStamp2) {
    let temp = timeStamp1.split(" ");
    let temp2 = timeStamp2.split(" ");
    let compareTime = this.times.compareTime(temp[1], temp2[1]);
    let compareDate = this.dates.compareDate(temp[0], temp2[0]);
    if (compareDate === 0) {
      return compareTime;
    } else {
      return compareDate;
    }
  }
}
let timeStamp1 = new TimeStamp(2020, 10, 2, 22, 54, 20);
let timeStamp2 = new TimeStamp(2020, 11, 23, 22, 25, 10);
console.log(timeStamp1);
console.log(timeStamp1.compares("2000/4/11 11:20:13", "2000/5/11 11:20:13"));

///////////////////////////////////////////////////////////////////////////////////////
class Event {
  constructor(subject, description, timestamp) {
    this.subject = subject;
    this.description = description;
    this.timestamp = timestamp;
  }
}
let eventLists = [
  (event1 = new Event("a", "b", "2000/4/11 11:20:13")),
  (event2 = new Event("csada", "sadas", "2000/5/11 11:20:13")),
];
console.log(eventLists);
for (let i = 1; i < eventLists.length; i++) {
  if (
    timeStamp1.compares(
      eventLists[i - 1]["timestamp"],
      eventLists[i]["timestamp"]
    ) === -1
  ) {
    [eventLists[i - 1], eventLists[i]] = [eventLists[i], eventLists[i - 1]];
  }
}
console.log(eventLists);

///////////////////
