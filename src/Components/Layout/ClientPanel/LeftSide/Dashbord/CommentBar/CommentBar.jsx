import React, { useEffect, useState } from "react";
import { getMyCoursesComments, getMyNewsComments } from "../../../../../../Core/Services/Api/Client/commentBar";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import convertToJalali from "../../../../../Common/TimeChanger/TimeToShamsi";


const CommentSection = ({ setOpenCommentBar }) => {


  
const CourseListItem = useSelector((state) => state.ClientInfoSlice.ClientInfo);
const {data:data1, error:error1, isLoading:isLoading1 } = useQuery(
 { querykey:["newsComments"],
  queryFn:getMyNewsComments}
);

// if (isLoading1) return <p>در حال بارگذاری...</p>;
// if (error1) return <p>خطا در واکشی داده‌ها: {error.message}</p>;

const NewsComment = data1?.myNewsCommetDtos[0];

console.log(NewsComment);


  const { data:data2, error:error2, isLoading:isLoading2 } = useQuery(
    ["comments"],
    getMyCoursesComments
  );
  if (isLoading2) return <p>در حال بارگذاری...</p>;
  if (error2) return <p>خطا در واکشی داده‌ها: {error.message}</p>;
  const CourseComent = data2?.myCommentsDtos[0]





  return (
    <div className="w-full h-[99%] bg-white rounded-[0.5vw]">
      <div className="h-[15%] w-full py-[1%] px-[2%] max-md:p-[10px] flex items-center justify-between">
        <span className="text-[1.2vw] font-[600] max-md:text-[16px]">
          نظرات شما
        </span>
        <span
          onClick={() => {
            setOpenCommentBar(true);
          }}
          className="text-[0.8vw] max-md:text-[14px] cursor-pointer text-orange-400"
        >
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
                <span className="font-[600]">
                  {CourseListItem.fName} {CourseListItem.lName}
                </span>
                <span>{convertToJalali(NewsComment.insertDate)}</span>
              </div>
            </div>
            <div className="w-full h-[50%] px-[0.5vw] pt-[0.6vw] text-[0.7vw] max-md:mt-[8px] max-md:py-[8px] max-md:text-[10px]">
              <span>{CourseComent.title}</span>
              <br />
              <span>{CourseComent.describe}</span>
            </div>
            <div className="w-full h-[20%] max-md:text-[10px] max-md:px-[10px] px-[0.5vw] flex justify-start items-center rounded-full bg-gray-200 text-[0.7vw]">
              <span>{CourseComent.courseTitle}</span>
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
                <span className="font-[600]">
                  {CourseListItem.fName} {CourseListItem.lName}
                </span>{" "}
                <span>{convertToJalali(NewsComment.insertDate)}</span>
              </div>
            </div>
            <div className="w-full h-[50%] px-[0.5vw] pt-[0.6vw] text-[0.7vw] max-md:mt-[8px] max-md:py-[8px] max-md:text-[10px]">
              <span>{NewsComment.title}</span>
              <br />
              <span>{NewsComment.describe}</span>
            </div>
            <div className="w-full h-[20%] max-md:text-[10px] max-md:px-[10px] px-[0.5vw] flex justify-start items-center rounded-full bg-gray-200 text-[0.7vw]">
              <span>{NewsComment.courseTitle}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommentSection;
