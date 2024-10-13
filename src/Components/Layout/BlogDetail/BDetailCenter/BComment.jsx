import React, { useState } from "react";
import Comments from "./Comments";
import { getRepleyComment } from "../../../../Core/Services/Api/BlogDetail/CommentDetail";
import moment from "moment-jalaali";

const BComment = ({ comment = [],onSubmit,userId,newsId, GetComment}) => {

  const convertToJalali = (miladiDate) => {
    return moment(miladiDate, "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD");
  };
  
  // تابعی برای رندر کردن کامنت‌ها
  const renderCourses = (comment) => {
    // بررسی اگر comment خالی است
    if (!Array.isArray(comment) || comment.length === 0) {
      return <p></p>; // در صورتی که comment خالی یا undefined باشد، پیام نشان داده می‌شود.
    }

    console.log(comment)

    return comment.map((comment) => (
      <Comments
        key={comment.id}
        id={comment.id}
        inserDate={comment.commentCatregoryName}
        describe={comment.describe}
        likeCount={comment.likeCount}
        dissLikeCount={comment.dissLikeCount}
        title={comment.title}
        replyCount={comment.replyCount}
        currentUserIsLike={comment.currentUserIsLike}
        currentUserIsDissLike={comment.currentUserIsDissLike}
        pictureAddress={comment.pictureAddress}
        date={convertToJalali(comment.inserDate)}
        onSubmit={onSubmit}
        newsId={newsId}
        userId={userId}
        parentId={comment.parentId}
        currentUserLikeId={comment.currentUserLikeId}
        GetComment={GetComment}
        renderCourses={renderCourses}
      />
    ));
  };

  return (
    <div className="w-full h-max max-h-[60vw] overflow-auto rounded-[0.78vw] bg-white mt-[2vw] p-[1vw] text-gray-600">
      {comment && Array.isArray(comment) && comment.length > 0?<div className="h-[2.5vw] w-full flex justify-between items-center">
        <span className="text-[1.1vw] w-[7vw] text-right">نظرات</span>
        <div className="w-[16.5vw] flex text-[0.8vw] justify-between items-center">
          <div className="h-[1vw] w-1/4 cursor-pointer"> تعداد لایک </div>
          -
          <div className="h-[1vw] w-1/4 cursor-pointer">قدیمی‌ترین</div>
          -
          <div className="h-[1vw] w-1/4 cursor-pointer">جدید‌ترین</div>
        </div>
        <div className="w-[7.30vw]">
          <span className="text-[1vw]">{comment.length}</span>
          <span className="text-[0.8vw]"> نظر ثبت شده</span>
        </div>
      </div>:<div>هیچ نظری برای این پست ثبت نشده</div>}
      

      <div className="w-full">
        {renderCourses(comment)}
      </div>

    </div>
  );
};

export default BComment;
