import React from "react";

function CourseStatus() {
  return (
    <div className="h-[13vw] w-full flex flex-col justify-between mt-[21vw] p-4 ">
      <div className="w-full h-[5vw] flex justify-between">
        {/* Heading */}
        <div className="w-[25%] h-full flex justify-between flex-col items-start text-right">
          <p className="text-gray-500 text-[1.35vw]">خلاصه وضعیت دوره</p>
          <div className="flex items-center">
            <span className="text-gray-500 ml-2 text-[0.9vw]">
              درصد انجام تمرینات:
            </span>
            <span className="text-[1.35vw]">78%</span>
            <span className="border-pink-500  border-[2px] rounded-full px-4 py-1 mr-4">
              متوسط
            </span>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="flex justify-between flex-col items-center mb-4 w-[55%]">
          <div className="flex justify-between items-center w-full ">
            <p className="text-gray-500 text-right text-[0.9vw]">
              تعداد روز های دوره: 230 روز
            </p>
            <div className="h-2 bg-gray-200 rounded-full w-[40%]">
              <div
                className="h-2 bg-green-400 rounded-full"
                style={{ width: "80%" }}
              ></div>
            </div>
            <p className="text-gray-500 text-righ text-[0.9vw]">
              روزهای باقی مانده: 80 روز
            </p>
          </div>
          <div className="flex justify-between items-center w-full ">
            <p className="text-gray-500 text-right text-[0.9vw]">
              شهریه دوره: 4,200,000 تومان
            </p>
            <div className="h-2 bg-gray-200 rounded-full w-[40%]">
              <div
                className="h-2 bg-yellow-400 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
            <p className="text-gray-500 text-righ text-[0.9vw]">
              باقی‌مانده شهریه: 2,100,000 تومان
            </p>
          </div>
        </div>
      </div>
      {/* Status Boxes */}
      <div className="flex justify-between text-center">
        <div className="flex-1 ">
          <p className="text-4xl font-bold  mb-[0.8vw]">12</p>
          <p className="text-gray-500">جلسات باقی مانده</p>
        </div>
        <div className="flex-1">
          <p className="text-4xl font-bold  mb-[0.8vw]">12</p>
          <p className="text-gray-500">جلسه فعلی</p>
        </div>
        <div className="flex-1">
          <p className="text-4xl font-bold  mb-[0.8vw]">14</p>
          <p className="text-gray-500">سرفصل آموزشی</p>
        </div>
        <div className="flex-1">
          <p className="text-4xl font-bold mb-[0.8vw]">340</p>
          <p className="text-gray-500">تعداد دانشجو</p>
        </div>
      </div>
    </div>
  );
}

export default CourseStatus;
