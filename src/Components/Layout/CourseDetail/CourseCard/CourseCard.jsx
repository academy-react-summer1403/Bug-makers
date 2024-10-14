import React from "react";
import CourseStatus from "../Commen/CoursePreviwe";

function CourseCard() {
  return (
    <div className="mx-auto w-full shadow-lg text-[#5E5E5E] ">
      <div className="w-full h-[20vw] flex justify-between mt-[3vw]">
        <div className="w-1/2 h-full text-right mt-[1vw] relative">
          <span className="block text-[30px] mb-[1.82vw]">
            عنوان دوره آموزشی
          </span>
          <span className="block text-[16px]">متن مرتبط با دوره آموزشی</span>
          <img
            className="relative left-[-9vw] w-[75%] h-[100%]"
            src="../../../../../public/images/Course/Image 12.png"
            alt=""
          />
          <div className="relative top-[-2vw] w-1/2 flex items-end flex-row justify-start">
            <div className=" size-[4.17vw] rounded-full bg-gradient-to-b from-[#F2F2F2] to-[#C4CDD5] shadow-[-0.16vw_0.16vw_0.16vw_0_rgba(0,0,0,0.1)]"></div>
            <span className="mr-[0.6vw] text-[#6E6E6E] text-[17px]">
              مدرس دوره: نام مدرس دوره
            </span>
          </div>
        </div>
        <div className="w-1/2 h-[460px] bg-gradient-to-b from-[#C4CDD5] to-[#F2F2F2] rounded-[1vw] shadow-[-0.78vw_0.78vw_0.78vw_0_rgba(100,100,100,0.1)]"></div>
      </div>
      <CourseStatus />
      <div className="w-full bg-white rounded-[1vw] h-[60vw] p-[1vw] mt-[2.71vw]">
        <div className="w-full h-[5.2vw] rounded-[0.52vw] shadow-[-0.26vw_0.26vw_0.26vw_0_rgba(0,0,0,0.1)] flex justify-center gap-x-[13vw] items-center text-[#9F9F9F] text-[1.09vw]">
          <div>توضیحات</div>
          <div>سرفصل ها</div>
          <div>ارسال تسک</div>
          <div>نمرات من</div>
          <div>حسابداری</div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
