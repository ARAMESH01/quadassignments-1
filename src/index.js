const isDateValid = () => {
  let inputDate = document.getElementById("date").value;
  let dateFormat = document.getElementById("date-format").value;

  let isValid = isInputDateValid(dateFormat, inputDate);
  document.getElementById("response").innerText = "Date is " + (isValid ? 'valid': 'invalid');
};

const isInputDateValid = (dateFormat, dateString) => {
  if(dateString == null || dateString == '') {
    return false;
  }
  if(isDateFormatValid(dateFormat)) {
    // console.log('Date Format is Valid');
    let dateStringArray = [];
    let dateFormatArray = [];

    if(dateFormat.indexOf('.') != -1 && dateString.indexOf('.') != -1) {
      dateStringArray = dateString.split('.');
      dateFormatArray = dateFormat.split('.');
    } else if(dateFormat.indexOf('-') != -1 && dateString.indexOf('-') != -1) {
      dateStringArray = dateString.split('-');
      dateFormatArray = dateFormat.split('-');
    } else if(dateFormat.indexOf('/') != -1 && dateString.indexOf('/') != -1) {
      dateStringArray = dateString.split('/');
      dateFormatArray = dateFormat.split('/');
    } else {
      return false;
    }

    dateObj = getDateObj(dateFormatArray, dateStringArray);
    return isValidDayMonthYear_New(dateObj);
  }
  return false;
}

const isDateFormatValid = (dateFormat) => {
  if(dateFormat == null ||
      dateFormat == '' ||
      dateFormat.length != 5 ||
      (dateFormat.indexOf('M') == -1 && dateFormat.indexOf('m') == -1) ||
      (dateFormat.indexOf('D') == -1 && dateFormat.indexOf('d') == -1) ||
      (dateFormat.indexOf('Y') == -1 && dateFormat.indexOf('y') == -1)) {
        return false;
  }
  if(countOccurances(dateFormat, '.') == 2 || countOccurances(dateFormat, '-') == 2 || countOccurances(dateFormat, '/') == 2){
    return true;
  }
  return false;
}

const countOccurances = (str, substr) => {
   return str.split(substr).length - 1;
}

const getDateObj = (dateFormatArray, dateStringArray) => {
  dateObj = {};
  dateObj[dateFormatArray[0]] = dateStringArray[0];
  dateObj[dateFormatArray[1]] = dateStringArray[1];
  dateObj[dateFormatArray[2]] = dateStringArray[2];
  return dateObj;
}

const isValidDayMonthYear_New = (dateObj) => {
  // let yearStr = dateObj['Y'] || dateObj['y'];

  let dayVal = parseInt(dateObj['D'] || dateObj['d']);
  let monthVal = parseInt(dateObj['M'] || dateObj['m']);
  let yearVal = parseInt(dateObj['Y'] || dateObj['y']);

  // if (yearStr.length == 2 && yearVal < 50) {
  //   yearStr = '20' + yearStr
  // } else {
  //   yearStr = '19' + yearStr
  // }
  // yearVal = parseInt(yearStr);
  //
  console.log('dayVal: ' + dayVal);
  console.log('monthVal: ' + monthVal);
  console.log('yearVal: ' + yearVal);

  if(yearVal < 50) {
    yearVal += 2000;
  } else if (yearVal < 100){
    yearVal += 1900;
  }

  setDateInputVal(yearVal);

  let isDayValid = (monthVal == 2) ?
                (isLeapYear(yearVal) ? (dayVal > 0 && dayVal <= 29) : (dayVal > 0 && dayVal <= 28)) :
                (dayVal > 0 && dayVal <= 31);

  let isMonthValid = (monthVal > 0 && monthVal <= 12);

  let isYearValid = (yearVal >= 0 && yearVal <= 99) ||
                    (yearVal > 1900 && yearVal <= 2999);

  return isDayValid && isMonthValid && isYearValid;
}

const isLeapYear = (year) => {
  return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
}

const setDateInputVal = (adjustedYearVal) => {
  let dateFormat = document.getElementById("date-format").value.toUpperCase();
  let originalDateVal = document.getElementById("date").value;
  let delimiter = '';

  if (dateFormat.indexOf('.') != -1) {
    delimiter = '.'
  } else if (dateFormat.indexOf('-') != -1) {
    delimiter = '-'
  } else if (dateFormat.indexOf('/') != -1) {
    delimiter = '/'
  }

  let dateArray = originalDateVal.split(delimiter);
  let dateFormatArray = dateFormat.split(delimiter);

  let yearIndex = (dateFormatArray[0] == 'Y') ? 0 :
                    (dateFormatArray[1] == 'Y') ? 1 : 2;
  dateArray[yearIndex] = adjustedYearVal;
  document.getElementById("date").value = dateArray[0] + delimiter + dateArray[1] + delimiter +  dateArray[2];
}
