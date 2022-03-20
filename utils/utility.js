import { TIME_OF_DAY_GREETING } from "../constants/constants";
import { getLocalStorageObject } from "../localStorage/local-storage";

export const truncate = (str, n) => {
  try {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  } catch (error) {
    return str;
  }
};
export const isValidPassword = (pwd) => {
  if (!pwd) return false;
  var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(pwd);
};
export const isStringEmpty = (str) => {
  if (!str) return true;
  if (str && str.trim() === "") return true;
  return false;
};

export const areStringsEqual = (str1, str2) => {
  if (str1 && str2) {
    if (str1.trim() === str2.trim()) return true;
  }
  return false;
};
export const isValidEmail = (email) => {
  if (!email) return false;
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
};

export const getRandomArrayElement = (keyword) => {
  if (keyword[Math.floor(Math.random() * keyword.length)] === undefined) {
    return keyword[0];
  }
  return keyword[Math.floor(Math.random() * keyword.length)];
};
export const capitalizeFirstLetter = (string) => {
  try {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } catch (error) {
    return string;
  }
};

export const duration = (value) => {
  const sec = parseInt(value, 10); // convert value to number if it's string
  let hours = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
  let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) {
    hours = "0" + hours;
  }
  // if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds; // Return is  MM : SS
};

export const formatted_duration = (value) => {
  const sec = parseInt(value, 10); // convert value to number if it's string
  let hours = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
  let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
  // add 0 if value < 10; Example: 2 => 02

  // if (minutes < 10) { minutes = "0" + minutes; }

  if (hours === 0) return minutes + " minutes " + seconds + " secs";
  // Return is  MM : SS
  else return hours + " hrs " + minutes + " minutes";
};

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export const avatarToString = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};
export const localTZDate = (data) => {
  let local_date = new Date(data).toLocaleString("en-US", {
    timeZone: getTimezone(),
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return local_date;
};

export const getTimezone = () => {
  try {
    return JSON.parse(getLocalStorageObject("uvsity-ipData")).time_zone.name;
  } catch (error) {
    return "America/New_York";
  }
};

export const formattedName = (firstName, lastName) => {
  if (firstName && lastName) {
    return firstName + " " + lastName;
  }
  return "";
};
export const formattedProfileSubtitle = (str1, str2) => {
  if (str1 && str2) {
    return str1 + ", " + str2;
  }
  return "";
};
export const timeOfDay = () => {
  var today = new Date();
  var curHr = today.getHours();
  if (curHr < 12) {
    return TIME_OF_DAY_GREETING.MORNING;
  } else if (curHr < 18) {
    return TIME_OF_DAY_GREETING.AFTERNOON;
  } else {
    return TIME_OF_DAY_GREETING.EVENING;
  }
};
export const isValidURL = (URL) => {
  const regex = new RegExp(
    "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
  );
  return regex.test(URL);
};
export const formatTime = (time) => {
  let hours = time.hour;
  var AmOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  var minutes = time.minute;
  return hours + ":" + minutes + " " + AmOrPm;
};

export const HTMLUnderlineByCharacterIndex = (str, pos) => {
  if (!str) return null;
  if (!pos) pos = 0;
  let _str = "<u>" + str.charAt(pos) + "</u>" + str.slice(1);
  return `${_str}`;
};

export const getDateAfter = (days, date) => {
  if (!days) return new Date();
  var result = !date ? new Date() : new Date(date);
  result.setDate(result.getDate() + parseInt(days));
  return result;
};

export const getTimeAfter = (time, hourUnits) => {
  var dt = new Date();
  dt.setHours(dt.getHours() + hourUnits);

  const s = roundTimeBy(dt, 30);
  const _time = time.filter(
    (t) =>
      parseInt(t.hour) === s.getHours() && parseInt(t.minute) === s.getMinutes()
  );
  const differenceOfRoundedTimeWithCurrentTimeInMins =
    getDifferenceOfTimeWithCurrentTimeInMinutes(s);
  if (differenceOfRoundedTimeWithCurrentTimeInMins < 60) {
    return getTimeAfter(time, 2);
  }
  return _time[0].timeId;
};
export const getNearEndTime = (time) => {
  let hours = time.hour;
  hours = hours % 12 || 12;
  var minutes = time.minute;
  minutes = minutes % 30 || 30;
  return hours + "#" + minutes;
};

const roundTimeBy = (time, roundByMins) => {
  var timeToReturn = new Date(time);
  timeToReturn.setMilliseconds(
    Math.round(timeToReturn.getMilliseconds() / 1000) * 1000
  );
  timeToReturn.setSeconds(Math.round(timeToReturn.getSeconds() / 60) * 60);
  timeToReturn.setMinutes(
    Math.round(timeToReturn.getMinutes() / roundByMins) * roundByMins
  );
  return timeToReturn;
};
export const getDifferenceOfTimeWithCurrentTimeInMinutes = (time) => {
  if (!time) return 0;
  return Math.ceil((time.getTime() - new Date().getTime()) / 1000 / 60);
};
export const isToday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

export const getFileExtension = (fileName, separator, limit) => {
  if (!separator) separator = ".";
  return fileName.split(separator).pop();
};

export const parseBoolean = (string) => {
  switch (string.toLowerCase().trim()) {
    case "true":
    case "yes":
    case "1":
      return true;
    case "false":
    case "no":
    case "0":
    case null:
      return false;
    default:
      return Boolean(string);
  }
};

export const isEmptyObject = (obj) => {
  try {
    if(!obj || obj===undefined){
      return true;
    }
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  } catch (error) {
    console.log(error)
  }
  return true;
};
export const  padTo2Digits=(num)=> {
  return num.toString().padStart(2, '0');
}
export const formatDate=(date) =>{
  return (
    [
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
      date.getFullYear(),
    ].join('/') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}
export const getReadableFormattedDate=(date)=>{
  let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return month + '/' + day + '/' + year;
}
