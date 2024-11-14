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
import { useMutation, useQuery } from "react-query";
import { Button } from "@nextui-org/react";
import Swal from 'sweetalert2';
import {Skeleton} from "@nextui-org/react";
import { setBlogList } from "../../../../Redux/Slice/Blog/BlogList";
import { RiUserVoiceLine } from "react-icons/ri";
import MusicPlayer from "./MusicPlayer";
import { getPodcastComment, getPodcastDetail } from "../../../../Core/Services/Api/PodcastDetail/BlogDetail";
const BDetailCenter = ({ id }) => {
  // const [data, setdata] = useState();
  const [response,setResponse]=useState({})
  const [comment, setComment] = useState({});
  const [newsId, setNewsId] = useState(id);
  // console.log(id)

  // const dispatch = useDispatch();
  // const CourseListItem = useSelector((state) => state.BlogSlice.BlogList);
  // const { isLoading, data } = useQuery(
  //   ["getRecommend"],
  //   getBlogListWithPagination,
  //   {
  //     onSuccess: (data) => {
  //       dispatch(setBlogList(data || data));
  //     },
  //     keepPreviousData: true,
  //   }
  // );

  // const renderCourses = () => {
  //   if (isLoading) {
  //     return (
  //       <div className="max-w-[300px] w-full flex items-center gap-3">
  //         <div>
  //           <Skeleton className="flex rounded-full w-12 h-12" />
  //         </div>
  //         <div className="w-full flex flex-col gap-2">
  //           <Skeleton className="h-3 w-3/5 rounded-lg" />
  //           <Skeleton className="h-3 w-4/5 rounded-lg" />
  //         </div>
  //       </div>
  //     );
  //   }
  //   return data
  //     ?.slice(0, 5)
  //     .map((Recommend) => (
  //       <RecommendLi
  //         key={Recommend.id}
  //         id={Recommend.id}
  //         title={Recommend.title}
  //         desc={Recommend.miniDescribe}
  //       />
  //     ));
  // };

  // const GetId = async () => {
  //   const res = await getPodcastDetail(id);
  //   setResponse(res);
  //   console.log(res)
  //   setNewsId(id);
  // };
   const { isLoading, error, data } = useQuery(
  {
    queryKey:["get2"],
    queryFn: () => getPodcastDetail(id),
    enabled : !!id,
    onSuccess: (data) => {
        setResponse(data.data.data || []);
      },
  }
  );  
     const {
       isLoading: isLoading2,
       error: error2,
       data: data2,
     } = useQuery({
       queryKey: ["get3"],
       queryFn: () => getPodcastComment(id),
       enabled: !!id,
       onSuccess: (data) => {
         setComment(data.data || []);
       },
     });  
  
console.log(comment)
  const setNewsDissLike = async () => {
    const res = await postDissLikeNews(id);
    console.log(res);
    toast.success(" دیس لایک شد 😁");

    // GetId();
  };
  const setNewsLike = async () => {
    const res = await postLikeNews(id);
    console.log(res);
    toast.success("لایک شد 😁");
    // GetId();
  };

  const delLikeNews2 = async () => {
    console.log(response.likeId);
    const res = await delLikeNews(response.likeId);
    console.log(res);
    toast.success("نظر شما با موفقییت حذف شد 😁");

    // GetId();
  };
  const userId = getItem("userId");

  const onSubmit = async (val) => {
    const res = await setNewComment(val);
    res.success
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
  console.log(response.FileLink);
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
          className={`relative h-[400px] w-full rounded-lg overflow-hidden mt-4 ${
            dark.bgHigh == "#ffffff"
              ? "bg-gradient-to-r from-blue-200 to-blue-50"
              : "bg-gradient-to-r from-[#202020] to-[#414141] "
          }`}
        >
          {response.imageLink ? (
            <img
              src={response.imageLink}
              className="w-full h-auto max-h-[400px] object-cover"
              alt=""
            />
          ) : null}
          <div
            style={{ background: dark.bgLow, color: dark.textLow }}
            className="absolute top-[0.7vw] left-[0.7vw]  p-2  rounded-full shadow-md"
          >
            <span className="">{response.title}</span>
          </div>
        </div>
        <h2 className="text-xl  mt-2 text-right">{response.title}</h2>
        <div className="flex justify-start  my-6">{response.Desc}</div>
        <div className="w-full">
          <MusicPlayer audioUrl={response.FileLink} />
        </div>

        <div className="border-t border-gray-300 my-4"></div>
        {/* <h3 className=" text-sm text-right">شاید علاقمند باشید:</h3>
        <ul className="list-disc list-inside mt-2 text-right">
          {renderCourses()}
        </ul> */}

        {/* <AddCommentForm userId={userId} onSubmit={onSubmit} newsId={newsId} /> */}
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
