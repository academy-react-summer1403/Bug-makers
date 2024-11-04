import React, { createContext, useEffect, useState } from "react";
import CourseStatus from "../Commen/CoursePreviwe";
import CoursePreviwe0 from "../Commen/CoursePreviwe0";
import RatingStar from "../Commen/RatingStar";
import toast from "react-hot-toast";
import CourseMenu from "../Commen/CourseMenu";
import Swal from 'sweetalert2';
import noImg from '../../../../../public/images/icon/image.jpg'
import { FaChalkboardTeacher, FaPlus } from "react-icons/fa";
import { FaRegPlayCircle } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { IoCalendarNumber, IoTimeOutline } from "react-icons/io5";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";

import {
  delLikeNews,
  getCourseDetail,
  getCourseDetailComment,
  postDissLikeNews,
  postLikeNews,
  CorseReserve,
  deleteCorseReserve,
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
import { useMutation } from "react-query";
import { AddCourseFavorite } from "../../../../Core/Services/Api/CourseDetail/AddCourseFavorite";
import { deleteCourseFavorite } from "../../../../Core/Services/Api/CourseDetail/deleteCourseFavorite";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { useSelector } from "react-redux";
import convertToJalali from "../../../Common/TimeChanger/TimeToShamsi";


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

  const CorseReserveF = useMutation({
    mutationFn: async (id) => {
      return response.isCourseReseve == 1 
        ? await deleteCorseReserve(response.courseReseveId) 
        : await CorseReserve({ courseId: id });
    },
    onSuccess: (data) => {
      if (data.success) {
        const message = response.isCourseReseve == 1 
          ? 'دوره ' + '(' + response.title + ')' + 'از رزرو حذف شد 🥳' 
          : 'دوره ' + '(' + response.title + ')' + 'رزرو شد 🥳';

          toast.custom((t) => (
            <div 
              className={`flex items-center justify-between p-4 bg-[#FFFFFF] text-black rounded-lg shadow-md transition-opacity duration-300 ${t.visible ? 'opacity-100' : 'opacity-0'}`}
            >
              <span>{message}</span>
              <Link to={'/ClientPanel/MyReserve'} onClick={() => toast.dismiss(t.id)} className="  text-green-500 ml-2">مشاهده</Link>
            </div>
          ));

        setResponse(prev => ({
          ...prev,
          isCourseReseve: prev.isCourseReseve === 1 ? 0 : 1,
        }));
      }
    },
  });



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
    const result = await Swal.fire({
      title: 'آیا مطمئن هستید؟',
      text: "این دوره را دیس لایک کنید.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بله، دیس لایک کن!',
      cancelButtonText: 'خیر، لغو کن!'
    });

    if (result.isConfirmed) {
      await postDissLikeNews(id);
      toast.success(' دیس لایک شد 😁');
      GetId();
    }

  };
  const setNewsLike = async () => {
      const result = await Swal.fire({
        title: 'آیا مطمئن هستید؟',
        text: "این دوره را لایک کنید.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله، لایک کن!',
        cancelButtonText: 'خیر، لغو کن!'
      });
  
      if (result.isConfirmed) {
        await postLikeNews(id);
        toast.success('لایک شد 😁');
        GetId();
      }
  };

  const delLikeNews2 = async () => {
    console.log(response.userLikeId);
    const res = await delLikeNews(response.userLikeId);
    console.log(res);
    GetId();
  };
  
  const onSubmit = async (val) => {
    const res = await setCourseRepleyComment(val);
    res.success ? toast.success('نظر قشنگت ثبت شد، بعد از تایید ادمین نمایش داده میشه 😉') : '';
  };

  const onSubmit2 = async (val) => {
      const res = await setCourseComment(val);
      res.success ? toast.success('نظر قشنگت ثبت شد، بعد از تایید ادمین نمایش داده میشه 😉') : '';
    }

  // comment .............................................

  const setNewsDissLikeComment = async (id) => {
    const res = await commentDissLikeCourse(id, false);
    console.log(res);
    GetComment();
    const result = await Swal.fire({
      title: 'آیا مطمئن هستید؟',
      text: "این کامنت را دیس لایک کنید.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بله، لایک کن!',
      cancelButtonText: 'خیر، لغو کن!'
    });

    if (result.isConfirmed) {
      await commentDissLikeCourse(id, false);
      toast.success(' دیس لایک شد 👎');
      GetComment();
    }
  };
  const setNewsLikeComment = async (id) => {
    const result = await Swal.fire({
      title: 'آیا مطمئن هستید؟',
      text: "این کامنت را لایک کنید.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بله، لایک کن!',
      cancelButtonText: 'خیر، لغو کن!'
    });

    if (result.isConfirmed) {
      await commentLikeCourse(id, true);
      toast.success('لایک شد 👍');
      GetComment();
    }
  };

  const delLikeNews2Comment = async (currentUserLikeId) => {
    console.log(currentUserLikeId);
    const res = await comentDelLikeCourse(currentUserLikeId);
    console.log(res);
    GetComment();
  };

  const favorite = response.userFavoriteId;

  const mutation = useMutation({
    mutationFn: async (courseId) => {
      if (response.isUserFavorite === true) {
        return await deleteCourseFavorite({ id: favorite });
      } else {
        return await AddCourseFavorite({ id: courseId });
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        const message = response.isUserFavorite 
          ? 'دوره ' + '(' + response.title + ')' + ' از علاقه‌مندی‌ها حذف شد' 
          : 'دوره ' + '(' + response.title + ')' + ' به علاقه‌مندی‌ها اضافه شد';
        
        toast.success(message);
        GetId(); 
      }
    },
    mutationKey: ['toggleFavorite', response.isUserFavorite ? 'delete' : 'add'],
  });
  const dark = useSelector((state) => state.darkMood);
  
  // return (
  //     <div className="mx-auto w-full shadow-lg text-[#5E5E5E]">
  //       <div className="relative w-full h-auto flex flex-col md:flex-row justify-between mt-[3vw]">
  //         <div className="w-full md:w-1/2 mr-[2vw] h-auto text-right mt-[1vw] relative">
  //           <span className="block text-[2.5vw] mb-[1.82vw]">
  //             {response.title}
  //           </span>
  //           <span className="hidden md:block w-[70%] overflow-hidden text-ellipsis whitespace-nowrap text-[16px]">
  //             {response.miniDescribe}
  //           </span>

  //           <img
  //             className="relative hidden md:block left-[-9vw] w-[75%] h-auto"
  //             src="../../../../../public/images/Course/Image 12.png"
  //             alt=""
  //           />
  //           <div className="relative top-[-3vw] w-1/2 flex flex-row justify-start items-center">
  //             <div className="size-[4.17vw] rounded-full bg-gradient-to-b mt-[0.5vw] from-[#F2F2F2] to-[#C4CDD5] shadow-[-0.16vw_0.16vw_0.16vw_0_rgba(0,0,0,0.1)]"></div>
  //             <span className="mr-[0.6vw] text-[#6E6E6E] whitespace-nowrap md:mt-0 mt-2 text-[15px]">
  //               مدرس دوره: {response.teacherName}
  //             </span>
  //           </div>
  //         </div>
  //         <div className="w-full   md:w-1/2 ml-[2vw] max-h-[460px] bg-gradient-to-b  from-[#C4CDD5] to-[#F2F2F2] rounded-[1vw] shadow-[-0.78vw_0.78vw_0.78vw_0_rgba(100,100,100,0.1)]">
  //           <img className="h-[60vw] md:h-full w-full object-cover mx-auto" src={response.imageAddress ? response.imageAddress : noImg} onError={(e) => {e.target.src = noImg}} alt="" />
  //         </div>
          
  //         <div className=" max-[1360px]:top-[40vw]  max-[768px]:top-[80vw] /*end responsive */ h-[2vw] w-[25vw]  absolute top-[35vw] left-[2vw] flex flex-row-reverse justify-between">
  //           <div className="text-[0.8vw] justify-between text-gray-800 w-2/3 h-[1.46vw] flex ">
  //             <div className="cursor-pointer  flex justify-evenly h-full  w-[50%] items-center">
  //               <span className="max-[782px]:text-[1.2vw] max-[493px]:text-[1.4vw]">{response.likeCount}</span>
  //               <svg
  //                 onClick={() => {
  //                   response.currentUserLike != 0
  //                     ? delLikeNews2()
  //                     : setNewsLike();
  //                 }}
  //                 width="3vw"
  //                 height="3vw"
  //                 viewBox="0 0 29 25"
  //                 fill="none"
  //                 xmlns="http://www.w3.org/2000/svg"
  //               >
  //                 <path
  //                   d="M26.5897 9.30813C25.4917 8.04276 23.8987 7.31611 22.2233 7.31646L17.607 7.31646L17.9959 4.95446C18.2802 3.23526 17.262 1.56728 15.6029 1.03453C13.9438 0.501792 12.1448 1.26517 11.3752 2.82855L9.16016 7.31646H6.02167C2.82756 7.32029 0.239177 9.9087 0.235352 13.1028V18.8892C0.239178 22.0834 2.82756 24.6718 6.02167 24.6756L21.4133 24.6756C24.2916 24.6638 26.7281 22.5477 27.1429 19.6993L27.9587 13.9129C28.1912 12.2521 27.6918 10.5722 26.5897 9.30813ZM2.54988 18.8892V13.1028C2.54988 11.1854 4.10425 9.63101 6.02167 9.63101H8.33619V22.361H6.02167C4.10425 22.361 2.54988 20.8067 2.54988 18.8892ZM25.6616 13.5877L24.8446 19.3741C24.5977 21.0818 23.1386 22.3519 21.4133 22.361H10.6507V9.32318C10.7598 9.22816 10.8501 9.11354 10.9169 8.98525L13.4501 3.85274C13.6429 3.50513 13.9907 3.27115 14.3853 3.22371C14.7799 3.17627 15.1733 3.32114 15.4429 3.61318C15.6731 3.88087 15.772 4.23727 15.7126 4.58529L15.1016 8.28857C15.0473 8.62346 15.1427 8.9653 15.3625 9.22369C15.5824 9.48207 15.9045 9.63097 16.2438 9.63101H22.2233C23.2293 9.63101 24.1853 10.0669 24.8447 10.8259C25.5039 11.5845 25.802 12.5921 25.6616 13.5877Z"
  //                   fill={response.currentUserLike == 0 ? "#7F7F7F" : "#FF0000"}
  //                 />
  //               </svg>
  //             </div>
  //             |
  //             <div className="cursor-pointer flex justify-evenly h-full w-[50%] items-center">
  //               <span className="max-[782px]:text-[1.2vw] max-[493px]:text-[1.4vw]">{response.dissLikeCount}</span>
  //               <svg
  //                 onClick={() => {
  //                   response.currentUserDissLike != 0
  //                     ? delLikeNews2()
  //                     : setNewsDissLike();
  //                 }}
  //                 width="3vw"
  //                 height="3vwy"
  //                 viewBox="0 0 29 25"
  //                 fill="none"
  //                 xmlns="http://www.w3.org/2000/svg"
  //               >
  //                 <path
  //                   d="M28.2215 11.2368L27.4056 5.45041C26.9912 2.6042 24.558 0.488758 21.6818 0.474121H6.29022C3.09611 0.477947 0.507732 3.06636 0.503906 6.2605V12.0469C0.507732 15.241 3.09611 17.8294 6.29022 17.8332H9.42872L11.6437 22.3212C12.4134 23.8845 14.2123 24.6479 15.8714 24.1152C17.5305 23.5824 18.5488 21.9144 18.2644 20.1952L17.8756 17.8332H22.4919C24.1682 17.8332 25.7619 17.1065 26.8609 15.8411C27.9597 14.576 28.4562 12.8963 28.2215 11.2368ZM6.29022 2.78867H8.60475V15.5187H6.29022C4.37281 15.5187 2.81843 13.9643 2.81843 12.0469V6.2605C2.81843 4.34306 4.3728 2.78867 6.29022 2.78867ZM25.1119 14.3244C24.4526 15.083 23.4969 15.5186 22.4919 15.5187H16.5123C16.1724 15.5187 15.8498 15.668 15.6299 15.927C15.4101 16.1857 15.3151 16.5282 15.3701 16.8635L15.9811 20.5667C16.0406 20.9148 15.9417 21.2712 15.7115 21.5388C15.4411 21.8304 15.0471 21.9743 14.6524 21.9257C14.2577 21.8771 13.9103 21.6419 13.7187 21.2935L11.1854 16.1645C11.1186 16.0362 11.0283 15.9216 10.9193 15.8265V2.78867H21.6818C23.4094 2.79498 24.8717 4.06577 25.1189 5.7756L25.9359 11.562C26.0746 12.5587 25.774 13.5665 25.1119 14.3244Z"
  //                   fill={
  //                     response.currentUserDissLike == 0 ? "#7F7F7F" : "#FF0000"
  //                   }
  //                 />
  //               </svg>
  //             </div>
  //           </div>
  //           <svg
  //             className="mr-[2vw] cursor-pointer w-[2vw] h-[2vw]"
  //             xmlns="http://www.w3.org/2000/svg"
  //             viewBox="0 0 24 24"
  //             fill={response.isUserFavorite ? '#FF0000' : 'none'}
  //             stroke={response.isUserFavorite ? '#FF0000' : '#000'}
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             onClick={() => mutation.mutate(id)}
  //           >
  //             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  //           </svg>

  //           <RatingStar id={id} />
  //         </div> 
  //       </div>

  //       <CoursePreviwe0 response={response} CorseReserve={CorseReserveF} id={id} />

        // <div className="w-full rounded-[1vw] p-[1vw] mt-[2.71vw]">
        //   <CourseMenu handelPage={handelPage} />
        //   <div className="w-full p-[1vw]">
        //     <div className={`w-full  h-full py-[4vw] text-right md:leading-[2.5vw] text-[2vw] leading-5 md:text-[0.9vw] ${detailPage === 0 ? "block" : "hidden"}`}>
        //       {response.describe}
        //     </div>
        //     <div className={`w-full h-full bg-blue-700 ${detailPage === 1 ? "block" : "hidden"}`}></div>
        //     <div className={`w-full h-full bg-gray-100 text-[1.5vw] ${detailPage === 2 ? "block" : "hidden"}`}>
        //       این قابلیت در حال حاضر موجود نیست !!
        //     </div>
        //     <div className={`w-full h-full ${detailPage === 3 ? "block" : "hidden"}`}>
        //       <div onClick={() => { setRepleyModal(true); window.scrollTo({ top: 780, behavior: 'smooth' }) }} className="w-full rounded-[0.5vw] h-[3vw] text-[1.5vw] bg-gray-300 cursor-pointer">
        //         ثبت نظر
        //       </div>
        //       <div className={repleyModal ? "fixed z-10 top-0 left-0 h-full w-full bg-[#8a8a8a96] backdrop-blur-[3px] flex justify-center items-center" : "hidden"} onClick={() => setRepleyModal(false)}>
        //         <div className={repleyModal ? "h-max w-[90vw] max-w-[50vw] rounded-[1vw] bg-white z-40" : "hidden"} onClick={(e) => e.stopPropagation()}>
        //           <AddCommentForm onSubmit={onSubmit} newsId={id} parentId={null} onSubmit2={onSubmit2} setRepleyModal={setRepleyModal} />
        //         </div>
        //       </div>
        //       <CComment comment={comment} onSubmit={onSubmit} userId={userId} GetComment={GetComment} newsId={id} setNewsDissLikeComment={setNewsDissLikeComment} setNewsLikeComment={setNewsLikeComment} delLikeNews2Comment={delLikeNews2Comment} onSubmit2={onSubmit2} />
        //     </div>
        //     <div className={`w-full h-full bg-yellow-500 ${detailPage === 4 ? "block" : "hidden"}`}></div>
        //   </div>
        // </div>
      // </div>

  // );
  console.log(response);
