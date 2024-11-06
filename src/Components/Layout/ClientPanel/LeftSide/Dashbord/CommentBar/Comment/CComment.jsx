import React, { useEffect, useState } from "react";
import CourseComments from "./CourseComments";
import moment from "moment-jalaali";
import { getMyCoursesComments } from "../../../../../../../Core/Services/Api/Client/commentBar";
import { getItem } from "../../../../../../../Core/Services/common/storage.services";
import { comentDelLikeCourse, commentDissLikeCourse, commentLikeCourse } from "../../../../../../../Core/Services/Api/CourseDetail/CommentDetail";
import { useSelector } from "react-redux";

const CComment = () => {
  const [comment, setComment] = useState();
  const userId = getItem("userId");

  const GetComment = async () => {
    const re = await getMyCoursesComments();
    setComment(re.myCommentsDtos);
    console.log(comment);
  };
  useEffect(() => {
    GetComment();
  }, []);

  // comment .............................................

  const setNewsDissLikeComment = async (id) => {
    const res = await commentDissLikeCourse(id, false);
    console.log(res);
    GetComment();
  };
  const setNewsLikeComment = async (id) => {
    const res = await commentLikeCourse(id, true);
    console.log(res);
    GetComment();
  };

  const delLikeNews2Comment = async (currentUserLikeId) => {
    console.log(currentUserLikeId);
    const res = await comentDelLikeCourse(currentUserLikeId);
    console.log(res);
    GetComment();
  };

  const convertToJalali = (miladiDate) => {
    return moment(miladiDate, "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD");
  };

  const renderCourses = (comment, id) => {
    if (!Array.isArray(comment) || comment.length === 0) {
      return <p></p>; // در صورتی که comment خالی یا undefined باشد، پیام نشان داده می‌شود.
    }

    // console.log(comment);

    return comment.map((comment) => (
      <CourseComments
        commentId={id}
        key={comment.commentId}
        id={comment.commentId}
        inserDate={comment.commentCatregoryName}
        describe={comment.describe}
        likeCount={comment.likeCount}
        dissLikeCount={comment.dislikeCount != undefined ? comment.dislikeCount : comment.disslikeCount}
        title={comment.title}
        replyCount={comment.replyCount ? comment.replyCount : comment.acceptReplysCount}
        currentUserIsLike={comment.currentUserEmotion}
        currentUserIsDissLike={comment.currentUserEmotion}
        pictureAddress={comment.pictureAddress}
        date={comment.insertDate}
        parentId={comment.parentId}
        currentUserLikeId={comment.currentUserLikeId}
        renderCourses={renderCourses}
        // onSubmit={onSubmit}
        userId={userId}
        GetComment={GetComment}
        newsId={comment.courseId}
        setNewsDissLikeComment={setNewsDissLikeComment}
        setNewsLikeComment={setNewsLikeComment}
        delLikeNews2Comment={delLikeNews2Comment}
        // onSubmit2={onSubmit2}
      />
    ));
  };
  const dark = useSelector((state) => state.darkMood);
  return (
    <div
      style={{ background: dark.bgHigh, color: dark.textHigh }}
      className="w-full h-full max-h-[60vw] max-md:max-h-full overflow-auto rounded-[0.78vw]  mt-[2vw] p-[1vw] text-gray-600"
    >
      {comment && Array.isArray(comment) && comment.length > 0 ? (
        <div className="h-[6%] max-md:h-[10%] w-full flex justify-between items-center">
          <span className="text-[1.1vw] max-md:text-[18px] w-[7vw] text-right">نظرات</span>

          <div className="w-[7.30vw] max-md:w-[35%] flex justify-end gap-x-2">
            <span className="text-[1vw] max-md:text-[15px]">{comment.length}</span>
            <span className="text-[0.8vw] max-md:text-[15px]"> نظر ثبت شده</span>
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
