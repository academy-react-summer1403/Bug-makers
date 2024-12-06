import React, { useEffect, useState } from "react";
import { getItem } from "../../../../Core/Services/common/storage.services";
import { comentDelLikeCourse, commentDissLikeNews, commentLikeNews, setNewComment } from "../../../../Core/Services/Api/BlogDetail/CommentDetail";
import { useDispatch, useSelector } from "react-redux";
import calculateDateDifference from "../../../Common/TimeChanger/TimeChanger";
import convertToJalali from "../../../Common/TimeChanger/TimeToShamsi";
import toast from "react-hot-toast";
import { AddBlogFavorite } from "../../../../Core/Services/Api/BlogDetail/addFavorite";
import { deleteBlogFavorite } from "../../../../Core/Services/Api/BlogDetail/deleteFavorite";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { delLikePodcast, getPodcastComment, getPodcastDetail, postDissLikePodcast, postLikePodcast } from "../../../../Core/Services/Api/PodcastDetail/BlogDetail";
import { setPodcastComment } from "../../../../Core/Services/Api/PodcastDetail/CommentDetail";
import QuizPage from "./QuizPage";
import { getTestById } from "../../../../Core/Services/Api/TestDetail/TestDeatil";
import { Skeleton } from "@mui/material";
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
     queryKey: ["getTestDetail"],
     queryFn: () => getTestById(id),
     enabled: !!id,
     onSuccess: (data) => {
       setResponse(data.data.data || []);
       console.log(data.data.data);
     },
   });  


  const synth = window.speechSynthesis;
  function Voice(voiceText) {
    let text = response.describe;
    const utterThis = new SpeechSynthesisUtterance(voiceText);
    synth.lang = "fa-IR";
    synth.speak(utterThis);

    // console.log(myRef)
  }
  console.log(response);
  const dark = useSelector((state) => state.darkMood);
  return (
    <div className="w-[80%]  mx-auto max-md:w-full  px-4">
      <div
        style={{ background: dark.bgHigh, color: dark.textHigh }}
        className=" rounded-lg w-[100%] shadow-lg p-4 mb-4"
      >
        <div className="flex justify-between items-center">
          <span className=" text-2xl">
            {response.title ? (
              response.title
            ) : (
              <Skeleton height={`100%`} width={`150px`} />
            )}
          </span>
          {response.Insert ? (
            <div className=" max-md:text-sm text-lg">
              <span>{convertToJalali(response.Insert)}</span> |
              <span>
                {calculateDateDifference(convertToJalali(response.Insert))} روز
                پیش
              </span>
            </div>
          ) : (
            <Skeleton height={`100%`} width={`200px`} />
          )}
        </div>

        <div
          className={`relative max-h-[600px] h-[600px] w-full rounded-lg overflow-hidden mt-4 
            ${response.Image ? "h-[600px] max-md:h-[200px]" : null}
            ${
              dark.bgHigh == "#ffffff"
                ? "bg-gradient-to-r from-blue-200 to-blue-50"
                : "bg-gradient-to-r from-[#202020] to-[#414141] "
            }`}
        >
          {response.Image ? (
            <img src={response.Image} className="w-full object-cover" alt="" />
          ) : null}
          <div
            style={{ background: dark.bgLow, color: dark.textLow }}
            className="absolute top-[0.7vw] left-[0.7vw]  p-2  rounded-full shadow-md"
          >
            <span className="">              
              {response.Level ? (
                ` سطح : ${response.Level}`
              ) : (
                <Skeleton circle={true} height={`100%`} width={`50px`} />
              )}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-300 my-4"></div>
        <div className="w-full ">
          {response?.tests ? (
            <QuizPage data={response.tests} response={response} />
          ) : (
            "تستی موجود نیست"
          )}
        </div>
      </div>
    </div>
  );
};
export default BDetailCenter;
