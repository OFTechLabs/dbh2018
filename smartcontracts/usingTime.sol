pragma solidity ^0.4.20;

contract usingTime {

  uint constant ORIGIN_YEAR = 1970;

  uint constant DAY_IN_SECONDS = 86400;
  uint constant YEAR_IN_SECONDS = 31536000;
  uint constant LEAP_YEAR_IN_SECONDS = 31622400;

  function isLeapYear(uint year) public constant returns (bool) {
    if (year % 4 != 0) {
            return false;
    }
    if (year % 100 != 0) {
            return true;
    }
    if (year % 400 != 0) {
            return false;
    }
    return true;
  }

  function leapYearsBefore(uint year) public constant returns (uint) {
    year -= 1;
    return year / 4 - year / 100 + year / 400;
  }

  function getDaysInMonth(uint month, uint year) public constant returns (uint) {
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
      return 31;
    }
    else if (month == 4 || month == 6 || month == 9 || month == 11) {
      return 30;
    }
    else if (isLeapYear(year)) {
      return 29;
    }
    else {
      return 28;
    }
  }

  // get year YYYY
  function getYear(uint timestamp) public constant returns (uint) {
    uint secondsAccountedFor = 0;
    uint year;
    uint numLeapYears;

    // Year
    year = ORIGIN_YEAR + (timestamp / YEAR_IN_SECONDS);
    numLeapYears = leapYearsBefore(year) - leapYearsBefore(ORIGIN_YEAR);

    secondsAccountedFor += LEAP_YEAR_IN_SECONDS * numLeapYears;
    secondsAccountedFor += YEAR_IN_SECONDS * (year - ORIGIN_YEAR - numLeapYears);

    while (secondsAccountedFor > timestamp) {
      if (isLeapYear(year - 1)) {
        secondsAccountedFor -= LEAP_YEAR_IN_SECONDS;
      }
      else {
        secondsAccountedFor -= YEAR_IN_SECONDS;
      }
      year -= 1;
    }
    return year;
  }

  // get yearmonth YYYYmm
  function getYearMonth(uint timestamp) public constant returns (uint) {
    uint year = getYear(timestamp);
    uint month;

    uint secondsAccountedFor = 0;
    uint buf;

    buf = leapYearsBefore(year) - leapYearsBefore(ORIGIN_YEAR);

    secondsAccountedFor += LEAP_YEAR_IN_SECONDS * buf;
    secondsAccountedFor += YEAR_IN_SECONDS * (year - ORIGIN_YEAR - buf);

    // Month
    uint secondsInMonth;
    for (uint i = 1; i <= 12; i++) {
      secondsInMonth = DAY_IN_SECONDS * getDaysInMonth(i, year);
      if (secondsInMonth + secondsAccountedFor > timestamp) {
        month = i;
        break;
      }
      secondsAccountedFor += secondsInMonth;
    }

    return year * 100 + month;
  }

}

