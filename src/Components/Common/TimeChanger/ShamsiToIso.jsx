import React from "react";
import DateObject from "react-date-object";
//   import jalaali from "jalaali-js";
//   import persianjs from "persianjs";

const ShamsiToISO = (shamsiDate) => {

//   const englishNumbers = persianjs(shamsiDate).toEnglishNumber();

//   // تبدیل تاریخ شمسی به میلادی
//   const [year, month, day] = englishNumbers.split("/");
//   const gregorianDate = jalaali.toGregorian(
//     parseInt(year),
//     parseInt(month),
//     parseInt(day)
//   );

//   console.log(gregorianDate); // { gy: 2023, gm: 10, gd: 22 }

  const isoDate = shamsiDate.toISOString();


  return isoDate;
};

export default ShamsiToISO;
