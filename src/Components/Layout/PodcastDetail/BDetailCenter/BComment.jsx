import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import { getRepleyComment } from "../../../../Core/Services/Api/BlogDetail/CommentDetail";
import moment from "moment-jalaali";
import { useSelector } from "react-redux";

const BComment = ({
  comment = [],
  onSubmit,
  userId,
  // GetComment,
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
    setCommenting(comment.data);
  }, [comment]);


  const renderCourses = (commenting) => {
      if (commenting) {
        console.log(commenting);
      
        return commenting.map((commenting) => (
        <Comments
          key={commenting.id}
          id={commenting.id}
          inserDate={commenting.Date}
          describe={commenting.Desc}
          likeCount={commenting.likeCount}
          dissLikeCount={commenting.dissLikeCount}
          title={commenting.UserName}
          replyCount={commenting.replyCount}
          currentUserIsLike={commenting.currentUserIsLike}
          currentUserIsDissLike={commenting.currentUserIsDissLike}
          pictureAddress={commenting.File}
          date={convertToJalali(commenting.Date)}
          parentId={commenting.PODId}
          currentUserLikeId={0}
          renderCourses={renderCourses}
          onSubmit={onSubmit}
          userId={commenting.UserId}
          // GetComment={GetComment}
          newsId={commenting.PODId}
          setNewsDissLikeComment={setNewsDissLikeComment}
          setNewsLikeComment={setNewsLikeComment}
          delLikeNews2Comment={delLikeNews2Comment}
        />
      ));
    }

    
    
    ;
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
        <div className="h-auto w-full flex max-md:flex-col flex-row justify-between  items-center">
          <span className="text-[24px] max-md:text-[18px] w-full md:w-[20%] text-right">
            نظرات
          </span>
          <div className=" max-md:w-[80%] w-[40%] flex flex-wrap justify-between items-center max-md:text-[12px] text-[16px] my-1">
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
          <div className="w-[20%] text-[16px] max-md:text-[12px] max-md:md:w-full flex justify-end gap-x-2 text-right mt-2 md:my-2 ">
            <span className="">{commenting.length}</span>
            <span className=""> نظر ثبت شده</span>
          </div>
        </div>
      ) : (
null      )}

      <div className="w-full">{renderCourses(commenting)}</div>
    </div>
  );
  
};

export default BComment;