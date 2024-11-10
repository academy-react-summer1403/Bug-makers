import React, { useContext, useEffect, useState } from "react";

import AddCommentForm from "./AddCommentForm";
import calculateDateDifference from "../../../../../../Common/TimeChanger/TimeChanger";
import convertToJalali from "../../../../../../Common/TimeChanger/TimeToShamsi";
import { getRepleyCommentCorse } from "../../../../../../../Core/Services/Api/CourseDetail/CommentDetail";
import { useSelector } from "react-redux";


const CourseComments = ({
  id,
  inserDate,
  describe,
  likeCount,
  dissLikeCount,
  title,
  replyCount,
  currentUserIsLike,
  currentUserIsDissLike,
  pictureAddress,
  parentId,
  currentUserLikeId,
  renderCourses,
  date,
  onSubmit,
  userId,
  GetComment,
  newsId,
  setNewsDissLikeComment,
  setNewsLikeComment,
  delLikeNews2Comment,
  onSubmit2,
  commentId,
 
  
}) => {
  
  calculateDateDifference(convertToJalali(date));
  const [repleyModal, setRepleyModal]=useState(false)

  // console.log(currentUserIsLike);
  const [responseCo, setResponseCo] = useState();
  const showRepley = async (id2) => {
    const res = await getRepleyCommentCorse(id2, newsId);
    setResponseCo(res);
    console.log(res);
  };
  const CourseListItem = useSelector(
    (state) => state.ClientInfoSlice.ClientInfo
  );
const dark = useSelector((state) => state.darkMood);
  return (
    <>
      <div
        style={{ background: dark.bgHigh, color: dark.textHigh }}
        className="p-[0.1vw] max-md:py-1 max-md:h-[140px] py-[1vw] border-b-[0.15vw] border-[#C2C2C2]   flex items-start justify-between h-full w-full "
      >
        <div className="overflow-hidden max-md:size-[60px] max-md:rounded-lg size-[3vw] ml-[1vw] rounded-[0.42vw] bg-gradient-to-b from-[#C4CDD5] to-[#F2F2F2] flex justify-center">
          <img
            src={CourseListItem.currentPictureAddress}
            alt=""
            className="h-full"
          />
        </div>
        <div className="w-[95%] text-right ">
          {/* Header: نام نویسنده، تاریخ، ساعت */}
          <div className="flex justify-between items-center mb-2 ">
            <div className="text-[0.7vw] max-md:text-[12px] flex justify-start gap-x-1 w-[65%] max-w-[20vw] max-md:w-[70%] max-md:max-w-full max-md:flex-wrap">
              <span className="max-w-[10vw] overflow-hidden text-ellipsis ... text-nowrap">
                {title}
              </span>
              |<span>{convertToJalali(date)}</span>|<span>ساعت ۱۶:۲۴ </span>
              <span className="mr-[0.5vw]">
                {calculateDateDifference(convertToJalali(date))} روز پیش
              </span>
            </div>
            <div className="text-[0.8vw] max-md:text-[14px] gap-[1vw]  w-1/3  max-w-[15vw] max-md:max-w-[30%] max-md:h-[40px] h-[1.46vw] items-center  flex justify-end max-md:justify-between">
              <div className="flex justify-evenly max-md:justify-between h-full max-md:w-[35%] w-[25%] items-center">
                <span>{likeCount}</span>
                <svg
                  // onClick={() => {
                  //   currentUserIsLike == false
                  //     ? setNewsLikeComment(id)
                  //     : delLikeNews2Comment(currentUserLikeId);
                  //   showRepley(id);
                  // }}
                  className=""
                  width=""
                  height="90%"
                  viewBox="0 0 29 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.5897 9.30813C25.4917 8.04276 23.8987 7.31611 22.2233 7.31646L17.607 7.31646L17.9959 4.95446C18.2802 3.23526 17.262 1.56728 15.6029 1.03453C13.9438 0.501792 12.1448 1.26517 11.3752 2.82855L9.16016 7.31646H6.02167C2.82756 7.32029 0.239177 9.9087 0.235352 13.1028V18.8892C0.239178 22.0834 2.82756 24.6718 6.02167 24.6756L21.4133 24.6756C24.2916 24.6638 26.7281 22.5477 27.1429 19.6993L27.9587 13.9129C28.1912 12.2521 27.6918 10.5722 26.5897 9.30813ZM2.54988 18.8892V13.1028C2.54988 11.1854 4.10425 9.63101 6.02167 9.63101H8.33619V22.361H6.02167C4.10425 22.361 2.54988 20.8067 2.54988 18.8892ZM25.6616 13.5877L24.8446 19.3741C24.5977 21.0818 23.1386 22.3519 21.4133 22.361H10.6507V9.32318C10.7598 9.22816 10.8501 9.11354 10.9169 8.98525L13.4501 3.85274C13.6429 3.50513 13.9907 3.27115 14.3853 3.22371C14.7799 3.17627 15.1733 3.32114 15.4429 3.61318C15.6731 3.88087 15.772 4.23727 15.7126 4.58529L15.1016 8.28857C15.0473 8.62346 15.1427 8.9653 15.3625 9.22369C15.5824 9.48207 15.9045 9.63097 16.2438 9.63101H22.2233C23.2293 9.63101 24.1853 10.0669 24.8447 10.8259C25.5039 11.5845 25.802 12.5921 25.6616 13.5877Z"
                    fill={currentUserIsLike == true ? "red" : "#7F7F7F"}
                  />
                </svg>
              </div>
              |
              <div className="flex justify-evenly max-md:justify-between h-full w-[25%] max-md:w-[35%] items-center">
                <span>{dissLikeCount}</span>
                <svg
                  // onClick={() => {
                  //   currentUserIsDissLike == false
                  //     ? setNewsDissLikeComment(id)
                  //     : delLikeNews2Comment(currentUserLikeId);
                  //   showRepley(id);
                  // }}
                  className=""
                  width=""
                  height="90%"
                  viewBox="0 0 29 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28.2215 11.2368L27.4056 5.45041C26.9912 2.6042 24.558 0.488758 21.6818 0.474121H6.29022C3.09611 0.477947 0.507732 3.06636 0.503906 6.2605V12.0469C0.507732 15.241 3.09611 17.8294 6.29022 17.8332H9.42872L11.6437 22.3212C12.4134 23.8845 14.2123 24.6479 15.8714 24.1152C17.5305 23.5824 18.5488 21.9144 18.2644 20.1952L17.8756 17.8332H22.4919C24.1682 17.8332 25.7619 17.1065 26.8609 15.8411C27.9597 14.576 28.4562 12.8963 28.2215 11.2368ZM6.29022 2.78867H8.60475V15.5187H6.29022C4.37281 15.5187 2.81843 13.9643 2.81843 12.0469V6.2605C2.81843 4.34306 4.3728 2.78867 6.29022 2.78867ZM25.1119 14.3244C24.4526 15.083 23.4969 15.5186 22.4919 15.5187H16.5123C16.1724 15.5187 15.8498 15.668 15.6299 15.927C15.4101 16.1857 15.3151 16.5282 15.3701 16.8635L15.9811 20.5667C16.0406 20.9148 15.9417 21.2712 15.7115 21.5388C15.4411 21.8304 15.0471 21.9743 14.6524 21.9257C14.2577 21.8771 13.9103 21.6419 13.7187 21.2935L11.1854 16.1645C11.1186 16.0362 11.0283 15.9216 10.9193 15.8265V2.78867H21.6818C23.4094 2.79498 24.8717 4.06577 25.1189 5.7756L25.9359 11.562C26.0746 12.5587 25.774 13.5665 25.1119 14.3244Z"
                    fill={
                      currentUserIsDissLike == false ? "#FF0000" : "#7F7F7F"
                    }
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Body: متن نظر */}
          <div className="text-sm max-md:text-medium max-md:h-[60px] overflow-auto mt-[1vw] h-[4vw]">
            {describe}
          </div>

          {/* Footer: دکمه‌های پاسخ دادن و مشاهده پاسخ‌ها */}
          <div className="flex justify-between items-center ">
            <button
              onClick={() => {
                showRepley(id);
              }}
              style={{ background: dark.bgLow, color: dark.textHigh }}
              className="text-[0.7vw] max-md:text-[12px] max-md:rounded-lg max-md:w-[40%] max-md:h-[20px] hover:text-gray-900 rounded-[0.78vw] w-[7vw] h-[1.7vw] p-0"
            >
              مشاهده پاسخ ها ({replyCount ? replyCount : 0})
            </button>
            <div className="w-[30vw] h-[1.7vw] rounded-[0.7vw] bg-[#F6F6F6] text-[0.7vw] leading-[1.5vw] px-[1vw] hidden">
              <span className="overflow-hidden text-ellipsis ...">{}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          repleyModal
            ? "fixed z-10 top-0 left-0 h-full w-full bg-[#8a8a8a96] backdrop-blur-[3px] flex justify-center items-center"
            : "hidden"
        }
        onClick={() => {
          setRepleyModal(false);
        }}
      >
        <div
          className={
            repleyModal
              ? "h-max w-[90vw] max-w-[50vw] rounded-[1vw] bg-white z-40"
              : "hidden"
          }
          onClick={(e) => e.stopPropagation()}
        >
          <AddCommentForm
            onSubmit={onSubmit}
            newsId={newsId}
            parentId={id}
            onSubmit2={onSubmit2}
            setRepleyModal={setRepleyModal}
          />
        </div>
      </div>
      <div>
        {responseCo ? (
          <div className="pr-[3vw] w-full">
            {renderCourses(responseCo, id)}{" "}
          </div>
        ) : (
          <div className="text-[1vw] text-center"></div>
        )}
      </div>
    </>
  );
};

export default CourseComments;
