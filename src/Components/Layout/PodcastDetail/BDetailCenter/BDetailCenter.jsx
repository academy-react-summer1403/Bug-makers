import React, { useEffect, useState } from "react";

import BDetailLikeSvg from "../BDcommon/BDetailLikeSvg";
import { Formik, Form, Field } from "formik";
import BComment from "./BComment";
import {
  postDissLikeNews,
  postLikeNews,
  delLikeNews,
} from "../../../../Core/Services/Api/BlogDetail/BlogDetail";
import { getItem } from "../../../../Core/Services/common/storage.services";
import { comentDelLikeCourse, commentDissLikeNews, commentLikeNews, setNewComment } from "../../../../Core/Services/Api/BlogDetail/CommentDetail";
import AddCommentForm from "./AddCommentForm";
import RecommendLi from "./RecommendLi";
import { useDispatch, useSelector } from "react-redux";
import calculateDateDifference from "../../../Common/TimeChanger/TimeChanger";
import moment from "moment-jalaali";
import convertToJalali from "../../../Common/TimeChanger/TimeToShamsi";
import toast from "react-hot-toast";
import { AddBlogFavorite } from "../../../../Core/Services/Api/BlogDetail/addFavorite";
import { deleteBlogFavorite } from "../../../../Core/Services/Api/BlogDetail/deleteFavorite";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "@nextui-org/react";
import Swal from 'sweetalert2';
import {Skeleton} from "@nextui-org/react";
import { setBlogList } from "../../../../Redux/Slice/Blog/BlogList";
import { RiUserVoiceLine } from "react-icons/ri";
import MusicPlayer from "./MusicPlayer";
import { delLikePodcast, getPodcastComment, getPodcastDetail, postDissLikePodcast, postLikePodcast } from "../../../../Core/Services/Api/PodcastDetail/BlogDetail";
import { setPodcastComment } from "../../../../Core/Services/Api/PodcastDetail/CommentDetail";
const BDetailCenter = ({ id }) => {
  const queryClient = useQueryClient();
  // const [data, setdata] = useState();
  const [response,setResponse]=useState({})
  const [comment, setComment] = useState({});
  const [newsId, setNewsId] = useState(id);
  const [likeId,setLikeId]=useState()
  const accId = getItem("accId");
  console.log(accId)
   const { isLoading, error, data } = useQuery({
     queryKey: ["getPodcastDetail"],
     queryFn: () => getPodcastDetail(id, accId),
     enabled: !!id,
     onSuccess: (data) => {
       setResponse(data.data.data || []);
       console.log(data.data.data);
     },
   });  
  
     const {
       isLoading: isLoading2,
       error: error2,
       data: data2,
     } = useQuery({
       queryKey: ["getPodcastComment"],
       queryFn: () => getPodcastComment(id),
       enabled: !!id,
       onSuccess: (data) => {
         setComment(data.data || []);
       },
     });  
  

  const setPodcastDissLike = async () => {
    console.log(id)
    const res = await postDissLikePodcast(id, accId);
    console.log(res);
    setLikeId(res.id);
    queryClient.invalidateQueries("getPodcastDetail");
    !accId ? toast.error("ابتدا وارد شوید") : toast.success(" دیس لایک شد 😁");
 
    // GetId();
  };
  const setPodcastLike = async () => {
    const res = await postLikePodcast(id, accId);
    console.log(res);
    setLikeId(res.id);
    queryClient.invalidateQueries("getPodcastDetail");
    !accId ? toast.error("ابتدا وارد شوید") : toast.success("لایک شد 😁");
    // GetId();
  };

  const delPodcastLike = async () => {
    
    const res = await delLikePodcast(likeId);
    console.log(res);
    queryClient.invalidateQueries("getPodcastDetail");
    toast.success("نظر شما با موفقییت حذف شد 😁");

    // GetId();
  };
  const userId = getItem("userId");

  const onSubmit = async (val) => {
    const res = await setPodcastComment(val);
    console.log(res)
    res.data.success == true
      ? toast.success("نظر قشنگت ثبت شد، بعد از تایید ادمین نمایش داده میشه 😉")
      : "";
  };

  // comment.....................................

  const setNewsDissLikeComment = async (id) => {
    const res = await commentDissLikeNews(id, false);
    console.log(res);
          toast.success(" دیس لایک شد 😁");

    
  };
  const setNewsLikeComment = async (id) => {
    const res = await commentLikeNews(id, true);
    console.log(res);
    toast.success("لایک شد 😁");
    
  };

  const delLikeNews2Comment = async (currentUserLikeId) => {
    console.log(currentUserLikeId);
    const res = await comentDelLikeCourse({
      deleteEntityId: `${currentUserLikeId}`,
    });
    console.log(res);
        toast.success("نظر شما با موفقییت حذف شد 😁");
    
  };

  const mutation = useMutation({
    mutationFn: async () => {
      if (response.isCurrentUserFavorite === true) {
        return await deleteBlogFavorite(id);
      } else {
        return await AddBlogFavorite(id);
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        const message = response.isCurrentUserFavorite
          ? "دوره " + "(" + response.title + ")" + " از علاقه‌مندی‌ها حذف شد"
          : "دوره " + "(" + response.title + ")" + " به علاقه‌مندی‌ها اضافه شد";

        toast.success(message);
        // GetId();
      }
    },
    mutationKey: [
      "toggleFavorite",
      response ? "delete" : "add",
    ],
  });

  const synth = window.speechSynthesis;
  function Voice(voiceText) {
    let text = response.describe;
    const utterThis = new SpeechSynthesisUtterance(voiceText);
    synth.lang = "fa-IR";
    synth.speak(utterThis);

    // console.log(myRef)
  }
  console.log(response.isLike);
  const dark = useSelector((state) => state.darkMood);
  return (
    <div className="w-[80%] mx-auto max-md:w-full  px-4">
      <div
        style={{ background: dark.bgHigh, color: dark.textHigh }}
        className=" rounded-lg shadow-lg p-4 mb-4"
      >
        <div className="flex justify-between items-center">
          <span className=" text-lg">{response.title}</span>
          <div className=" max-[560px]:text-[1.7vw] text-[1vw]">
            <span>{convertToJalali(response.InsertTime)}</span> |
            <span>
              {calculateDateDifference(convertToJalali(response.InsertTime))}{" "}
              روز پیش
            </span>
          </div>
        </div>
        <div
          className={`relative h-max max-h-[600px] w-full rounded-lg overflow-hidden mt-4 
            ${response.imageLink ? "h-[600px] max-md:h-[200px]" : null}
            ${
              dark.bgHigh == "#ffffff"
                ? "bg-gradient-to-r from-blue-200 to-blue-50"
                : "bg-gradient-to-r from-[#202020] to-[#414141] "
            }`}
        >
          {response.imageLink ? (
            <img
              src={response.imageLink}
              className="w-full object-cover"
              alt=""
            />
          ) : null}
          <div
            style={{ background: dark.bgLow, color: dark.textLow }}
            className="absolute top-[0.7vw] left-[0.7vw]  p-2  rounded-full shadow-md"
          >
            <span className="">{response.Category}</span>
          </div>
        </div>
        <div className="size-[7vw] max-md:size-24 absolute top-[23%] max-md:top-[18%] left-[13%] max-md:left-[10%] flex items-center flex-col ">
          <div
            style={{ background: dark.bgLow, color: dark.textLow }}
            className=" size-[4vw] max-md:size-16 rounded-full bg-gradient-to-b from-[#F2F2F2] to-[#C4CDD5]"
          ></div>
          <span className=" max-md:text-[10px] mt-2 text-gray-800 text-[0.6vw]">
            {response.creator}
          </span>
        </div>
        <h2 className="text-xl  mt-14 text-right">{response.title}</h2>
        <div className="flex justify-start text-right my-6">
          {response.Desc}
        </div>
        <div className="w-full">
          <MusicPlayer audioUrl={response.FileLink} />
        </div>

        <div className="border-t border-gray-300 my-4"></div>
        {/* <h3 className=" text-sm text-right">شاید علاقمند باشید:</h3>
        <ul className="list-disc list-inside mt-2 text-right">
          {renderCourses()}
        </ul> */}
        <div className="text-[0.8vw] gap-[2vw] mt-[8vw]  w-full h-[1.46vw] px-[1vw] flex justify-end">
          <div className="flex justify-evenly h-full w-[10%] items-center">
            <span className="text-[0.9765625vw] max-[941px]:text-[1.565625vw] max-[941px]:mt-[0.8vw] max-[941px]:ml-[0.2vw] ">
              {response.allLike}
            </span>
            <svg
              className="cursor-pointer"
              onClick={() => {
                response.isLike == true ? delPodcastLike() : setPodcastLike();
              }}
              width="30"
              height="30"
              viewBox="0 0 29 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.5897 9.30813C25.4917 8.04276 23.8987 7.31611 22.2233 7.31646L17.607 7.31646L17.9959 4.95446C18.2802 3.23526 17.262 1.56728 15.6029 1.03453C13.9438 0.501792 12.1448 1.26517 11.3752 2.82855L9.16016 7.31646H6.02167C2.82756 7.32029 0.239177 9.9087 0.235352 13.1028V18.8892C0.239178 22.0834 2.82756 24.6718 6.02167 24.6756L21.4133 24.6756C24.2916 24.6638 26.7281 22.5477 27.1429 19.6993L27.9587 13.9129C28.1912 12.2521 27.6918 10.5722 26.5897 9.30813ZM2.54988 18.8892V13.1028C2.54988 11.1854 4.10425 9.63101 6.02167 9.63101H8.33619V22.361H6.02167C4.10425 22.361 2.54988 20.8067 2.54988 18.8892ZM25.6616 13.5877L24.8446 19.3741C24.5977 21.0818 23.1386 22.3519 21.4133 22.361H10.6507V9.32318C10.7598 9.22816 10.8501 9.11354 10.9169 8.98525L13.4501 3.85274C13.6429 3.50513 13.9907 3.27115 14.3853 3.22371C14.7799 3.17627 15.1733 3.32114 15.4429 3.61318C15.6731 3.88087 15.772 4.23727 15.7126 4.58529L15.1016 8.28857C15.0473 8.62346 15.1427 8.9653 15.3625 9.22369C15.5824 9.48207 15.9045 9.63097 16.2438 9.63101H22.2233C23.2293 9.63101 24.1853 10.0669 24.8447 10.8259C25.5039 11.5845 25.802 12.5921 25.6616 13.5877Z"
                fill={response.isLike == true ? "#FF0000" : "#7F7F7F"} // تغییر رنگ بر اساس شرط
              />
            </svg>
          </div>
          <span className="text-[1.171875vw] max-[1131px]:text-[2vw] max-[1131px]:mt-[-1vw]">
            |
          </span>
          <div className="flex justify-evenly h-full w-[10%] items-center">
            <span className="text-[0.9765625vw] max-[941px]:text-[1.565625vw] max-[941px]:mt-[0.2vw] max-[941px]:ml-[0.4vw] ">
              {response.allDissLike}
            </span>
            <svg
              onClick={() => {
                response.isDissLike == true
                  ? delPodcastLike()
                  : setPodcastDissLike();
              }}
              className="cursor-pointer"
              width="30"
              height="30"
              viewBox="0 0 29 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.2215 11.2368L27.4056 5.45041C26.9912 2.6042 24.558 0.488758 21.6818 0.474121H6.29022C3.09611 0.477947 0.507732 3.06636 0.503906 6.2605V12.0469C0.507732 15.241 3.09611 17.8294 6.29022 17.8332H9.42872L11.6437 22.3212C12.4134 23.8845 14.2123 24.6479 15.8714 24.1152C17.5305 23.5824 18.5488 21.9144 18.2644 20.1952L17.8756 17.8332H22.4919C24.1682 17.8332 25.7619 17.1065 26.8609 15.8411C27.9597 14.576 28.4562 12.8963 28.2215 11.2368ZM6.29022 2.78867H8.60475V15.5187H6.29022C4.37281 15.5187 2.81843 13.9643 2.81843 12.0469V6.2605C2.81843 4.34306 4.3728 2.78867 6.29022 2.78867ZM25.1119 14.3244C24.4526 15.083 23.4969 15.5186 22.4919 15.5187H16.5123C16.1724 15.5187 15.8498 15.668 15.6299 15.927C15.4101 16.1857 15.3151 16.5282 15.3701 16.8635L15.9811 20.5667C16.0406 20.9148 15.9417 21.2712 15.7115 21.5388C15.4411 21.8304 15.0471 21.9743 14.6524 21.9257C14.2577 21.8771 13.9103 21.6419 13.7187 21.2935L11.1854 16.1645C11.1186 16.0362 11.0283 15.9216 10.9193 15.8265V2.78867H21.6818C23.4094 2.79498 24.8717 4.06577 25.1189 5.7756L25.9359 11.562C26.0746 12.5587 25.774 13.5665 25.1119 14.3244Z"
                fill={response.isDissLike == true ? "#FF0000" : "#7F7F7F"}
              />
            </svg>
          </div>
        </div>

        <AddCommentForm userId={userId} onSubmit={onSubmit} newsId={id} />
      </div>
      <div>
        <BComment
          comment={comment}
          onSubmit={onSubmit}
          userId={userId}
          // GetComment={GetComment}
          newsId={id}
          setNewsDissLikeComment={setNewsDissLikeComment}
          setNewsLikeComment={setNewsLikeComment}
          delLikeNews2Comment={delLikeNews2Comment}
        />
      </div>
    </div>
  );
};
export default BDetailCenter;
