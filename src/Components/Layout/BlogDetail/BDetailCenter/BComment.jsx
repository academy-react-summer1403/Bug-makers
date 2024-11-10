import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import { getRepleyComment } from "../../../../Core/Services/Api/BlogDetail/CommentDetail";
import moment from "moment-jalaali";
import { useSelector } from "react-redux";

const BComment = ({
  comment = [],
  onSubmit,
  userId,
  GetComment,
  newsId,
  setNewsDissLikeComment,
  setNewsLikeComment,
  delLikeNews2Comment,
}) => {
  const convertToJalali = (miladiDate) => {
    return moment(miladiDate, "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD");
  };

  const [commenting, setCommenting] = useState([])
  useEffect(() => {
    setCommenting(comment);
  }, [comment]);


  const renderCourses = (commenting) => {
      if (!Array.isArray(commenting) || commenting.length === 0) {
      return <p></p>; 
    }

    console.log(commenting);
    return commenting.map((commenting) => (
      <Comments
        key={commenting.id}
        id={commenting.id}
        inserDate={commenting.commentingCatregoryName}
        describe={commenting.describe}
        likeCount={commenting.likeCount}
        dissLikeCount={commenting.dissLikeCount}
        title={commenting.title}
        replyCount={commenting.replyCount}
        currentUserIsLike={commenting.currentUserIsLike}
        currentUserIsDissLike={commenting.currentUserIsDissLike}
        pictureAddress={commenting.pictureAddress}
        date={convertToJalali(commenting.inserDate)}
        parentId={commenting.id}
        currentUserLikeId={commenting.currentUserLikeId}
        renderCourses={renderCourses}
        onSubmit={onSubmit}
        userId={userId}
        GetComment={GetComment}
        newsId={newsId}
        setNewsDissLikeComment={setNewsDissLikeComment}
        setNewsLikeComment={setNewsLikeComment}
        delLikeNews2Comment={delLikeNews2Comment}
      />
    ));
  };

  const handleLikeSort = () => {
    const sortedComments = [...comment].sort((a, b) => b.likeCount - a.likeCount);
    setCommenting(sortedComments);
  };
  const handleDateSort = () => {
    const sortedComments = [...comment].sort((a, b) => new Date(b.inserDate) - new Date(a.inserDate));
    setCommenting(sortedComments);
  };
  const handleDateDownSort = () => {
    const sortedComments = [...comment].sort((a, b) => new Date(a.inserDate) - new Date(b.inserDate));
    setCommenting(sortedComments);
  };
  

const dark = useSelector((state) => state.darkMood);
  return (
    <div
      style={{ background: dark.bgHigh, color: dark.textHigh }}
      className="w-full max-h-[60vw] overflow-auto rounded-[0.78vw]  mt-[2vw] p-[1vw] "
    >
      {commenting && Array.isArray(commenting) && commenting.length > 0 ? (
        <div className="h-auto w-full flex flex-col md:flex-row justify-between items-center">
          <span className="text-[18px] w-full md:w-[20%] text-right">
            نظرات
          </span>
          <div className=" max-md:w-[60%] w-[40%] flex flex-wrap justify-between items-center text-[12px] my-1">
            <div
              onClick={handleLikeSort}
              className="hover:text-blue-600 cursor-pointer w-1/4 text-center"
            >
              تعداد لایک
            </div>
            -
            <div
              onClick={handleDateDownSort}
              className=" hover:text-blue-600 cursor-pointer w-1/4 text-center"
            >
              قدیمی‌ترین
            </div>
            -
            <div
              onClick={handleDateSort}
              className=" hover:text-blue-600 cursor-pointer w-1/4 text-center"
            >
              جدید‌ترین
            </div>
          </div>
          <div className="w-full md:w-[20%] text-right mt-2 md:mt-0">
            <span className="text-[10px]">{commenting.length}</span>
            <span className="text-[10px]"> نظر ثبت شده</span>
          </div>
        </div>
      ) : (
        <div>هیچ نظری برای این پست ثبت نشده</div>
      )}

      <div className="w-full">{renderCourses(commenting)}</div>
    </div>
  );
  
};

export default BComment;
