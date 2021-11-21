import { TIME_OF_DAY_GREETING } from "../constants/constants";

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
  let local_date = new Date(data).toString();
  local_date = local_date.substring(0, local_date.lastIndexOf(":"));
  return local_date;
};

export const formattedName = (firstName, lastName) => {
  if (firstName && lastName) {
    return firstName + " " + lastName;
  }
  return '';
};
export const formattedProfileSubtitle=(str1, str2)=>{
  if (str1 && str2) {
    return str1 + ", " + str2;
  }
  return '';

}
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
