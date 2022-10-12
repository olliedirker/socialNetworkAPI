const addDateSuffix = (date) => {
    let stringOfDates = date.toString();
  
    //got this from stack overflow
    const lastChar = stringOfDates.charAt(stringOfDates.length - 1);
  
    if (lastChar === "1" && stringOfDates !== "11") {
      stringOfDates = `${stringOfDates}st`;
    } else if (lastChar === "2" && stringOfDates !== "12") {
      stringOfDates = `${stringOfDates}nd`;
    } else if (lastChar === "3" && stringOfDates !== "13") {
      stringOfDates = `${stringOfDates}rd`;
    } else {
      stringOfDates = `${stringOfDates}th`;
    }
  
    return stringOfDates;
  };
  
  // format timestamp
  module.exports = (
    timestamp,
    { monthLength = "short", dateSuffix = true } = {}) => {
    let months;
  if (monthLength === "short") {
      months = {
        0: "Jan",
        1: "Feb",
        2: "Mar",
        3: "Apr",
        4: "May",
        5: "Jun",
        6: "Jul",
        7: "Aug",
        8: "Sep",
        9: "Oct",
        10: "Nov",
        11: "Dec",
      };
    } else {
      months = {
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
        11: "December",
      };
    }
  //sets to new date
    const date = new Date(timestamp);
    const whichMonth = months[date.getMonth()];
  
    let dayOfMonth;
  
    if (dateSuffix) {
      dayOfMonth = addDateSuffix(date.getDate());
    } else {
      dayOfMonth = date.getDate();
    }
  
    const year = date.getFullYear();
  
    let hour;
    // checks the 24hr time
    if (date.getHours > 12) {
      hour = Math.floor(date.getHours() / 2);
    } else {
      hour = date.getHours();
    }
    // for midday change out of military time this was super simple but also took me forever
    if (hour === 0) {
      hour = 12;
    }
    const minutes = date.getMinutes();
    //is it am or pm
    let amOrPm;
  
    if (date.getHours() >= 12) {
      amOrPm = "pm";
    } else {
      amOrPm = "am";
    }
  
    const finishedTimestamp = `${whichMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${amOrPm}`;
  
    return finishedTimestamp;
  };
  