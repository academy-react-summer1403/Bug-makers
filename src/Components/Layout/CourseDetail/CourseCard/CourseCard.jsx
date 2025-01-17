import React, { createContext, useEffect, useState } from "react";
import CourseStatus from "../Commen/CoursePreviwe";
import CoursePreviwe0 from "../Commen/CoursePreviwe0";
import RatingStar from "../Commen/RatingStar";
import toast from "react-hot-toast";
import CourseMenu from "../Commen/CourseMenu";
import Swal from "sweetalert2";
import noImg from "../../../../../public/images/icon/image.jpg";
import { FaChalkboardTeacher, FaPlus } from "react-icons/fa";
import { FaRegPlayCircle } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { IoCalendarNumber, IoTimeOutline } from "react-icons/io5";
import { BiChevronDown, BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import {
  delLikeNews,
  getCourseDetail,
  getCourseDetailComment,
  postDissLikeNews,
  postLikeNews,
  CorseReserve,
  deleteCorseReserve,
  getScDetail,
  getDiscount,
  getCourseDetailAdmin,
  CorseAB,
  getCourseHomeWork,
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
import { useMutation, useQuery } from "react-query";
import { AddCourseFavorite } from "../../../../Core/Services/Api/CourseDetail/AddCourseFavorite";
import { deleteCourseFavorite } from "../../../../Core/Services/Api/CourseDetail/deleteCourseFavorite";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardHeader, Input } from "@nextui-org/react";
import { useSelector } from "react-redux";
import convertToJalali from "../../../Common/TimeChanger/TimeToShamsi";
import { RiUserVoiceLine } from "react-icons/ri";
import DataTable from "react-data-table-component";
import { getCourseVideo } from "../../../../Core/Services/Api/CourseDetail/video";
import VideoAccordion from "../Commen/video";
import { Skeleton } from "@mui/material";
function CourseCard({ id }) {
    const dark = useSelector((state) => state.darkMood);

  const [response, setResponse] = useState({});
  const [responseAdmin, setResponseAdmin] = useState({});
  const [homeWork, setHomeWork] = useState([]);
  const [comment, setComment] = useState({});
  const [detailPage, setDetailPage] = useState(0);
  const [repleyModal, setRepleyModal] = useState(false);
  const [present,setPresent]=useState(false)
  const [time, setTime] = useState();
  const userId = getItem("userId");
  const navigate = useNavigate()
  const NewsId = id;
  const handelPage = (value) => {
    setDetailPage(value);
  };

  // video url 
  
  
  const {data : videoData} = useQuery({
    queryKey:['getVideo'],
    queryFn: getCourseVideo
  })
  const filterData = videoData?.find((el) => el.courseId === id)


  const [discount, setDiscount] = useState();
  const {
    isLoading: isLoad,
    error: err,
    data: data2,
  } = useQuery({
    queryKey: ["getDiscountDetail"],
    queryFn: () => getDiscount(id),
    retry: false,
    onSuccess: (data) => {
      setDiscount(data.data.data||[])
      if(data.data.data == null ){
        setDiscount(false);
      }
      console.log(data.data.data||[]);
    },
  });
const GetId = async () => {
    const res = await getCourseDetail(id);
    const res2 = await getCourseDetailAdmin(id)
    setResponseAdmin(res2)
    setResponse(res);
    GetHomework(res2?.courseSchedules[0].id);
  };
  const GetComment = async () => {
    const re = await getCourseDetailComment(id);
    setComment(re);
  };
  const GetHomework = async (id)=>{
    const res = await getCourseHomeWork(id);
    setHomeWork(res)
  }
  useEffect(() => {
    GetId();
    GetComment();
    
  }, []);

  const { isLoading, error, data } = useQuery({
    queryKey: ["getscazholDetail"],
    queryFn: () => getScDetail(id),
    enabled: !!id,
    onSuccess: (data) => {
      setTime(data || []);
    },
  });

  useEffect(() => {
    response.isCourseReseve ==0 ? handelPage(0):null
  }, [response.isCourseReseve]);
  const CorseReserveF = useMutation({
    mutationFn: async (id) => {
      return response.isCourseReseve == 1
        ? await deleteCorseReserve(response.courseReseveId)
        : await CorseReserve({ courseId: id });
    },
    onSuccess: (data) => {
      GetId();

      if (data.success) {
        const message =
          response.isCourseReseve == 1
            ? "دوره " + "(" + response.title + ")" + "از رزرو حذف شد 🥳"
            : "دوره " + "(" + response.title + ")" + "رزرو شد 🥳";

        toast.custom((t) => (
          <div
            className={`flex items-center justify-between p-4 bg-[#FFFFFF] text-black rounded-lg shadow-md transition-opacity duration-300 ${
              t.visible ? "opacity-100" : "opacity-0"
            }`}
          >
            <span>{message}</span>
            <Button
              onClick={() => {
                toast.dismiss(t.id);
                navigate("../../ClientPanel/MyReserve");
              }}
              className="  text-green-500 ml-2 "
              style={{ background: dark.bgHigh}}
            >
              مشاهده
            </Button>
          </div>
        ));

        setResponse((prev) => ({
          ...prev,
          isCourseReseve: prev.isCourseReseve === 1 ? 0 : 1,
        }));
      }
    },
  });

  
  const setNewsDissLike = async () => {
    const res = await postDissLikeNews(id);
    toast.success(" دیس لایک شد 😁");

    GetId();
  };
  const setNewsLike = async () => {
    const res = await postLikeNews(id);
    toast.success("لایک شد 😁");
    GetId();
  };

  const delLikeNews2 = async () => {
    const res = await delLikeNews(response.userLikeId);
    toast.success("نظر شما با موفقییت حذف شد 😁");
    GetId();
  };

  const onSubmit = async (val) => {
    const res = await setCourseRepleyComment(val);
    res.success
      ? toast.success("نظر قشنگت ثبت شد، بعد از تایید ادمین نمایش داده میشه 😉")
      : "";
  };

  const onSubmit2 = async (val) => {
    const res = await setCourseComment(val);
    res.success
      ? toast.success("نظر قشنگت ثبت شد، بعد از تایید ادمین نمایش داده میشه 😉")
      : "";
  };

  // comment .............................................

  const setNewsDissLikeComment = async (id) => {
    const res = await commentDissLikeCourse(id, false);
    toast.success(" دیس لایک شد 😁");

    GetComment();
  };
  const setNewsLikeComment = async (id) => {
    const res = await commentLikeCourse(id, true);
    toast.success("لایک شد 😁");
    GetComment();
  };

  const delLikeNews2Comment = async (currentUserLikeId) => {
    console.log(currentUserLikeId);
    const res = await comentDelLikeCourse(currentUserLikeId);
    // toast.success("نظر شما با موفقییت حذف شد 😁");

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
          ? "دوره " + "(" + response.title + ")" + " از علاقه‌مندی‌ها حذف شد"
          : "دوره " + "(" + response.title + ")" + " به علاقه‌مندی‌ها اضافه شد";

        toast.success(message);
        GetId();
      }
    },
    mutationKey: ["toggleFavorite", response.isUserFavorite ? "delete" : "add"],
  });
  const synth = window.speechSynthesis;
  function Voice(voiceText) {
    let text = response.describe;
    const utterThis = new SpeechSynthesisUtterance(voiceText);
    synth.lang = "fa-IR";
    synth.speak(utterThis);

    // console.log(myRef)
  }

  const columnsSchedual = [
    {
      name: "آیدی گروه ",
      selector: (row) => row.courseGroupId,
      sortable: true,
    },
    {
      name: "ساعت شروع ",
      selector: (row) => row.startTime,
      sortable: true,
    },
    {
      name: "ساعت پایان",
      selector: (row) => row.endTime,
      sortable: true,
    },
    {
      name: "تعداد در هفته ",
      selector: (row) => row.weekNumber,
      sortable: true,
    },
    {
      name: "روز دوره",
      selector: (row) => convertToJalali(row.startDate),
      sortable: true,
    },
  ];
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("فایل انتخاب شده:", file.name);
    }
  };

  const setAbsent=()=>{
    setPresent(false),toast.success("😊غیبتت ثبت شد")
  }
  const setPre=()=>{
    setPresent(true);
    toast.success("😁حضورت ثبت شد");
  }
  const PresenceContext= async (val)=>{
    const res = await CorseAB({id:id,val:val})
    console.log(res)
    val == true ? present == true ? toast.error("بسه خب فهمیدم حاضری😒"):setPre():present==false ? toast.error("چرا انقد به غیبت اصرار داری 🧐"):setAbsent()


  }


  

  return (
    <div className="max-[688px]:mt-10  w-full max-[688px]:flex-row flex   flex-wrap flex-col gap-5">
      <div
        style={{ background: dark.bgHigh, color: dark.textHigh }}
        className="w-[100%]   rounded-lg h-auto  flex flex-col items-start gap-4 "
      >
        <h1 className="max-[688px]:hidden text-right m-[1rem_2rem_0_0]    h-fit font-bold  text-3xl">
          {response.title ? (
            response.title
          ) : (
            <Skeleton height={`100%`} width={`200px`} />
          )}
        </h1>
        <span className="max-[688px]:hidden text-right m-[1rem_2rem_0_0]    h-fit  text-sm">
          نام مدرس :{" "}
          {response.teacherName ? (
            response.teacherName
          ) : (
            <Skeleton height={`100%`} width={`150px`} />
          )}
        </span>
        <div className="max-custom6:gap-5 max-[1051px]:gap-0 /*end responsive */ flex max-[688px]:flex-col max-[688px]:items-end max-[688px]:justify-between w-full  gap-16">
          <div className=" flex flex-row max-[688px]:flex-col items-center">
            <CoursePreviwe0
              response={response}
              CorseReserve={CorseReserveF}
              id={id}
              className="max-[688px]:hidden w-64 h-11 mr-5 academyH1"
            />
            <div className="max-[688px]:hidden ml-6 justify-end max-[1440px]:mr-64 max-[1325px]:mr-52 max-[1273px]:mr-32 max-[1181px]:mr-16 max-[1051px]:mr-10 max-[991px]:mr-0  max-[945px]:w-52 max-[883px]:w-32 max-[788px]:absolute max-[788px]:top-16 max-[788px]:right-32 /*end responsive */ flex  mr-80 w-64 h-32 items-center gap-2">
              <div className="   text-2xl price">
                {!discount ? (
                  response.cost ? (
                    response.cost
                  ) : (
                    <Skeleton height={`100%`} width={`150px`} />
                  )
                ) : (
                  discount.Pcost
                )}
              </div>
              <img
                src="../../../../../public/images/icon/toman.png"
                className="w-5 h-5"
                alt=""
              />
            </div>

            {discount ? (
              <div className="flex w-[10%] max-md:hidden justify-between">
                <h3 className="text-[14px] block line-through decoration-[1.5px]	decoration-gray-500 text-[#f3aeae]  price">
                  {discount.Tcost ? (
                    discount.Tcost
                  ) : (
                    <Skeleton height={`100%`} width={`100px`} />
                  )}
                </h3>
                <div className="size-[22px] text-center leading-[20px] rounded-full bg-red-500 text-[10px] text-white">
                  {discount.discount ? (
                    discount.discount
                  ) : (
                    <Skeleton height={`100%`} width={`100px`} />
                  )}
                  %
                </div>
              </div>
            ) : null}
          </div>
          <img
            onError={(e) => {
              e.target.src = noImg;
            }}
            src={response.imageAddress ? response.imageAddress : noImg}
            className="max-[788px]:mr-10 max-[688px]:w-full w-96   mt-[-2rem]  h-64 rounded-lg"
            alt=""
          />
          <h1 className="max-[688px]:block hidden text-center m-[1rem_auto]  border-blue-600  h-fit font-bold  text-3xl">
            {response.title ? (
              response.title
            ) : (
              <Skeleton height={`100%`} width={`100px`} />
            )}
          </h1>
          <CoursePreviwe0
            response={response}
            CorseReserve={CorseReserveF}
            id={id}
            className="max-[688px]:flex hidden max-[688px]:m-[1rem_auto] w-64 h-11 mr-5"
          />

          <div className=" max-[688px]:flex hidden max-[688px]:h-0 /*end responsive */  justify-center    m-[1rem_auto] items-center gap-2">
            <button className="   text-2xl price">
              {!discount ? (
                response.cost ? (
                  response.cost
                ) : (
                  <Skeleton height={`100%`} width={`100px`} />
                )
              ) : (
                discount.Pcost
              )}
            </button>
            <img
              src="../../../../../public/images/icon/toman.png"
              className="w-5 h-5"
              alt=""
            />
          </div>
          {discount ? (
            <div className="mx-auto max-md:flex  hidden  w-[25%] justify-between">
              <h3 className="text-[14px] block line-through decoration-[1.5px]	decoration-gray-500 text-[#f3aeae]  price">
                {discount.Tcost ? (
                  discount.Tcost
                ) : (
                  <Skeleton height={`100%`} width={`100px`} />
                )}
              </h3>
              <div className="size-[22px] text-center leading-[20px] rounded-full bg-red-500 text-[10px] text-white">
                {discount.discount ? (
                  discount.discount
                ) : (
                  <Skeleton height={`100%`} width={`100px`} />
                )}
                %
              </div>
            </div>
          ) : null}
          <span className="hidden max-[688px]:block  text-right m-[1rem_auto]    h-fit  t text-sm">
            نام مدرس :{" "}
            {response.teacherName ? (
              response.teacherName
            ) : (
              <Skeleton height={`100%`} width={`100px`} />
            )}
          </span>
        </div>
        <div className="border-t border-t-[#ccc] flex flex-wrap justify-center items-center gap-4 md:gap-10 lg:gap-16 min-h-16 p-2 w-full">
          <div className="flex justify-center items-center gap-2 ">
            <FaChalkboardTeacher color="gray" />
            <span>استاد دوره :</span>
            {response.teacherName ? (
              <span>{response.teacherName}</span>
            ) : (
              <Skeleton height={`100%`} width={`100px`} />
            )}
          </div>
          <div className="flex justify-center items-center gap-2 ">
            <FaRegPlayCircle color="gray" />
            <span> وضعیت دوره :</span>
            {response.courseStatusName ? (
              <span>{response.courseStatusName}</span>
            ) : (
              <Skeleton height={`100%`} width={`100px`} />
            )}
          </div>
          <div className="flex justify-center items-center gap-2">
            <PiStudent color="gray" />
            <span>تعداد دانشجویان :</span>
            {response.capacity ? (
              <span>{response.capacity}</span>
            ) : (
              <Skeleton height={`100%`} width={`100px`} />
            )}
          </div>
          <div className="flex justify-center items-center gap-2 ">
            <IoTimeOutline color="gray" />
            <span> زمان شروع دوره :</span>
            {response.startTime ? (
              <span>{convertToJalali(response.startTime)}</span>
            ) : (
              <Skeleton height={`100%`} width={`100px`} />
            )}
          </div>
          <div className="flex justify-center items-center gap-2 ">
            <IoTimeOutline color="gray" />
            <span> زمان پایان دوره :</span>
            {response.endTime ? (
              <span>{convertToJalali(response.endTime)}</span>
            ) : (
              <Skeleton height={`100%`} width={`100px`} />
            )}
          </div>
        </div>
      </div>
      <div className="flex w-[100%] flex-col md:flex-row gap-16 flex-wrap justify-between items-start">
        <div className="w-[100%] md:w-[65%] flex-grow">
          <CourseMenu
            handelPage={handelPage}
            isCourseReseve={response.isCourseReseve}
          />
          <div className="w-full py-3 rounded-xl overflow-hidden ">
            <div
              style={{ background: dark.bgHigh, color: dark.textLow }}
              className={` p-5 rounded-lg w-full max-md:text-sm max-h-[500px] overflow-auto text-right md:leading-[2.5vw] text-[2vw] leading-5 md:text-[0.9vw] ${
                detailPage === 0 ? "block" : "hidden"
              }`}
            >
              <div className="academyH1 flex justify-between text-2xl  m-2">
                <span className="max-md:text-lg"> توضیحات دوره</span>

                <RiUserVoiceLine
                  className="cursor-pointer"
                  onClick={() => {
                    Voice(response.describe);
                  }}
                />
              </div>
              {response.describe ? (
                response.describe
              ) : (
                <div className="">
                  <Skeleton height={40} width={`60%`} />
                  <Skeleton height={40} width={`80%`} />
                </div>
              )}
            </div>
            <div
              style={{ background: dark.bgHigh, color: dark.textHigh }}
              className={`w-full rounded-2xl h-full ${
                detailPage === 1 ? "block" : "hidden"
              }
              `}
            >
              <Card
                style={{ background: dark.bgHigh, color: dark.textLow }}
                className="w-full"
              >
                <CardHeader tag="h4">بازه های زمانی این دوره</CardHeader>
                <div className="react-dataTable user-view-account-projects">
                  <DataTable
                    noHeader
                    responsive
                    pagination
                    columns={columnsSchedual}
                    data={responseAdmin?.courseSchedules || []}
                    className="react-dataTable"
                    sortIcon={<BiChevronDown size={10} />}
                    theme={dark.bgHigh == "#ffffff" ? "light" : "dark"}
                  />
                </div>
              </Card>
            </div>
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
                className="w-full mt-5 rounded-[0.5vw] h-[3vw] text-[1.5vw] max-md:text-[18px] max-md:h-[30px]  cursor-pointer"
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
              style={{ background: dark.bgHigh, color: dark.textLow }}
              className={`w-full h-full  rounded-xl${
                detailPage === 3 ? "block" : "hidden"
              }`}
            >
              {filterData ? (
                detailPage === 3  ? (<VideoAccordion data={filterData} />) : null
              ) : detailPage === 3 ? (
                <div className="p-8 rounded-xl">
                  {" "}
                  ویدیویی برای این دوره وجود ندارد
                </div>
              ) : null}
            </div>
            <div
              style={{ background: dark.bgHigh, color: dark.textHigh }}
              className={`w-full py-3 rounded-xl h-full ${
                detailPage === 4 && response.isCourseReseve == 1
                  ? "block"
                  : "hidden"
              }
              `}
            >
              <span className=" text-right text-[18px]">تکلیف روز</span>
              <br />
              {homeWork?.map((ithem) => (
                <div
                  key={ithem.id}
                  className="text-center py-3 px-6  mt-8 max-md:flex-col flex justify-between items-center"
                >
                  {/* دکمه سفارشی برای انتخاب فایل */}
                  <div className="h-full max-md:w-full w-[60%] flex flex-col justify-between items-start">
                    <span>{ithem.hwTitle}</span>
                    <span>{ithem.hwDescribe}</span>
                  </div>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div
                      className={`w-[100%] max-md:w-[100%] max-md:text-sm max-md:p-1 px-6 py-3 text-white text-sm font-medium rounded-lg shadow-md duration-400 transition-all hover:bg-gray-600 
                      ${dark.selectedButton === 0 ? "bg-blue-600" : ""} 
                      ${dark.selectedButton === 1 ? "bg-green-600" : ""} 
                      ${dark.selectedButton === 2 ? "bg-yellow-600" : ""}
                      ${dark.selectedButton === 3 ? "bg-red-600" : ""}
                      
                      `}
                    >
                      انتخاب فایل
                    </div>
                  </label>

                  {/* ورودی فایل مخفی */}
                  <input
                    id="file-upload" // id باید با htmlFor مطابقت داشته باشد
                    type="file"
                    accept="*/*"
                    onChange={handleFileChange}
                    className="hidden" // مخفی کردن ورودی فایل
                  />
                </div>
              ))}
            </div>
            <div
              style={{ background: dark.bgHigh, color: dark.textHigh }}
              className={`w-full h-full py-5 rounded-xl ${
                detailPage === 5 && response.isCourseReseve == 1
                  ? "block"
                  : "hidden"
              }
              `}
            >
              <span className="block text-[20px] mb-5">حضور غیاب</span>
              <div className="p-5 w-full flex justify-between max-md:flex-col max-md:gap-y-4 items-center">
                <span className="text-[16px]">حضور داری؟!</span>
                <div className="w-[30%] max-md:w-full text-white flex justify-evenly max-md:justify-between">
                  <Button
                    onClick={() => {
                      PresenceContext(true);
                    }}
                    className="w-[45%] text-white "
                    color="success"
                  >
                    حاضرم
                  </Button>
                  <Button
                    onClick={() => {
                      PresenceContext(false);
                    }}
                    className="w-[45%]"
                    color="danger"
                  >
                    غایبم
                  </Button>
                </div>
              </div>
            </div>
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
              {response.currentUserLike ? (
                <>
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
                      color={
                        response.currentUserDissLike == 0 ? "black" : "blue"
                      }
                      className="cursor-pointer"
                      size={"25px"}
                    />
                  </div>
                </>
              ) : (
                <div className="flex w-[100px] justify-between items-center">
                  <Skeleton circle={true} height={40} width={40} />
                  <Skeleton circle={true} height={40} width={40} />
                </div>
              )}
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
              className={`flex max-md:flex-col max-md:h-[100px] cursor-pointer gap-2 justify-center items-center rounded-lg transition-all duration-150`}
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
