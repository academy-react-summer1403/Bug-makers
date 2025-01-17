import React, { useEffect, useState } from "react";
import { getMyCoursesComments, getMyNewsComments } from "../../../../../../Core/Services/Api/Client/commentBar";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import convertToJalali from "../../../../../Common/TimeChanger/TimeToShamsi";
import { Skeleton } from "@mui/material";


const CommentSection = ({ setOpenCommentBar }) => {
const dark = useSelector((state) => state.darkMood);

  
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

  if (!NewsComment && !CourseComent) {
    return (
      <div
        style={{ background: dark.bgLow, color: dark.textLow }}
        className="w-full h-[99%]  rounded-[0.5vw] flex items-center justify-center"
      >
        <p className="text-[2vw] max-md:text-[20px]">
          کامنتی برای شما موجود نیست
        </p>
      </div>
    );
  }
  


    return (
      <div
        style={{ background: dark.bgHigh, color: dark.textHigh }}
        className="w-full h-[99%]  rounded-[0.5vw]"
      >
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
            {!CourseComent ? (
              <div
                style={{ background: dark.bgLow, color: dark.textLow }}
                className="w-full h-[99%]  rounded-[0.5vw] flex items-start flex-col justify-center pr-3"
              >
                {/* <p className="text-[2vw] max-md:text-[20px]">
                  کامنتی برای دوره شما موجود نیست
                </p> */}
                <Skeleton height={`20%`} width={`60%`} />
                <Skeleton height={`20%`} width={`80%`} />
                <Skeleton height={`20%`} width={`90%`} />
              </div>
            ) : (
              <>
                <span className="font-[700] text-[0.9vw] max-md:text-[12px]">
                  دوره ها
                </span>
                <div className="w-full h-[85%] mt-[0.5vw]">
                  <div className="w-full h-[25%] px-[0.5vw] flex gap-x-[0.5vw]">
                    <div className="h-full w-[15%] bg-gray-600 rounded-[0.5vw] overflow-hidden max-md:rounded-md">
                      <img
                        src={CourseListItem.currentPictureAddress}
                        className="w-full h-full"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col text-[0.7vw] max-md:text-[12px]">
                      <span className="font-[600]">
                        {CourseListItem.fName} {CourseListItem.lName}
                      </span>
                      <span>{convertToJalali(CourseComent.insertDate)}</span>
                    </div>
                  </div>
                  <div className="w-full h-[50%] px-[0.5vw] overflow-hidden pt-[0.6vw] text-[0.7vw] max-md:mt-[8px] max-md:py-[8px] max-md:text-[10px]">
                    <span>{CourseComent.title}</span>
                    <br />
                    <span>{CourseComent.describe}</span>
                  </div>
                  <div
                    style={{ background: dark.bgLow, color: dark.textHigh }}
                    className="w-full h-[20%] max-md:text-[10px] max-md:px-[10px] px-[0.5vw] flex justify-start items-center rounded-full  text-[0.7vw]"
                  >
                    <span>{CourseComent.courseTitle}</span>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="w-0 h-[70%] max-md:hidden border-[0.1vw] border-gray-300"></div>
          <div className="h-full w-[45%] max-md:w-full max-md:mt-[20px]">
            {!NewsComment ? (
              <div
                style={{ background: dark.bgLow, color: dark.textLow }}
                className="w-full h-[99%] min-h-[80px]  rounded-[0.5vw] flex items-start pr-4 flex-col  justify-center"
              >
                <Skeleton height={`20%`} width={`60%`} />
                <Skeleton height={`20%`} width={`80%`} />
                <Skeleton height={`20%`} width={`90%`} />
                {/* <p className="text-[1.2vw] max-md:text-[18px]">
                  کامنتی برای مقالات شما موجود نیست
                </p> */}
              </div>
            ) : (
              <>
                <span className="font-[700] text-[0.9vw] max-md:text-[12px]">
                  اخبار
                </span>
                <div className="w-full h-[85%] mt-[0.5vw]">
                  <div className="w-full h-[25%] px-[0.5vw] flex gap-x-[0.5vw] ">
                    <div className="h-full w-[15%] bg-gray-600 rounded-[0.5vw] overflow-hidden max-md:rounded-md">
                      <img
                        src={CourseListItem.currentPictureAddress}
                        className="w-full h-full"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col text-[0.7vw] max-md:text-[12px] ">
                      <span className="font-[600]">
                        {CourseListItem.fName} {CourseListItem.lName}
                      </span>{" "}
                      <span>{convertToJalali(NewsComment.insertDate)}</span>
                    </div>
                  </div>
                  <div className="w-full h-[50%] px-[0.5vw] overflow-hidden pt-[0.6vw] text-[0.7vw] max-md:mt-[8px] max-md:py-[8px] max-md:text-[10px]">
                    <span>{NewsComment.title}</span>
                    <br />
                    <span>{NewsComment.describe}</span>
                  </div>
                  <div
                    style={{ background: dark.bgLow, color: dark.textHigh }}
                    className="w-full h-[20%] max-md:text-[10px] max-md:px-[10px] px-[0.5vw] flex justify-start items-center rounded-full text-[0.7vw]"
                  >
                    <span>{NewsComment.courseTitle}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
};
export default CommentSection;
