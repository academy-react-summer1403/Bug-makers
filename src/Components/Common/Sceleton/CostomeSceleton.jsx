import React from "react";

const CustomSkeleton = ({ count }) => {
  return (
    <div className="space-y-4 w-full">
      {/* حلقه برای ایجاد اسکلتون‌ها */}
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-row-reverse items-center justify-between w-full p-4 border border-gray-300 rounded-lg"
        >
          {/* ستون سمت راست */}
          <div className="flex w-[10%] items-center space-x-4">
            {/* آیکون حذف */}
            <div className="w-[40%] h-6 ml-3 bg-gray-300 rounded-full animate-pulse"></div>
            {/* آیکون چشم */}
            <div className="w-[40%] h-6 bg-gray-300 rounded-full animate-pulse"></div>
          </div>

          {/* متن اصلی */}
          <div className="w-[40%] h-4 bg-gray-300 rounded-md animate-pulse"></div>

          {/* ستون سمت چپ */}
          <div className="flex items-center space-x-4 w-[30%] justify-between">
            {/* تاریخ */}
            <div className="w-[40%] h-4 bg-gray-300 rounded-md animate-pulse"></div>
            {/* نویسنده */}
            <div className="w-[40%] h-4 bg-gray-300 rounded-md animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomSkeleton;
