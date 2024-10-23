import React, { useEffect, useState } from "react";

import BDetailLikeSvg from "../BDcommon/BDetailLikeSvg";
import { Formik, Form, Field } from "formik";
import BComment from "./BComment";
import {
  getBlogDetail,
  getBlogDetailComment,
  postDissLikeNews,
  postLikeNews,
  delLikeNews,
} from "../../../../Core/Services/Api/BlogDetail/BlogDetail";
import { getItem } from "../../../../Core/Services/common/storage.services";
import { comentDelLikeCourse, commentDissLikeNews, commentLikeNews, setNewComment } from "../../../../Core/Services/Api/BlogDetail/CommentDetail";
import AddCommentForm from "./AddCommentForm";
import RecommendLi from "./RecommendLi";
import { useSelector } from "react-redux";
import calculateDateDifference from "../../../Common/TimeChanger/TimeChanger";
import moment from "moment-jalaali";
import convertToJalali from "../../../Common/TimeChanger/TimeToShamsi";
import toast from "react-hot-toast";

const BDetailCenter = ({ id }) => {

    const [response, setResponse] = useState({});
    const [comment, setComment] = useState({});
    const [newsId, setNewsId] = useState(id);



    const GetId = async () => {
        const res = await getBlogDetail(id);
        setResponse(res);
        setNewsId(id);
        console.log(newsId);
        console.log(res);
    };

    const setNewsDissLike = async () => {
        const res = await postDissLikeNews(id);
        console.log(res);
        GetId();
    };
    const setNewsLike = async () => {
        const res = await postLikeNews(id);
        console.log(res);
        GetId();
    };

    const delLikeNews2 = async () => {
        console.log(response.likeId);
        const res = await delLikeNews({ deleteEntityId: `${response.likeId}` });
        console.log(res);
        GetId();
    };

    const GetComment = async () => {
        const re = await getBlogDetailComment(id);
        setComment(re);
        console.log(comment);
    };
    useEffect(() => {
        GetId();
        GetComment();
    }, []);
    const userId = getItem("userId");

    const onSubmit = async (val) => {
        const res = await setNewComment(val);
    };
    const CourseListItem = useSelector((state) => state.BlogSlice.BlogList);
    
    
  

    const renderCourses = () => {
        return CourseListItem.slice(0, 5).map((Recommend) => (
        <RecommendLi
            key={Recommend.id}
            id={Recommend.id}
            title={Recommend.title}
        />
        ));
    };


    // comment.....................................


    
    const setNewsDissLikeComment = async (id) => {
      const res = await commentDissLikeNews(id, false);
      console.log(res);
      GetComment();
    };
    const setNewsLikeComment = async (id) => {
      const res = await commentLikeNews(id, true);
      console.log(res);
      GetComment();
    };

    const delLikeNews2Comment = async (currentUserLikeId) => {
      console.log(currentUserLikeId);
      const res = await comentDelLikeCourse({
        deleteEntityId: `${currentUserLikeId}`,
      });
      console.log(res);
      GetComment();
    };

    

    
    return (
      <div className="w-full max-w-3xl mx-auto  px-4">
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 text-lg">{response.newsCatregoryName}</span>
            <div className="text-gray-500 text-[1.5vw]">
              <span>{convertToJalali(response.updateDate)}</span> | 
              <span>{calculateDateDifference(convertToJalali(response.updateDate))} روز پیش</span>
            </div>
          </div>
          <div className="relative bg-gray-200 rounded-lg overflow-hidden mt-4">
            <img src={response.currentImageAddress} className="w-full h-auto object-cover" alt="" />
            <div className="absolute top-[0.7vw] left-[0.7vw] bg-white p-2 rounded-full shadow-md">
              <span className="text-gray-800">{response.addUserFullName}</span>
            </div>
          </div>
          <h2 className="text-xl text-gray-800 mt-2">{response.title}</h2>
          <div className="flex justify-end mt-2">
            <BDetailLikeSvg likeCount={response.inUsersFavoriteCount} commentCount={response.commentsCount} />
          </div>
          <p className="text-gray-600 mt-2">{response.describe}</p>
          <div className="border-t border-gray-300 my-4"></div>
          <h3 className="text-gray-600 text-sm">شاید علاقمند باشید:</h3>
          <ul className="list-disc list-inside mt-2">
            {renderCourses()}
          </ul>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <span>{response.currentLikeCount}</span>
              <svg onClick={() => {
                  response.currentUserIsLike ? delLikeNews2() : setNewsLike();
                }}
                className="cursor-pointer ml-2"
                width="24"
                height="24"
                fill={response.currentUserIsLike ? "#FF0000" : "#7F7F7F"}
              >
                {/* SVG Path */}
              </svg>
            </div>
            <div className="flex items-center">
              <span>{response.currentDissLikeCount}</span>
              <svg onClick={() => {
                  response.currentUserIsDissLike ? delLikeNews2() : setNewsDissLike();
                }}
                className="cursor-pointer ml-2"
                width="24"
                height="24"
                fill={response.currentUserIsDissLike ? "#FF0000" : "#7F7F7F"}
              >
                {/* SVG Path */}
              </svg>
            </div>
          </div>
          <AddCommentForm userId={userId} onSubmit={onSubmit} newsId={newsId} />
        </div>
    
        <BComment
          comment={comment}
          onSubmit={onSubmit}
          userId={userId}
          GetComment={GetComment}
          newsId={id}
          setNewsDissLikeComment={setNewsDissLikeComment}
          setNewsLikeComment={setNewsLikeComment}
          delLikeNews2Comment={delLikeNews2Comment}
        />
      </div>
    );
    
};
export default BDetailCenter;
