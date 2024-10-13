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
import { setNewComment } from "../../../../Core/Services/Api/BlogDetail/CommentDetail";
import AddCommentForm from "./AddCommentForm";
import RecommendLi from "./RecommendLi";
import { useSelector } from "react-redux";

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
    const userId = 20224;

    const onSubmit = async (val) => {
        const res = await setNewComment(val);
        res.success
        ? alert(
            "نظر شما با موفقییت ثبت گردید و پس از تایید ادمین به نمایش در میاید"
            )
        : alert("لطفا ابتدا وارد شوید");
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

    return (
        <div className=" w-[60%] h-max">
        <div className="bg-white w-full h-[3vw] px-[1vw] rounded-[0.52vw] shadow-[-0.26vw_0.26vw_0.26vw_0_rgba(0,0,0,0.1)] text-[#5E5E5E] flex justify-between items-center text-[1vw]">
            <span>{response.newsCatregoryName}</span>
            <div className="w-[18%] h-full flex justify-between items-center">
                <span className="text-[0.62vw] font-[400] text-gray-500">
                    {" "}
                    ۲۵ اردیبهشت ۱۴۰۳
                </span>
                |
                <span className="text-[0.62vw] font-[400] text-gray-500">
                    ۳ روز پیش
                </span>
            </div>
        </div>
        <div className="relative bg-white w-full h-max  p-[0.26vw] mt-[0.78vw] rounded-[0.94vw] shadow-[0_0.26vw_0.26vw_0_rgba(0,0,0,0.2)] text-right">
            <div className="w-full h-[15.63vw] rounded-[0.94vw]  bg-gradient-to-b from-[#C4CDD5] to-[#F2F2F2] flex justify-center">
                <img src={response.currentImageAddress} className="h-full" alt="" />
            </div>
            <div className="size-[6vw] absolute top-[14vw] left-[1vw] flex items-center flex-col">
                <div className=" size-[4vw] rounded-full bg-gradient-to-b from-[#F2F2F2] to-[#C4CDD5]"></div>
                <span className="mt-[0.6vw] text-gray-800 text-[0.6vw]">
                    {response.addUserFullName}
                </span>
            </div>
            <span className="text-[#5E5E5E] text-[1.2vw] mr-[0.6vw] pt-[0.6vw] block">
                {response.title}
            </span>
            <div className="w-full pl-[1vw] h-[3%] flex justify-end items-center mt-[2vw]">
                <BDetailLikeSvg
                    likeCount={response.inUsersFavoriteCount}
                    commentCount={response.commentsCount}
                />
            </div>
            <div className="text-[#555] w-full p-[1vw] mt-[2vw]">
                <p className="leading-[1.5vw] min-h-[6vw] w-full text-[0.8vw] break-words whitespace-normal">
                    {response.describe}
                </p>
            </div>
            <div className="w-[11.7vw] px-[0.5vw] h-[1.82vw] rounded-[1.04vw] flex items-center justify-between">
                <hr className="w-[6%] border-[0.1vw]" />
                <div className="text-gray-400 text-[0.73vw] text-center leading-[1.5vw] w-[9.79vw]  h-full rounded-[1.04vw] border-[#C4CDD5] border-[2px]">
                    شاید علاقمند باشید:
                </div>
            </div>
            <ul className="w-1/5 mt-[0.5vw] mr-[2.08vw] h-[7vw] list-disc text-[#C4CDD5]">
                {renderCourses()}
            </ul>
            <div className="text-[0.8vw] gap-[1.5vw] text-gray-800 w-full h-[1.46vw] px-[1vw] flex justify-end">
                <div className="flex justify-evenly h-full w-[7%] items-center">
                    <span>{response.currentLikeCount}</span>
                    <svg
                    className="cursor-pointer"
                    onClick={() => {
                        response.currentUserIsLike ? delLikeNews2() : setNewsLike();
                    }}
                    width="1.51vw"
                    height="1.3vw"
                    viewBox="0 0 29 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M26.5897 9.30813C25.4917 8.04276 23.8987 7.31611 22.2233 7.31646L17.607 7.31646L17.9959 4.95446C18.2802 3.23526 17.262 1.56728 15.6029 1.03453C13.9438 0.501792 12.1448 1.26517 11.3752 2.82855L9.16016 7.31646H6.02167C2.82756 7.32029 0.239177 9.9087 0.235352 13.1028V18.8892C0.239178 22.0834 2.82756 24.6718 6.02167 24.6756L21.4133 24.6756C24.2916 24.6638 26.7281 22.5477 27.1429 19.6993L27.9587 13.9129C28.1912 12.2521 27.6918 10.5722 26.5897 9.30813ZM2.54988 18.8892V13.1028C2.54988 11.1854 4.10425 9.63101 6.02167 9.63101H8.33619V22.361H6.02167C4.10425 22.361 2.54988 20.8067 2.54988 18.8892ZM25.6616 13.5877L24.8446 19.3741C24.5977 21.0818 23.1386 22.3519 21.4133 22.361H10.6507V9.32318C10.7598 9.22816 10.8501 9.11354 10.9169 8.98525L13.4501 3.85274C13.6429 3.50513 13.9907 3.27115 14.3853 3.22371C14.7799 3.17627 15.1733 3.32114 15.4429 3.61318C15.6731 3.88087 15.772 4.23727 15.7126 4.58529L15.1016 8.28857C15.0473 8.62346 15.1427 8.9653 15.3625 9.22369C15.5824 9.48207 15.9045 9.63097 16.2438 9.63101H22.2233C23.2293 9.63101 24.1853 10.0669 24.8447 10.8259C25.5039 11.5845 25.802 12.5921 25.6616 13.5877Z"
                        fill={response.currentUserIsLike ? "#FF0000" : "#7F7F7F"} // تغییر رنگ بر اساس شرط
                    />
                    </svg>
                </div>
                |
                <div className="flex justify-evenly h-full w-[7%] items-center">
                    <span>{response.currentDissLikeCount}</span>
                    <svg
                    onClick={() => {
                        response.currentUserIsDissLike
                        ? delLikeNews2()
                        : setNewsDissLike();
                    }}
                    className="cursor-pointer"
                    width="1.51vw"
                    height="1.3vw"
                    viewBox="0 0 29 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M28.2215 11.2368L27.4056 5.45041C26.9912 2.6042 24.558 0.488758 21.6818 0.474121H6.29022C3.09611 0.477947 0.507732 3.06636 0.503906 6.2605V12.0469C0.507732 15.241 3.09611 17.8294 6.29022 17.8332H9.42872L11.6437 22.3212C12.4134 23.8845 14.2123 24.6479 15.8714 24.1152C17.5305 23.5824 18.5488 21.9144 18.2644 20.1952L17.8756 17.8332H22.4919C24.1682 17.8332 25.7619 17.1065 26.8609 15.8411C27.9597 14.576 28.4562 12.8963 28.2215 11.2368ZM6.29022 2.78867H8.60475V15.5187H6.29022C4.37281 15.5187 2.81843 13.9643 2.81843 12.0469V6.2605C2.81843 4.34306 4.3728 2.78867 6.29022 2.78867ZM25.1119 14.3244C24.4526 15.083 23.4969 15.5186 22.4919 15.5187H16.5123C16.1724 15.5187 15.8498 15.668 15.6299 15.927C15.4101 16.1857 15.3151 16.5282 15.3701 16.8635L15.9811 20.5667C16.0406 20.9148 15.9417 21.2712 15.7115 21.5388C15.4411 21.8304 15.0471 21.9743 14.6524 21.9257C14.2577 21.8771 13.9103 21.6419 13.7187 21.2935L11.1854 16.1645C11.1186 16.0362 11.0283 15.9216 10.9193 15.8265V2.78867H21.6818C23.4094 2.79498 24.8717 4.06577 25.1189 5.7756L25.9359 11.562C26.0746 12.5587 25.774 13.5665 25.1119 14.3244Z"
                        fill={response.currentUserIsDissLike ? "#FF0000" : "#7F7F7F"}
                    />
                    </svg>
                </div>
            </div>
            <AddCommentForm userId={userId} onSubmit={onSubmit} newsId={newsId} />
        </div>

        <BComment
            GetComment={GetComment}
            onSubmit={onSubmit}
            userId={userId}
            comment={comment}
            newsId={newsId}
        />
        </div>
    );
};
export default BDetailCenter;
