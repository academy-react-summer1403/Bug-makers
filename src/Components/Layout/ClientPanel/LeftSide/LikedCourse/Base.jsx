import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Tooltip } from "@nextui-org/react";
import CourseCard from "../../../CourseDetail/CourseCard/CourseCard";
import { getCourseDetail } from "../../../../../Core/Services/Api/CourseDetail/CourseDetail";
import CourseItem from "./CorseItem/CourseItem";
import convertToJalali from "../../../../Common/TimeChanger/TimeToShamsi";
import { getCourseServ, getLikedCourse, getLikedNews } from "../../../../../Core/Services/Api/Client/clientLiked";
import { delBlogFav, delCourseFav, delCourseServ } from "../../../../../Core/Services/Api/Client/Delete";

import { getBlogDetail } from "../../../../../Core/Services/Api/BlogDetail/BlogDetail";
import BlogIthem from "../LikedBlog/CorseItem/BlogIthem";
import DeleteModal from "../../common/DeleteModal";
import { setFavoriteList } from "../../../../../Redux/Slice/Course/favoritee";
import toast from "react-hot-toast";
import SearchBox from "./SearchBox/SearchBox";
import { useQuery, useQueryClient } from "react-query";
import { Skeleton } from "@mui/material";
import CustomSkeleton from "../../../../Common/Sceleton/CostomeSceleton";



