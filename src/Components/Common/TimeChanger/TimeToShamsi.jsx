import moment from "moment-jalaali";
import React from "react";

const convertToJalali = (gregorianDateTime) => {
  // تنظیم moment به حالت شمسی
  moment.loadPersian({
    dialect: "persian-modern",
    useGregorianParser: true,
  });

  // تبدیل تاریخ میلادی به شمسی
  const jalaliDate = moment(gregorianDateTime, "YYYY-MM-DD").format(
    "jYYYY/jMM/jDD"
  );

  return jalaliDate;
};
export default convertToJalali;