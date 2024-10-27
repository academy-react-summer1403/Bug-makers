import React from "react";


const CommentSection = () => {
  return (
    <div className="w-full h-[99%] bg-white rounded-[0.5vw]">
      <div className="h-[15%] w-full py-[1%] px-[2%] max-md:p-[10px] flex items-center justify-between">
        <span className="text-[1.2vw] font-[600] max-md:text-[16px]">
          نظرات شما
        </span>
        <span className="text-[0.8vw] max-md:text-[14px] cursor-pointer text-orange-400">
          مشاهده همه
        </span>
      </div>
      <div className="w-full h-[72%] px-[1vw] max-md:flex-col flex justify-between items-center">
        <div className="h-full w-[45%] max-md:w-full">
          <span className="font-[700] text-[0.9vw] max-md:text-[12px]">
            دوره ها
          </span>
          <div className="w-full h-[85%] mt-[0.5vw]">
            <div className="w-full h-[25%] px-[0.5vw] flex gap-x-[0.5vw]">
              <div className="h-full w-[15%] bg-gray-600 rounded-[0.5vw]  max-md:rounded-md"></div>
              <div className="flex flex-col text-[0.7vw] max-md:text-[12px]">
                <span className="font-[600]">نام نویسنده</span>
                <span>01/02/1403</span>
              </div>
            </div>
            <div className="w-full h-[50%] px-[0.5vw] pt-[0.6vw] text-[0.7vw] max-md:mt-[8px] max-md:py-[8px] max-md:text-[10px]">
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                officiis sequi nemo autem deleniti libero?
              </span>
            </div>
            <div className="w-full h-[20%] max-md:text-[10px] max-md:px-[10px] px-[0.5vw] flex justify-start items-center rounded-full bg-gray-200 text-[0.7vw]">
              <span>Lorem ipsum dolor sit amet.</span>
            </div>
          </div>
        </div>
        <div className="w-0 h-[70%] max-md:hidden border-[0.1vw] border-gray-300"></div>
        <div className="h-full w-[45%] max-md:w-full max-md:mt-[20px]">
          <span className="font-[700] text-[0.9vw] max-md:text-[12px]">
            اخبار
          </span>
          <div className="w-full h-[85%] mt-[0.5vw]">
            <div className="w-full h-[25%] px-[0.5vw] flex gap-x-[0.5vw] ">
              <div className="h-full w-[15%] bg-gray-600 rounded-[0.5vw]  max-md:rounded-md"></div>
              <div className="flex flex-col text-[0.7vw] max-md:text-[12px] ">
                <span className="font-[600]">نام نویسنده</span>
                <span>01/02/1403</span>
              </div>
            </div>
            <div className="w-full h-[50%] px-[0.5vw] pt-[0.6vw] text-[0.7vw] max-md:mt-[8px] max-md:py-[8px] max-md:text-[10px]">
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                officiis sequi nemo autem deleniti libero?
              </span>
            </div>
            <div className="w-full h-[20%] max-md:text-[10px] max-md:px-[10px] px-[0.5vw] flex justify-start items-center rounded-full bg-gray-200 text-[0.7vw]">
              <span>Lorem ipsum dolor sit amet.</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
export default CommentSection;
