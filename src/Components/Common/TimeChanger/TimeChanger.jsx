import moment from "moment-jalaali";

// تابعی برای محاسبه اختلاف روزها به شمسی
const calculateDateDifference = (givenDate) => {
  // تنظیم کردن تاریخ به شمسی

  const dateOnly = givenDate.substring(0, 10);
  moment.loadPersian({ dialect: "persian-modern" });

  // تاریخ امروز به شمسی
  const today = moment().format("jYYYY/jMM/jDD");

  // محاسبه تفاوت روزها به صورت شمسی
  const diffInDays = moment(today, "jYYYY/jMM/jDD").diff(
    moment(dateOnly, "jYYYY/jMM/jDD"),
    "days"
  );

  return diffInDays;
};

export default calculateDateDifference;
