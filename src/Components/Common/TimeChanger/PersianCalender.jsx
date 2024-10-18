import React, { useState } from "react";
import { Calendar } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

const PersianCalender = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gray-50 ">
      <div className="w-full h-full">
        <Calendar
          value={selectedDay}
          onChange={setSelectedDay}
          shouldHighlightWeekends
          locale="fa" // برای تنظیم تقویم شمسی و زبان فارسی
          calendarClassName="persian-calendar"
          colorPrimary="#f9a825" // رنگ‌های مشابه به تصویر
        />
      </div>
    </div>
  );
};

export default PersianCalender;
