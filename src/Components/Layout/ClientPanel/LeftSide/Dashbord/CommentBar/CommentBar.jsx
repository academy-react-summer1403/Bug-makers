import React from "react";

const CommentSection = () => {
  return (
    <div className="w-full h-[99%] bg-white rounded-[0.5vw]">
      <div className="h-[15%] w-full p-[1vw] mb-[0.5vw] flex items-center justify-between">
        <span className="text-[1.2vw] font-[600]">نظرات شما</span>
        <span className="text-[0.8vw] cursor-pointer text-orange-400">
          مشاهده همه
        </span>
      </div>
      <div className="w-full h-[72%] px-[1vw] flex justify-between items-center">
        <div className="h-full w-[45%] bg-red-500"></div>
        <div className="w-0 h-[70%] border-[0.1vw] border-gray-300" ></div>
        <div className="h-full w-[45%] bg-red-500"></div>
      </div>
    </div>
  );
}
export default CommentSection;
