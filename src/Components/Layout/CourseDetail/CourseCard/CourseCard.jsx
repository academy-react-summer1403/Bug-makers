import React, { createContext, useEffect, useState } from "react";
import CourseStatus from "../Commen/CoursePreviwe";
import CoursePreviwe0 from "../Commen/CoursePreviwe0";
import RatingStar from "../Commen/RatingStar";
import CourseMenu from "../Commen/CourseMenu";
import {
  delLikeNews,
  getCourseDetail,
  getCourseDetailComment,
  postDissLikeNews,
  postLikeNews,
  CorseReserve,
} from "../../../../Core/Services/Api/CourseDetail/CourseDetail";
import CComment from "../Comment/CComment";
import {
  comentDelLikeCourse,
  commentDissLikeCourse,
  commentLikeCourse,
  setCourseComment,
  setCourseRepleyComment,
} from "../../../../Core/Services/Api/CourseDetail/CommentDetail";
import { getItem } from "../../../../Core/Services/common/storage.services";
import AddCommentForm from "../Comment/AddCommentForm";


function CourseCard({id}) {
  
  const [response,setResponse]=useState({})
  const [comment, setComment] = useState({});
  const [detailPage,setDetailPage] = useState(0)
  const [repleyModal,setRepleyModal]=useState(false)
  const userId = getItem("userId");
  const NewsId =id;
  const handelPage = (value)=>{
    setDetailPage(value);
  }

  const CorseReserveF= async()=>{
    const re = await CorseReserve({ "courseId": `${id}` });
     re.success
       ? alert(
            "کورس مورد نظر بعد از تایید ادمین برا شما ثبت میشود"
         )
       : alert("لطفا ابتدا وارد شوید");
  }

  const GetId= async ()=>{
    const res = await getCourseDetail(id);
    setResponse(res);
  }
  const GetComment= async ()=>{
    const re = await getCourseDetailComment(id);
        setComment(re);
        console.log(comment);
  }
  useEffect(()=>{
    GetId();
    GetComment();
  },[])

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
    console.log(response.userLikeId);
    const res = await delLikeNews(response.userLikeId);
    console.log(res);
    GetId();
  };
  
  const onSubmit = async (val) => {
    const res = await setCourseRepleyComment(val);
    res.success
      ? alert(
          "نظر شما با موفقییت ثبت گردید و پس از تایید ادمین به نمایش در میاید"
        )
      : alert("لطفا ابتدا وارد شوید");
  };

  const onSubmit2 = async (val) => {
      const res = await setCourseComment(val);
      res.success
        ? alert(
            "نظر شما با موفقییت ثبت گردید و پس از تایید ادمین به نمایش در میاید"
          )
        : alert("لطفا ابتدا وارد شوید");
    };
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





  return (
    <div className="mx-auto w-full shadow-lg text-[#5E5E5E] ">
      <div className="relative w-full h-[20vw] flex justify-between mt-[3vw]">
        <div className="w-1/2 mr-[2vw] h-full text-right mt-[1vw] relative">
          <span className="block text-[30px] mb-[1.82vw]">
            {response.title}
          </span>
          <span className="block w-[70%] text-[16px]">
            {response.miniDescribe}
          </span>
          <img
            className="relative left-[-9vw] w-[75%] h-[100%]"
            src="../../../../../public/images/Course/Image 12.png"
            alt=""
          />
          <div className="relative top-[-3vw] w-1/2 flex items-end flex-row justify-start">
            <div className=" size-[4.17vw] rounded-full bg-gradient-to-b from-[#F2F2F2] to-[#C4CDD5] shadow-[-0.16vw_0.16vw_0.16vw_0_rgba(0,0,0,0.1)]"></div>
            <span className="mr-[0.6vw] text-[#6E6E6E] text-[17px]">
              مدرس دوره: {response.teacherName}
            </span>
          </div>
        </div>
        <div className="w-1/2 ml-[2vw] h-[460px] bg-gradient-to-b from-[#C4CDD5] to-[#F2F2F2] rounded-[1vw] shadow-[-0.78vw_0.78vw_0.78vw_0_rgba(100,100,100,0.1)]">
          <img className="h-full mx-auto" src={response.imageAddress} alt="" />
        </div>
        <div className="h-[2vw] w-[15vw] absolute top-[25vw] left-[2vw] flex flex-row-reverse justify-between">
          <div className="text-[0.8vw] justify-between text-gray-800 w-2/3 h-[1.46vw] flex ">
            <div className="cursor-pointer flex justify-evenly h-full w-[50%] items-center">
              <span>{response.likeCount}</span>
              <svg
                onClick={() => {
                  response.currentUserLike != 0
                    ? delLikeNews2()
                    : setNewsLike();
                }}
                width="29"
                height="25"
                viewBox="0 0 29 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.5897 9.30813C25.4917 8.04276 23.8987 7.31611 22.2233 7.31646L17.607 7.31646L17.9959 4.95446C18.2802 3.23526 17.262 1.56728 15.6029 1.03453C13.9438 0.501792 12.1448 1.26517 11.3752 2.82855L9.16016 7.31646H6.02167C2.82756 7.32029 0.239177 9.9087 0.235352 13.1028V18.8892C0.239178 22.0834 2.82756 24.6718 6.02167 24.6756L21.4133 24.6756C24.2916 24.6638 26.7281 22.5477 27.1429 19.6993L27.9587 13.9129C28.1912 12.2521 27.6918 10.5722 26.5897 9.30813ZM2.54988 18.8892V13.1028C2.54988 11.1854 4.10425 9.63101 6.02167 9.63101H8.33619V22.361H6.02167C4.10425 22.361 2.54988 20.8067 2.54988 18.8892ZM25.6616 13.5877L24.8446 19.3741C24.5977 21.0818 23.1386 22.3519 21.4133 22.361H10.6507V9.32318C10.7598 9.22816 10.8501 9.11354 10.9169 8.98525L13.4501 3.85274C13.6429 3.50513 13.9907 3.27115 14.3853 3.22371C14.7799 3.17627 15.1733 3.32114 15.4429 3.61318C15.6731 3.88087 15.772 4.23727 15.7126 4.58529L15.1016 8.28857C15.0473 8.62346 15.1427 8.9653 15.3625 9.22369C15.5824 9.48207 15.9045 9.63097 16.2438 9.63101H22.2233C23.2293 9.63101 24.1853 10.0669 24.8447 10.8259C25.5039 11.5845 25.802 12.5921 25.6616 13.5877Z"
                  fill={response.currentUserLike == 0 ? "#7F7F7F" : "#FF0000"}
                />
              </svg>
            </div>
            |
            <div className="cursor-pointer flex justify-evenly h-full w-[50%] items-center">
              <span>{response.dissLikeCount}</span>
              <svg
                onClick={() => {
                  response.currentUserDissLike != 0
                    ? delLikeNews2()
                    : setNewsDissLike();
                }}
                width="29"
                height="25"
                viewBox="0 0 29 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28.2215 11.2368L27.4056 5.45041C26.9912 2.6042 24.558 0.488758 21.6818 0.474121H6.29022C3.09611 0.477947 0.507732 3.06636 0.503906 6.2605V12.0469C0.507732 15.241 3.09611 17.8294 6.29022 17.8332H9.42872L11.6437 22.3212C12.4134 23.8845 14.2123 24.6479 15.8714 24.1152C17.5305 23.5824 18.5488 21.9144 18.2644 20.1952L17.8756 17.8332H22.4919C24.1682 17.8332 25.7619 17.1065 26.8609 15.8411C27.9597 14.576 28.4562 12.8963 28.2215 11.2368ZM6.29022 2.78867H8.60475V15.5187H6.29022C4.37281 15.5187 2.81843 13.9643 2.81843 12.0469V6.2605C2.81843 4.34306 4.3728 2.78867 6.29022 2.78867ZM25.1119 14.3244C24.4526 15.083 23.4969 15.5186 22.4919 15.5187H16.5123C16.1724 15.5187 15.8498 15.668 15.6299 15.927C15.4101 16.1857 15.3151 16.5282 15.3701 16.8635L15.9811 20.5667C16.0406 20.9148 15.9417 21.2712 15.7115 21.5388C15.4411 21.8304 15.0471 21.9743 14.6524 21.9257C14.2577 21.8771 13.9103 21.6419 13.7187 21.2935L11.1854 16.1645C11.1186 16.0362 11.0283 15.9216 10.9193 15.8265V2.78867H21.6818C23.4094 2.79498 24.8717 4.06577 25.1189 5.7756L25.9359 11.562C26.0746 12.5587 25.774 13.5665 25.1119 14.3244Z"
                  fill={
                    response.currentUserDissLike == 0 ? "#7F7F7F" : "#FF0000"
                  }
                />
              </svg>
            </div>
          </div>
          <RatingStar id={id} />
        </div>
      </div>
      <CoursePreviwe0 response={response} CorseReserve={CorseReserveF} />
      {/* <CourseStatus /> */}
      <div className="w-full rounded-[1vw]  p-[1vw] mt-[2.71vw]">
        <CourseMenu handelPage={handelPage} />
        <div className="w-full p-[1vw]">
          <div
            className={`w-full h-full py-[4vw] text-right leading-[2.5vw] text-[0.9vw]  ${
              detailPage === 0 ? "block" : "hidden"
            }`}
          >
            {response.describe}
          </div>
          <div
            className={`w-full h-full bg-blue-700 ${
              detailPage == 1 ? "block" : "hidden"
            }`}
          ></div>
          <div
            className={`w-full h-full bg-gray-100 text-[1.5vw] ${
              detailPage == 2 ? "block" : "hidden"
            }`}
          >
            این قابلیت در حال حاضر موجود نیست !!
          </div>
          <div
            className={`w-full h-full ${detailPage == 3 ? "block" : "hidden"}`}
          >
            <div
              onClick={() => {
                setRepleyModal(true);
              }}
              className="w-full rounded-[0.5vw] h-[3vw] text-[1.5vw] bg-gray-300 cursor-pointer"
            >
              ثبت نظر{" "}
            </div>
            <div
              className={
                repleyModal
                  ? "fixed z-0 top-0 left-0 h-screen w-screen bg-[#8a8a8a96] backdrop-blur-[3px]"
                  : "hidden"
              }
              onClick={() => {
                setRepleyModal(false);
              }}
            >
              <div
                className={
                  repleyModal
                    ? "h-max w-[50vw] rounded-[1vw] bg-white absolute z-40 top-1/4 left-1/4"
                    : "hidden"
                }
                onClick={(e) => e.stopPropagation()}
              >
                <AddCommentForm
                  onSubmit={onSubmit}
                  newsId={id}
                  parentId={null}
                  onSubmit2={onSubmit2}
                />
              </div>
            </div>{" "}
            <CComment
              comment={comment}
              onSubmit={onSubmit}
              userId={userId}
              GetComment={GetComment}
              newsId={id}
              setNewsDissLikeComment={setNewsDissLikeComment}
              setNewsLikeComment={setNewsLikeComment}
              delLikeNews2Comment={delLikeNews2Comment}
              onSubmit2={onSubmit2}
            />
          </div>
          <div
            className={`w-full h-full bg-yellow-500 ${
              detailPage == 4 ? "block" : "hidden"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
