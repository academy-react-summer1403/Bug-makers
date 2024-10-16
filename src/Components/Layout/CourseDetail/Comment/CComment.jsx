import React, { useState } from "react";
import CourseComments from "./CourseComments";
import moment from "moment-jalaali";

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
  

  // تابعی برای رندر کردن کامنت‌ها
  const renderCourses = (comment,id) => {
    // بررسی اگر comment خالی است
    if (!Array.isArray(comment) || comment.length === 0) {
      return <p></p>; // در صورتی که comment خالی یا undefined باشد، پیام نشان داده می‌شود.
    }

    // console.log(comment);

    return comment.map((comment) => (
      <CourseComments
        commentId={id}
        key={comment.id}
        id={comment.id}
        inserDate={comment.commentCatregoryName}
        describe={comment.describe}
        likeCount={comment.likeCount}
        dissLikeCount={comment.disslikeCount}
        title={comment.title}
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

  return (
    <div className="w-full h-max max-h-[60vw] overflow-auto rounded-[0.78vw] bg-white mt-[2vw] p-[1vw] text-gray-600">
      {comment && Array.isArray(comment) && comment.length > 0 ? (
        <div className="h-[2.5vw] w-full flex justify-between items-center">
          <span className="text-[1.1vw] w-[7vw] text-right">نظرات</span>
          <div className="w-[16.5vw] flex text-[0.8vw] justify-between items-center">
            <div className="h-[1vw] w-1/4 cursor-pointer"> تعداد لایک </div>-
            <div className="h-[1vw] w-1/4 cursor-pointer">قدیمی‌ترین</div>-
            <div className="h-[1vw] w-1/4 cursor-pointer">جدید‌ترین</div>
          </div>
          <div className="w-[7.30vw]">
            <span className="text-[1vw]">{comment.length}</span>
            <span className="text-[0.8vw]"> نظر ثبت شده</span>
          </div>
        </div>
      ) : (
        <div>هیچ نظری برای این پست ثبت نشده</div>
      )}

      <div className="w-full">{renderCourses(comment,0)}</div>
    </div>
  );
};

export default CComment;