const CoursePage = ({location,name, show, itemPerpage, setShowMoreCourse }) => {
  const queryClient = useQueryClient();

 
  // stateForListStyle
  const [listStyle, setListStyle] = useState(false);

  const [response, setResponse] = useState([]);

  // course detail modal
  const [detailCourse, setDetailCourse] = useState(false);
  const [detail, setDetail] = useState();
  const [detailId, setDetailId] = useState(null);
  // delete box
  const [isDelete, setIsDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [queryValue, setQueryValue] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const [fun, setFun] = useState();
  const setIsDeleteFalse = () => {
    setIsDelete(false);
  };

  const itemsPerPage = itemPerpage;
  const dispatch = useDispatch();

  // getCourseListFromRedux
  const CourseListItem = useSelector((state) => state.favorite.favoriteList);

  // fetchCoursesWithFilters

  

  // const { data: NewsLike, isLoading: NewsLikeLoding } = useQuery({
  //   queryKey: ["GetLikeNews"],
  //   queryFn: getLikedNews,
  //   onSuccess: (data) => {
  //     setResponse(data.myFavoriteNews);
  //     setOriginalData(data.myFavoriteNews);
  //   },
  // });

  // const { data: CourseLike, isLoading: CourseLikeLoding } = useQuery({
  //     queryKey: ["GetCourseLike"],
  //     queryFn: getLikedCourse,
  //     onSuccess: (data) => {
  //       setResponse(data.favoriteCourseDto);
  //       setOriginalData(data.favoriteCourseDto);
  //     },
  //   });

  const {data:Course , isLoading :Loding }=useQuery({
      queryKey : ["GetCourseServ"],
      queryFn : ()=>{
      if (location == "BlogFav") {
        return getLikedNews();
      }
      if (location == "CourseFav") {
        return getLikedCourse();
      }
      if (location == "CourseServ") {
        return getCourseServ();
      }
      },
      onSuccess : (data)=>{
      if (location == "BlogFav") {
        setResponse(data.myFavoriteNews);
        setOriginalData(data.myFavoriteNews);
      }
      if (location == "CourseFav") {
        setResponse(data.favoriteCourseDto);
        setOriginalData(data.favoriteCourseDto);
      }
      if (location == "CourseServ") {
        setResponse(data);
        setOriginalData(data);
      }
        
        
        console.log(data)
      }
    })
// console.log(Course);

response ? dispatch(setFavoriteList(response)) : null


  const DeleteIthem = async (id) => {
    if (location == "BlogFav") {
      const res = await delBlogFav(id);
      queryClient.invalidateQueries("Course");
      toast.success("خبر مورد نظر با موفقیت حذف شد");
    }
    if (location == "CourseFav") {
      const res = await delCourseFav(id);
      queryClient.invalidateQueries("Course");
      toast.success("دوره مورد نظر با موفقیت حذف شد");
    }
    if (location == "CourseServ") {
      const res = await delCourseServ(id);
      queryClient.invalidateQueries("Course");
      res?.StatusCode == 200 ? toast.success("دوره مورد نظر با موفقیت حذف شد"):null
    }
    setIsDeleteFalse();
  };  
const fetchMoreDetail=(id)=>{
  const res = getCourseDetail(id)
  setResponse(res)
}




  useEffect(() => {
    
    const handleResize = () => {
      if (window.innerWidth <= 952) {
        setListStyle(false);
      } else {
        setListStyle(null);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // renderCourseItems
  
const handleSearch = (e) => {
  const value = e.target.value;
  setQueryValue(value);

  // اگر مقدار ورودی خالی باشد، داده‌های اصلی را بازگردان
  if (value === "") {
    setResponse(originalData); // `originalData` باید شامل داده‌های اصلی (غیرفیلتر شده) باشد
    return;
  }

  // در غیر این صورت، داده‌ها را بر اساس مقدار ورودی فیلتر کن
  const filterData = response?.filter((el) => {
    if (location == "BlogFav") {
      return el.title.toLowerCase().includes(value.toLowerCase());
    }
    if (location == "CourseServ") {
      return el.courseName.toLowerCase().includes(value.toLowerCase());
    }
    if (location == "CourseFav") {
      return el.courseTitle.toLowerCase().includes(value.toLowerCase());
    }
  });
setResponse(filterData);
};
    const [selectedStatus, setSelectedStatus] = useState(null);

    const handleSelect = (status) => {
      setSelectedStatus(status);
      const filterData = originalData.filter((el) => {
        if (status == "notApproved") {
          return el.accept == false;
        }
        if (status == "approved") {
          return el.accept == true;
        }
      });
      setResponse(filterData);
    };

     
const delfilter=()=>{
  setResponse(originalData);
  setQueryValue("")
  setSelectedStatus(null)
}
  const renderCourses = () => {
  
     
        
        
          if(response?.length > 0 ){
            return response?.map((course, index) => (
              <div
                key={index}
                style={{ background: dark.bgHigh, color: dark.textHigh }}
                className="w-full h-[3vw] max-md:justify-between max-md:border-b-1 max-md:h-[40px] rounded-[0.4vw] flex items-center text-[0.9vw]  hover:bg-gray-100"
              >
                <div
                  className={`w-[8%] max-md:hidden justify-center h-[90%] overflow-hidden rounded-lg bg
                  ${
                    dark.bgHigh == "#ffffff"
                      ? "bg-gradient-to-r from-blue-200 to-blue-50"
                      : "bg-gradient-to-r from-[#222] to-[#333] "
                  }
                  ${location == "BlogFav" ? "flex" : "hidden"}`}
                >
                  {course.currentImageAddressTumb != null ? (
                    <img
                      className=" h-full rounded-lg w-full"
                      src={course.currentImageAddressTumb}
                      alt=""
                    />
                  ) : null}
                </div>
                <div className="w-[16%] h-full  py-[1%] px-[1%] text-right whitespace-nowrap overflow-hidden text-ellipsis ... max-md:w-[30%] max-md:text-[14px]">
                  {course.courseTitle ? course.courseTitle : null}
                  {course.title ? course.title : null}
                  {course.courseName ? course.courseName : null}
                </div>
                <div
                  className={`max-md:hidden w-[32%] h-full py-[1%] px-[1%] text-right whitespace-nowrap overflow-hidden text-ellipsis ...
              ${location == "BlogFav" ? "hidden" : "block"}`}
                >
                  <Tooltip
                    className="text-gray-700  leading-[1.5vw]"
                    content={`${course.describe}`}
                  >
                    <span>{course.describe}</span>
                  </Tooltip>
                </div>
                <div
                  className={`max-md:hidden w-[50%] h-full py-[1%] px-[1%] text-right whitespace-nowrap overflow-hidden text-ellipsis ...
              ${location == "BlogFav" ? "block" : "hidden"}`}
                ></div>
                <div
                  className={`w-[16%] h-full max-md:w-[30%] max-md:text-[14px] py-[1%] px-[1%]  text-right whitespace-nowrap ${
                    location == "BlogFav" ? "hidden" : "block  "
                  }`}
                >
                  <Tooltip
                    className="text-gray-500 w-[200px]"
                    content={`استاد: ${course.teacheName}`}
                  >
                    {course.teacheName}
                  </Tooltip>
                </div>
                <div className="w-[16%] max-md:hidden h-full py-[1%] px-[1%] text-center whitespace-nowrap">
                  {course.lastUpdate
                    ? convertToJalali(course.lastUpdate)
                    : null}
                  {course.updateDate
                    ? convertToJalali(course.updateDate)
                    : null}
                  {course.reserverDate
                    ? convertToJalali(course.reserverDate)
                    : null}
                </div>
                <div
                  className={`max-md:w-[30%]  max-md:text-[14px] w-[12%]  py-[1%] px-[1%] text-center whitespace-nowrap ${
                    location == "BlogFav" ? "hidden" : "block"
                  }
                  ${
                    course.accept == null
                      ? null
                      : course.accept == false
                      ? "text-red-600 bg-red-200 w-[7%] mx-[2.5%] rounded-full h-[70%] leading-[50%] max-md:leading-[120%]"
                      : "text-green-600 bg-green-200 w-[7%] mx-[2.5%] rounded-full h-[70%] leading-[50%] max-md:leading-[120%]"
                  }`}
                >
                  {course.levelName ? course.levelName : null}
                  {course.accept == null
                    ? null
                    : course.accept == false
                    ? "تایید نشده"
                    : "تایید شده"}
                </div>
                <div
                  className={`w-[4%] max-md:ml-[10px] h-full items-center ${
                    true ? "flex" : "hidden"
                  }
             ${location == "BlogFav" ? "max-md:mr-[60%]" : null}
             `}
                >
                  {" "}
                  <Tooltip
                    className="text-gray-500 w-[7vw] leading-[1.5vw]"
                    content={"نمایش جزییات"}
                  >
                    <svg
                      onClick={() => {
                        {
                          location == "BlogFav"
                            ? GetNewsId(course.newsId)
                            : GetId(course.courseId);
                        }

                        {
                          location == "BlogFav"
                            ? setDetailId(course.newsId)
                            : setDetailId(course.courseId);
                        }

                        setDetailCourse(true);

                        console.log(detailCourse);
                      }}
                      className="cursor-pointer"
                      width=""
                      height="50%"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z"
                        stroke="#787878"
                        stroke-width="1.5"
                      />
                      <path
                        d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z"
                        stroke="#787878"
                        stroke-width="1.5"
                      />
                    </svg>
                  </Tooltip>
                </div>
                <div className="w-[4%] h-full flex items-center justify-center cursor-pointer">
                  <Tooltip
                    className="text-gray-700 w-[7vw] leading-[1.5vw]"
                    content={"حذف از لیست"}
                  >
                    <svg
                      onClick={() => {
                        setIsDelete(true);
                        if (location == "BlogFav") {
                          setDeleteId(course.favoriteId);
                        }
                        if (location == "CourseFav") {
                          setDeleteId(course.favoriteId);
                        }
                        if (location == "CourseServ") {
                          setDeleteId(course.reserveId);
                        }
                      }}
                      width=""
                      height="50%"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.001 5L5.00098 19M5.00098 5L19.001 19"
                        stroke="#FF4242"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </Tooltip>
                </div>
              </div>
            ));
          }


   
  };


  const GetNewsId = async (detailId) => {
    console.log(detailId);
    const res = await getBlogDetail(detailId);
    setDetail(res);
  };
  const GetId = async (detailId) => {
    console.log(detailId);
    const res = await getCourseDetail(detailId);
    setDetail(res);
  };
  useEffect(() => {
    if (detailId&& location != "BlogFav") GetId(detailId);
    if (detailId&& location == "BlogFav") GetNewsId(detailId);
  }, [detailId]);

  const renderDetail = () => {

    if (location == "BlogFav"){
      console.log(detail)
      return (
        <BlogIthem
          key={detail?.id}
          id={detail?.id}
          courseId={detail?.courseId}
          title={detail?.title}
          img={detail?.currentImageAddress ? detail?.currentImageAddress:"testing"}
          technologyList={
            detail?.techs != null ? detail?.techs : "برنامه نویسی"
          }
          description={detail?.describe}
          teacherName={detail?.addUserFullName}
          likeCount={detail?.likeCount}
          commandCount={detail?.commandCount}
          courseRate={detail?.currentRate}
          statusName={detail?.statusName}
          price={detail?.cost}
          currentRegistrants={detail?.currentRegistrants}
          date={detail?.lastUpdate}
          listStyle={listStyle}
          level={detail?.newsCatregoryName}
          state={detail?.courseStatusName}
          courseGroupCount={detail?.courseGroupCount}
          capacity={detail?.capacity}
          startDate={convertToJalali(detail?.insertDate)}
          endDate={convertToJalali(detail?.endTime)}
          setDetailCourse={setDetailCourse}
          detailCourse={detailCourse}
          GetId={GetNewsId}
          userIsLiked={detail?.currentUserIsLike}
          currentUserDissLike={detail?.currentUserIsDissLike}
          userLikeId={detail?.userLikeId}
          view={detail?.currentView}
        />
      );
    }
    if(location != "BlogFav"){
        return (
          <CourseItem
            key={detail?.courseId}
            id={detail?.courseId}
            courseId={detail?.courseId}
            title={detail?.title}
            img={detail?.imageAddress}
            technologyList={
              detail?.techs != null ? detail?.techs : "برنامه نویسی"
            }
            description={detail?.describe}
            teacherName={detail?.teacherName}
            likeCount={detail?.likeCount}
            commandCount={detail?.commandCount}
            courseRate={detail?.currentRate}
            statusName={detail?.statusName}
            price={detail?.cost}
            currentRegistrants={detail?.currentRegistrants}
            date={detail?.lastUpdate}
            listStyle={listStyle}
            level={detail?.courseLevelName}
            state={detail?.courseStatusName}
            courseGroupCount={detail?.courseGroupCount}
            capacity={detail?.capacity}
            startDate={convertToJalali(detail?.startTime)}
            endDate={convertToJalali(detail?.endTime)}
            setDetailCourse={setDetailCourse}
            detailCourse={detailCourse}
            GetId={GetId}
            userIsLiked={detail?.currentUserLike}
            currentUserDissLike={detail?.currentUserDissLike}
            userLikeId={detail?.userLikeId}
          />
        );
    }

  };
  
const dark = useSelector((state) => state.darkMood);
  return (
    <div
      style={{ background: dark.bgHigh, color: dark.textHigh }}
      className="relative h-full m-auto w-[100%] bg-transparent text-center max-md:w-full "
    >
      <div
        className={`fixed top-[40%] left-[50%] translate-x-[-100%] ${
          isDelete == true ? "flex" : "hidden"
        }`}
      >
        <DeleteModal
          onCancel={setIsDeleteFalse}
          onDelete={DeleteIthem}
          id={deleteId}
        />
      </div>
      <div
        className={`absolute z-[1000]  backdrop-blur-[3px] top-[-1.5vw] right-[0vw] h-[104%]  w-[100%] pt-4 ${
          detailCourse == true ? "block" : "hidden"
        }`}
      >
        <div
          className={`sticky h-[38.4vw] w-[20vw] max-md:absolute max-md:w-[75%] max-md:h-[480px] top-[5%] backdrop-blur-[5px]  right-[50%] translate-x-[50%] z-40  ${
            detailCourse == true ? "block" : "hidden"
          }`}
        >
          {detailCourse == true ? renderDetail() : <div></div>}
        </div>
      </div>

      <div
        className={`justify-between pb-[0.2vw] px-[1vw] items-start ${
          show == true ? "flex" : "hidden"
        }`}
      >
        <span className="text-[1.5vw]  max-md:text-[20px] font-[600]"></span>
        <div
          onClick={() => {
            setShowMoreCourse(false);
          }}
          className=" max-md:h-[30px] max-md:w-[20%]  max-md:text-[14px] rounded-full border border-red-500 h-[2.2vw] w-[5vw] text-red-500 flex items-center justify-evenly cursor-pointer"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.001 5L5.00098 19M5.00098 5L19.001 19"
              stroke="#FF4242"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>بستن</span>
        </div>
      </div>
      <div className="w-[100%] h-[100%] selection: mt-[0vw] ">
        {/* for dashbord........  */}
        <div
          className={` justify-between items-center my-[1vw] max-md:h-[50px] ${
            show == false ? "flex" : "hidden"
          }`}
        >
          <div className="text-[1.5vw] font-[600] max-md:text-[20px]">
            {name}
          </div>
        </div>

        {/* filterActionSection */}
        <div
          style={{ background: dark.bgHigh, color: dark.textHigh }}
          className={`h-[10%]  w-full max-md:grid  relative flex-row flex-wrap justify-start items-center gap-x-3 max-md:gap-y-[20px]  rounded-[10px] shadow-[-5px_5px_5px_0px_#0000001C] p-3
            ${true ? "flex max-md:grid max-md:grid-cols-2" : "hidden"}`}
        >
          <SearchBox
            width={"20%"}
            lgWidth={"160px"}
            placeHolder="جست جو کنید ..."
            value={`${queryValue}`}
            onChange={handleSearch}
          />
          <div
            className={`max-md:col-span-2 items-center gap-x-2  flex-row-reverse mr-[2%] ${
              location == "CourseServ" ? "flex" : "hidden"
            }`}
          >
            <Button
              className="border-red-500 text-red-500 hover:bg-red-100"
              bordered
              color="error"
              auto
              onClick={() => {
                delfilter();
              }}
            >
              حذف
            </Button>
            <span className="text-gray-500">|</span>
            <Button
              radius="full"
              className={`${
                selectedStatus === "notApproved"
                  ? `
                    ${dark.selectedButton === 0 ? "bg-blue-600" : ""} 
                    ${dark.selectedButton === 1 ? "bg-green-600" : ""} 
                    ${dark.selectedButton === 2 ? "bg-yellow-600" : ""}
                    ${dark.selectedButton === 3 ? "bg-red-600" : ""}
                    text-white`
                  : "bg-transparent border-gray-400 text-gray-500"
              }`}
              bordered
              auto
              onClick={() => handleSelect("notApproved")}
            >
              تایید نشده
            </Button>
            <Button
              radius="full"
              className={`${
                selectedStatus === "approved"
                  ? `
                  ${dark.selectedButton === 0 ? "bg-blue-600" : ""} 
                  ${dark.selectedButton === 1 ? "bg-green-600" : ""} 
                  ${dark.selectedButton === 2 ? "bg-yellow-600" : ""}
                  ${dark.selectedButton === 3 ? "bg-red-600" : ""}
                  text-white`
                  : "bg-transparent border-gray-400 text-gray-500"
              }`}
              bordered
              auto
              onClick={() => handleSelect("approved")}
            >
              تایید شده
            </Button>
            <span className="text-gray-500">ترتیب :</span>
          </div>
        </div>

        <div className=" w-full mt-[0.5vw] max-md:py-[10px]">
          <div
            style={{ background: dark.bgLow, color: dark.textLow }}
            className="flex items-center  w-full rounded-[0.5vw]  text-[0.9vw] leading-normal"
          >
            <div
              className={`w-[8%]  py-[1%] px-[1%] text-center max-md:hidden ${
                location == "BlogFav" ? "block" : "hidden"
              }`}
            >
              عکس
            </div>
            <div className="w-[16%] max-md:w-[30%] max-md:text-[16px]  py-[1%] px-[1%] text-right">
              {" "}
              {location == "BlogFav" ? "عنوان خبر" : "عنوان دوره"}{" "}
            </div>
            <div
              className={`w-[32%]  py-[1%] px-[1%] text-right max-md:hidden ${
                location == "CourseFav" ? "block" : "hidden"
              }`}
            >
              درباره دوره
            </div>
            <div
              className={` max-md:hidden  w-[50%] h-full py-[1%] px-[1%] text-right whitespace-nowrap overflow-hidden text-ellipsis ...
              ${location == "CourseFav" ? "hidden" : "block"}`}
            ></div>
            <div
              className={`w-[16%]    py-[1%] px-[1%] text-right ${
                location == "CourseFav"
                  ? "block max-md:w-[30%] max-md:text-[16px]"
                  : "hidden"
              }`}
            >
              استاد دوره
            </div>
            <div
              className={`w-[16%]  max-md:hidden   py-[1%] px-[1%] text-center`}
            >
              {location == "BlogFav" ? "تاریخ" : null}
              {location == "CourseFav" ? "تاریخ برگذاری" : null}
              {location == "CourseServ" ? "تاریخ رزرو" : null}
            </div>
            <div
              className={`w-[12%] max-md:w-[30%] max-md:text-[16px]  py-[1%] px-[1%] text-center ${
                location == "BlogFav" ? "hidden" : "block"
              }
              ${location == "CourseServ" ? "max-md:mr-[30%]" : null}
              `}
            >
              {location == "CourseServ" ? "وضعیت تایید" : "سطح دوره"}
            </div>
            <div className="w-[4%]  py-[1%] px-[1%] text-center"></div>
            <div className="w-[4%]  py-[1%] px-[1%] text-center"></div>
          </div>
        </div>
        {/* courseItemsSection */}
        <div className="flex flex-wrap justify-center items-center max-h-[70%] overflow-scroll  mt-[0.5vw]">
          {response?.length == 0 || Loding ? (
            <CustomSkeleton count={7} />
          ) : null}
          {renderCourses()}
        </div>

        {/* paginationSection */}
        {/* <Pagination
          pageCount={Math.ceil(CourseListItem.length / itemsPerPage)}
          handlePageClick={(data) => setCurrentPage(data.selected)}
        /> */}
      </div>
    </div>
  );
};

export default CoursePage;