//   capacity: 10
// ​
// commentCount: 25
// ​
// cost: 100000000
// ​
// courseGroupCount: 0
// ​
// courseId: "c79954bc-1f31-ef11-b6c8-c6ea51a59bbe"
// ​
// courseLevelName: "مبتدی"
// ​
// courseReseveId: "00000000-0000-0000-0000-000000000000"
// ​
// courseStatusName: "شروع ثبت نام"
// ​
// currentRate: 0
// ​
// currentRegistrants: 0
// ​
// currentUserDissLike: "0"
// ​
// currentUserLike: "1"
// ​
// currentUserRateNumber: 60
// ​
// currentUserSetRate: true
// ​
// describe: "xzzzzzzzzzzzzzzzzzzzzzzzzz"
// ​
// dissLikeCount: 3
// ​
// endTime: "2024-07-06T00:00:00"
// ​
// googleSchema: null
// ​
// googleTitle: null
// ​
// imageAddress: "testimg"
// ​
// insertDate: "2024-06-23T08:46:25.517"
// ​
// isCourseReseve: "0"
// ​
// isCourseUser: "0"
// ​
// isUserFavorite: false
// ​
// likeCount: 11
// ​
// miniDescribe: "dsdsdsdsds"
// ​
// startTime: "2024-06-25T00:00:00"
// ​
// teacherId: 13
// ​
// teacherName: "MMM Sadaty"
// ​
// techs: Array [ "ّفرانت اند" ]
// ​
// title: "این یک تست است"
// ​
// uniqeUrlString: "655d96b9-dcbe-4de4-9e0f-e49086"
// ​
// userFavoriteId: "00000000-0000-0000-0000-000000000000"
// ​
// userLikeId: "55e96b41-a98b-ef11-b6e0-cc9c195ebe36"
  return (
    <div className="max-[688px]:mt-10  w-full max-[688px]:flex-row flex   flex-wrap flex-col gap-5">
      <div
        style={{ background: dark.bgHigh, color: dark.textHigh }}
        className="w-[100%]   rounded-lg h-auto  flex flex-col items-start gap-4 "
      >
        <h1 className="max-[688px]:hidden text-right m-[1rem_2rem_0_0]    h-fit font-bold  text-3xl">
          {response.title}
        </h1>
        <span className="max-[688px]:hidden text-right m-[1rem_2rem_0_0]    h-fit  text-sm">
          نام مدرس : {response.teacherName}
        </span>
        <div className="max-custom6:gap-5 max-[1051px]:gap-0 /*end responsive */ flex max-[688px]:flex-col max-[688px]:items-end max-[688px]:justify-between w-full  gap-16">
          <div className=" flex flex-row max-[688px]:flex-col items-center">
            <CoursePreviwe0
              response={response}
              CorseReserve={CorseReserveF}
              id={id}
              className="max-[688px]:hidden w-64 h-11 mr-5 academyH1"
            />
            <div className="max-[688px]:hidden max-[1440px]:mr-64 max-[1325px]:mr-52 max-[1273px]:mr-32 max-[1181px]:mr-16 max-[1051px]:mr-10 max-[991px]:mr-0  max-[945px]:w-52 max-[883px]:w-32 max-[788px]:absolute max-[788px]:top-16 max-[788px]:right-32 /*end responsive */ flex justify-center mr-80  w-64 h-32 items-center gap-2">
              <div className="   text-2xl price">{response.cost}</div>
              <img
                src="../../../../../public/images/icon/toman.png"
                className="w-5 h-5"
                alt=""
              />
            </div>
          </div>
          <img
            onError={(e) => {
              e.target.src = noImg;
            }}
            src={response.imageAddress ? response.imageAddress : noImg}
            className="max-[788px]:mr-10 max-[688px]:w-full w-64   mt-[-2rem]  h-64 rounded-lg"
            alt=""
          />
          <h1 className="max-[688px]:block hidden text-center m-[1rem_auto]  border-blue-600  h-fit font-bold  text-3xl">
            {response.title}
          </h1>
          <CoursePreviwe0
            response={response}
            CorseReserve={CorseReserveF}
            id={id}
            className="max-[688px]:flex hidden max-[688px]:m-[1rem_auto] w-64 h-11 mr-5"
          />

          <div className=" max-[688px]:flex hidden max-[688px]:h-0 /*end responsive */  justify-center    m-[1rem_auto] items-center gap-2">
            <button className="   text-2xl price">{response.cost}</button>
            <img
              src="../../../../../public/images/icon/toman.png"
              className="w-5 h-5"
              alt=""
            />
          </div>
          <span className="hidden max-[688px]:block  text-right m-[1rem_auto]    h-fit  t text-sm">
            نام مدرس : {response.teacherName}
          </span>
        </div>
        <div className="border-t border-t-[#ccc] flex flex-wrap justify-center items-center gap-4 md:gap-10 lg:gap-16 min-h-16 p-2 w-full">
          <div className="flex justify-center items-center gap-2 ">
            <FaChalkboardTeacher color="gray" />
            <span>استاد دوره :</span>
            <span>{response.teacherName}</span>
          </div>
          <div className="flex justify-center items-center gap-2 ">
            <FaRegPlayCircle color="gray" />
            <span> وضعیت دوره :</span>
            <span>{response.courseStatusName}</span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <PiStudent color="gray" />
            <span>تعداد دانشجویان :</span>
            <span>{response.capacity}</span>
          </div>
          <div className="flex justify-center items-center gap-2 ">
            <IoTimeOutline color="gray" />
            <span> زمان شروع دوره :</span>
            <span>{convertToJalali(response.startTime)}</span>
          </div>
          <div className="flex justify-center items-center gap-2 ">
            <IoTimeOutline color="gray" />
            <span> زمان پایان دوره :</span>
            <span>{convertToJalali(response.endTime)}</span>
          </div>
        </div>
      </div>
      <div className="flex w-[100%] flex-col md:flex-row gap-16 flex-wrap justify-between items-start">
        <div className="w-[100%] md:w-[65%] flex-grow">
          <CourseMenu handelPage={handelPage} />
          <div className="w-full p-[1vw] ">
            <div
              style={{ background: dark.bgHigh, color: dark.textLow }}
              className={` p-5 rounded-lg w-full max-h-[500px] overflow-auto text-right md:leading-[2.5vw] text-[2vw] leading-5 md:text-[0.9vw] ${
                detailPage === 0 ? "block" : "hidden"
              }`}
            >
              <h2 className="academyH1 text-2xl m-2">توضیحات دوره</h2>
              {response.describe}
            </div>
            <div
              className={`w-full h-full bg-blue-700 ${
                detailPage === 1 ? "block" : "hidden"
              }`}
            ></div>
            <div
              className={`w-full h-full ${
                detailPage === 2 ? "block" : "hidden"
              }`}
            >
              <div
                onClick={() => {
                  setRepleyModal(true);
                  window.scrollTo({ top: 780, behavior: "smooth" });
                }}
                style={{ background: dark.bgHigh, color: dark.textHigh }}
                className="w-full rounded-[0.5vw] h-[3vw] text-[1.5vw] max-md:text-[18px] max-md:h-[30px]  cursor-pointer"
              >
                ثبت نظر
              </div>
              <div
                className={
                  repleyModal
                    ? "fixed z-10 top-0 left-0 h-full w-full bg-[#8a8a8a96] backdrop-blur-[3px] flex justify-center items-center"
                    : "hidden"
                }
                onClick={() => setRepleyModal(false)}
              >
                <div
                  style={{ background: dark.bgLow, color: dark.textHigh }}
                  className={
                    repleyModal
                      ? "max-md:w-full max-md:max-w-full max-md:h-[50%] h-max w-[90vw] max-w-[50vw] rounded-[1vw]  z-40"
                      : "hidden"
                  }
                  onClick={(e) => e.stopPropagation()}
                >
                  <AddCommentForm
                    onSubmit={onSubmit}
                    newsId={id}
                    parentId={null}
                    onSubmit2={onSubmit2}
                    setRepleyModal={setRepleyModal}
                  />
                </div>
              </div>
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
                detailPage === 4 ? "block" : "hidden"
              }`}
            ></div>
          </div>
        </div>

        <div className="w-full md:w-[30%] h-12  flex flex-col gap-4">
          <div
            className="academyH1 rounded-lg shadow-[-0.26vw_0.26vw_0.26vw_0_rgba(0,0,0,0.1)]  h-auto"
            style={{ background: dark.bgHigh, color: dark.textLow }}
          >
            <div className="flex gap-2 justify-center items-center">
              <span className="leading-[4rem] ml-8">
                آیا این دوره مورد پسند شماست؟
              </span>
              <div className="flex flex-row gap-1 justify-center items-center">
                <span>{response.likeCount}</span>
                <BiLike
                  onClick={() => {
                    response.currentUserLike != 0
                      ? delLikeNews2()
                      : setNewsLike();
                  }}
                  color={response.currentUserLike == 0 ? "black" : "blue"}
                  className="cursor-pointer"
                  size={"25px"}
                />
              </div>
              <div className="flex flex-row gap-1 justify-center items-center">
                <span>{response.dissLikeCount}</span>
                <BiDislike
                  onClick={() => {
                    response.currentUserDissLike != 0
                      ? delLikeNews2()
                      : setNewsDissLike();
                  }}
                  color={response.currentUserDissLike == 0 ? "black" : "blue"}
                  className="cursor-pointer"
                  size={"25px"}
                />
              </div>
            </div>
          </div>

          <div
            style={{ background: dark.bgHigh, color: dark.textLow }}
            className="academyH1 rounded-lg shadow-[-0.26vw_0.26vw_0.26vw_0_rgba(0,0,0,0.1)]  h-auto"
          >
            <div
              onClick={() => mutation.mutate(id)}
              className={`flex cursor-pointer gap-2 justify-center items-center rounded-lg transition-all duration-150 ${
                response.isUserFavorite ? "bg-red-600 text-white" : "none"
              }`}
            >
              <IoCalendarNumber size={"20px"} />
              <span className="leading-[4rem]">
                {response.isUserFavorite
                  ? "حذف از لیست علاقه مندی ها"
                  : "افزودن به لیست علاقه مندی ها"}
              </span>
            </div>
          </div>
          <div
            style={{ background: dark.bgHigh, color: dark.textLow }}
            className="academyH1 rounded-lg shadow-[-0.26vw_0.26vw_0.26vw_0_rgba(0,0,0,0.1)]  h-auto"
          >
            <div
              className={`flex cursor-pointer gap-2 justify-center items-center rounded-lg transition-all duration-150`}
            >
              <span className="leading-[4rem] ml-8">
                چه امتیازی به این دوره میدهید؟
              </span>
              <RatingStar id={id} />
            </div>
          </div>
          <div
            style={{ background: dark.bgHigh, color: dark.textLow }}
            className="academyH1 rounded-lg shadow-[-0.26vw_0.26vw_0.26vw_0_rgba(0,0,0,0.1)]  h-auto"
          >
            <div
              className={`flex cursor-pointer gap-2 justify-center items-center flex-col p-2 rounded-lg transition-all duration-150`}
            >
              <span className="leading-[4rem] ml-8">دسته بندی های مرتبط</span>
              <div>
                {response.techs && response.techs.length > 0 ? (
                  response.techs.map((item, index) => (
                    <Button
                      style={{ background: dark.bgLow, color: dark.textHigh }}
                      color="default"
                      key={index}
                      item={item}
                    >
                      # {item}
                    </Button>
                  ))
                ) : (
                  <div>دسته بندی وجود ندارد</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}


export default CourseCard;

