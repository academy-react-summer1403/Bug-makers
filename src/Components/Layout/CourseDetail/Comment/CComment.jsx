import React, { useState } from "react";
import CourseComments from "./CourseComments";
import moment from "moment-jalaali";
import { useSelector } from "react-redux";

const CComment = ({
  comment = [],
  onSubmit,
  userId,
  GetComment,
  newsId,
  setNewsDissLikeComment,
  setNewsLikeComment,
  delLikeNews2Comment,
  onSubmit2,
}) => {
  const convertToJalali = (miladiDate) => {
    return moment(miladiDate, "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD");
  };
  

  const renderCourses = (comment,id) => {
    if (!Array.isArray(comment) || comment.length === 0) {
      return <p></p>; // در صورتی که comment خالی یا undefined باشد، پیام نشان داده می‌شود.
    }

    console.log(comment);

    return comment.map((comment) => (
      <CourseComments
        commentId={id}
        key={comment.id}
        id={comment.id}
        inserDate={comment.commentCatregoryName}
        describe={comment.describe}
        likeCount={comment.likeCount}
        dissLikeCount={comment.disslikeCount}
        title={comment.author}
        replyCount={comment.acceptReplysCount}
        currentUserIsLike={comment.currentUserEmotion}
        currentUserIsDissLike={comment.currentUserEmotion}
        pictureAddress={comment.pictureAddress}
        date={comment.insertDate}
        parentId={comment.parentId}
        currentUserLikeId={comment.currentUserLikeId}
        renderCourses={renderCourses}
        onSubmit={onSubmit}
        userId={userId}
        GetComment={GetComment}
        newsId={newsId}
        setNewsDissLikeComment={setNewsDissLikeComment}
        setNewsLikeComment={setNewsLikeComment}
        delLikeNews2Comment={delLikeNews2Comment}
        onSubmit2={onSubmit2}
      />
    ));
  };
const dark = useSelector((state) => state.darkMood);

const handleLikeSort = () => {
  const sortedComments = [...comment].sort((a, b) => b.likeCount - a.likeCount);
  setCommenting(sortedComments);
};
const handleDateSort = () => {
  const sortedComments = [...comment].sort(
    (a, b) => new Date(b.inserDate) - new Date(a.inserDate)
  );
  setCommenting(sortedComments);
};
const handleDateDownSort = () => {
  const sortedComments = [...comment].sort(
    (a, b) => new Date(a.inserDate) - new Date(b.inserDate)
  );
  setCommenting(sortedComments);
};




  return (
    <div
      style={{ background: dark.bgHigh, color: dark.textHigh }}
      className="w-full max-md:max-h-[500px] h-max max-h-[60vw] overflow-auto rounded-[0.78vw] bg-white mt-[2vw] p-[1vw] text-gray-600"
    >
      {comment && Array.isArray(comment) && comment.length > 0 ? (
        <div className="h-[15%] w-full flex justify-between items-center max-md:mb-[20px]">
          <span className="text-[1.1vw] max-md:text-[16px] w-[7vw] text-right">
            نظرات
          </span>
          <div className="max-md:hidden flex max-md:text-[8px] w-[40%] text-[0.8vw] justify-between items-center">
            <div
              onClick={handleLikeSort}
              className="h-[1vw] w-1/4 cursor-pointer"
            >
              {" "}
              تعداد لایک{" "}
            </div>
            -
            <div
              onClick={handleDateDownSort}
              className="h-[1vw] w-1/4 cursor-pointer"
            >
              قدیمی‌ترین
            </div>
            -
            <div
              onClick={handleDateSort}
              className="h-[1vw] w-1/4 cursor-pointer"
            >
              جدید‌ترین
            </div>
          </div>
          <div className="w-[7.30vw] max-md:w-[20%]">
            <span className="text-[1vw] max-md:text-[8px]">
              {comment.length}
            </span>
            <span className="text-[0.8vw] max-md:text-[8px]"> نظر ثبت شده</span>
          </div>
        </div>
      ) : (
        <div>هیچ نظری برای این پست ثبت نشده</div>
      )}

      <div className="w-full">{renderCourses(comment, 0)}</div>
    </div>
  );
};

export default CComment;
