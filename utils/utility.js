import moment from "moment";
import { TIME_OF_DAY_GREETING } from "../constants/constants";
import { getLocalStorageObject, setLocalStorageObject } from "../localStorage/local-storage";
import parse from "html-react-parser";
import convertToHTML from "markdown-to-html-converter";
import { SESSION_DOCUMENT } from "../constants/userdata";
import { LOCALE } from "../constants/timezones";

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
  try {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  } catch (error) { }
  return null;
};
export const localTZDate = (date, timeZone=getTimezone(),requiresTimeOnly=false) => {
  if(requiresTimeOnly) {
   return new Date(date).toLocaleTimeString(LOCALE,{timeZone:timeZone?timeZone:getTimezone(),hour: '2-digit', minute: '2-digit'})
  }
return new Date(date).toLocaleString(LOCALE, {
    timeZone:timeZone?timeZone:getTimezone(),
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getTimezone = () => {
  try {
    const globalTimezone = JSON.parse(getLocalStorageObject("uvsity-timezone"))
    if (globalTimezone && globalTimezone.timezone) {
      return globalTimezone.timezone
    }
    return JSON.parse(getLocalStorageObject("uvsity-ipData")).time_zone.name;
  } catch (error) {
    return "America/New_York";
  }
};
export const setGlobalTimezone = (tz, force = false) => {
  try {
    if (force) {
      setLocalStorageObject("uvsity-timezone", { timezone: tz });
      return;
    }
    const ipdata = JSON.parse(getLocalStorageObject("uvsity-ipData"))
    if (tz == ipdata.time_zone.name) {
      return;
    }
    setLocalStorageObject("uvsity-timezone", { timezone: tz });
  } catch (error) {
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
  let hours = time?.hour;
  var AmOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  var minutes = time?.minute;
  return hours + ":" + minutes + " " + AmOrPm;
};

export const HTMLUnderlineByCharacterIndex = (str, pos) => {
  if (!str) return null;
  if (!pos) pos = 0;
  let _str = "<u>" + str.charAt(pos) + "</u>" + str.slice(1);
  return `${_str}`;
};

export const getDateAfter = (days, date) => {
  if (!days) {
    return new Date();
  }
  var result = !date ? new Date() : new Date(date);
  result.setDate(result.getDate() + parseInt(days));
  return result;
};

export const getTimeAfter = (time, hourUnits, objectReturnInd) => {
  var dt = new Date();
  dt.setHours(dt.getHours() + hourUnits);

  const s = roundTimeBy(dt, 30);
  const _time = time?.filter(
    (t) =>
      parseInt(t.hour) === s.getHours() && parseInt(t.minute) === s.getMinutes()
  );
  const differenceOfRoundedTimeWithCurrentTimeInMins =
    getDifferenceOfTimeWithCurrentTimeInMinutes(s);
  if (differenceOfRoundedTimeWithCurrentTimeInMins < 60) {
    return getTimeAfter(time, 2, objectReturnInd);
  }
  if (objectReturnInd) return _time[0];
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
  try {
    return Math.ceil((time.getTime() - new Date().getTime()) / 1000 / 60);
  } catch (error) {
    return 0;
  }
};
export const isToday = (someDate) => {
  const today = new Date();
  try {
    return (
      someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    );
  } catch (error) {
    return (
      someDate.$d.getDate() == today.getDate() &&
      someDate.$d.getMonth() == today.getMonth() &&
      someDate.$d.getFullYear() == today.getFullYear()
    );
  }

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
    if (!obj || obj === undefined) {
      return true;
    }
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  } catch (error) {

  }
  return true;
};
export const padTo2Digits = (num) => {
  return num?.toString().padStart(2, "0");
};
export const formatDate = (date) => {
  return (
    [
      padTo2Digits(date?.getMonth() + 1),
      padTo2Digits(date?.getDate()),
      date?.getFullYear(),
    ].join("/") +
    " " +
    [
      padTo2Digits(date?.getHours()),
      padTo2Digits(date?.getMinutes()),
      padTo2Digits(date?.getSeconds()),
    ].join(":")
  );
};
export const getReadableFormattedDate = (date) => {
  let year = date?.getFullYear();
  let month = (1 + date?.getMonth()).toString().padStart(2, "0");
  let day = date?.getDate().toString().padStart(2, "0");

  return month + "/" + day + "/" + year;
};
export const _delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export const download = (src, name) => {
  const a = document.createElement("a");
  a.href = src;
  a.download = name || src.split("/").pop();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const timestamp = () => {
  try {
    return (
      moment(new Date()).format("DDMMYYYYhhmmss").toString() +
      moment.tz
        .zone(Intl.DateTimeFormat().resolvedOptions().timeZone.toString())
        .abbr(360)
    );
  } catch (error) {
    return null
  }


};

export const shouldDialogAppearInFullScreen = () => {
  return isSmallScreen(); // if small screen then only dialog should appear in full screen, otherwise the dialog appears in normal screen.
};

export const isSmallScreen = () => {
  const mediaQuery = JSON.parse(getLocalStorageObject("media-query"));
  if (mediaQuery.tabletOrMobile) return true;
  return false;
};

export const parseMarkdownToHTML = (data) => {
  try {
    return parse(convertToHTML(data));
  } catch (error) {
    return data;
  }
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};
export const isUvsityLogicalError = (internalError) => {
  return (
    internalError?.data?.Uvsity_Errors &&
    internalError?.data?.Uvsity_Errors.length > 0
  );
};

export const isValidDate = (value, format) => {
  if (!value) return false;
  if (!format) format = "mm-dd-yyyy";
  const periodPart = moment(value).format(format);
  if (periodPart === "Invalid date") {
    return false;
  }
  return true;
};

export const isValidDatePeriod = (start, end) => {
  if (start instanceof Date && end instanceof Date) {
    if (start && end) {
      if (start > end) return false;
      return true;
    }
  }
  if (start instanceof Date || end instanceof Date) {
    return true;
  }
  return false;
};
export const getIconPerFileExtension = (ext) => {
  const icons = SESSION_DOCUMENT.icons;
  switch (ext) {
    case "docx":
    case "doc":
      return icons.DOCX;
    case "txt":
      return icons.TXT;
    case "pdf":
      return icons.PDF;
    case "zip":
      return icons.ZIP;
    case "jpg":
    case "png":
    case "webp":
    case "gif":
      return icons.IMG;
    default:
      return icons.TXT;
  }
};

export const isValidYear = (year, stringify = true) => {
  var text = /^[0-9]+$/;
  if (stringify) year = year.toString();
  if (year.length == 4) {
    if (year != 0) {
      if ((year != "") && (!text.test(year))) {
        return false;
      }

      if (year.length != 4) {
        return false;
      }
      if ((year < 1920)) {
        return false;
      }
      return true;
    }
  }
}

export const getLocalTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone.toString();
}

export const setLocalTimezone = () => {
  setGlobalTimezone(getLocalTimezone(), true)
}

export const getFormattedHoursFromDate = (date) => {
  return date.getHours() < 10
    ? "0" + date.getHours().toString()
    : date.getHours().toString()
}
export const getFormattedMinutesFromDate = (date) => {
  return date.getMinutes() < 10
    ? "0" + date.getMinutes().toString()
    : date.getMinutes().toString()
}

export const datesAreOnSameDay = (first, second) =>
  first.getFullYear() === second?.getFullYear() &&
  first.getMonth() === second?.getMonth() &&
  first.getDate() === second?.getDate();