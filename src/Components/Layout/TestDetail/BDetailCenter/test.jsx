import React, { useState } from "react";
import Joyride from "react-joyride";

const Test = () => {
  const [run, setRun] = useState(true);

  // تعریف مراحل معرفی
  const steps = [
    {
      target: "body", // می‌توانیم برای نمایان شدن در هر جای صفحه از body استفاده کنیم
      content: (
        <div className="text-center">
          <h2 className="text-lg font-bold">خوش آمدید!</h2>
          <p>این یک معرفی سریع از برنامه ماست.</p>
        </div>
      ),
      placement: "bottom-end", // تعیین مکان نمایشی در پایین و راست صفحه
      styles: {
        options: {
          arrowColor: "#4ade80", // رنگ فلش
          backgroundColor: "#34d399", // رنگ پس‌زمینه
          textColor: "#fff", // رنگ متن
        },
      },
      disableBeacon: true,
    },
  ];

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <Joyride
        steps={steps}
        run={run}
        continuous={true}
        showSkipButton={true}
        showProgress={true}
        locale={{ back: "قبلی", next: "بعدی", skip: "رد کردن", last: "پایان" }}
        styles={{
          options: {
            zIndex: 1000, // اطمینان از اینکه در بالای همه عناصر دیگر نمایش داده می‌شود
          },
        }}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setRun(true)}
      >
        شروع معرفی
      </button>
    </div>
  );
};

export default Test;
