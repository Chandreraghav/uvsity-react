export const truncate = (str, n) => {
    try {
        return str.length > n ? str.substr(0, n - 1) + "..." : str;
    } catch (error) {
        return str;
    }
};

export const randomKeyWord = (keyword) => {
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

 
 