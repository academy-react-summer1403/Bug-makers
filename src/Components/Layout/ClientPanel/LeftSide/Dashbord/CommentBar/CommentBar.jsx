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
        <div className="h-full w-[45%] ">
          <span className="font-[700]">دوره ها</span>
          <div className="w-full h-[85%] mt-[0.5vw]">
            <div className="w-full h-[25%] px-[0.5vw] flex gap-x-[0.5vw]">
              <div className="h-full w-[15%] bg-gray-600 rounded-[0.5vw]"></div>
              <div className="flex flex-col text-[0.7vw]">
                <span className="font-[600]">نام نویسنده</span>
                <span>01/02/1403</span>
              </div>
            </div>
            <div className="w-full h-[50%] px-[0.5vw] pt-[0.6vw] text-[0.7vw]">
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                officiis sequi nemo autem deleniti libero?
              </span>
            </div>
            <div className="w-full h-[20%] px-[0.5vw] flex justify-start items-center rounded-full bg-gray-200 text-[0.7vw]">
              <span>Lorem ipsum dolor sit amet.</span>
            </div>
          </div>
        </div>
        <div className="w-0 h-[70%] border-[0.1vw] border-gray-300"></div>
        <div className="h-full w-[45%]">
          <span className="font-[700]">اخبار</span>
          <div className="w-full h-[85%] mt-[0.5vw]">
            <div className="w-full h-[25%] px-[0.5vw] flex gap-x-[0.5vw]">
              <div className="h-full w-[15%] bg-gray-600 rounded-[0.5vw]"></div>
              <div className="flex flex-col text-[0.7vw]">
                <span className="font-[600]">نام نویسنده</span>
                <span>01/02/1403</span>
              </div>
            </div>
            <div className="w-full h-[50%] px-[0.5vw] pt-[0.6vw] text-[0.7vw]">
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                officiis sequi nemo autem deleniti libero?
              </span>
            </div>
            <div className="w-full h-[20%] px-[0.5vw] flex justify-start items-center rounded-full bg-gray-200 text-[0.7vw]">
              <span>Lorem ipsum dolor sit amet.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CommentSection;
