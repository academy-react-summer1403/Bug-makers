import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { setCourseList } from "../../../../../Redux/Slice/Course/CourseList";
import { getCourseListWithPagination } from "../../../../../Core/Services/Api/CoursePage/getCourseListWithPagination";
import TextLanding from "../../../../Common/TextInLanding/TextLanding";
// import Pagination from "../../../../Common/Paginate/Paginate";
import moment from "jalali-moment";
// import PriceFilter from "../../../../ComponentOnce/PriceFilter/PriceFilter";
// import SearchBox from "./SearchBox/SearchBox";
// import SelectOpt from "./Select/SelectOpt";
// import DateModal from "./Date/Date";
import { Tooltip } from "@nextui-org/react";
import CourseCard from "../../../CourseDetail/CourseCard/CourseCard";
import { getCourseDetail } from "../../../../../Core/Services/Api/CourseDetail/CourseDetail";
import CourseItem from "./CorseItem/CourseItem";
import convertToJalali from "../../../../Common/TimeChanger/TimeToShamsi";
import { getCourseServ, getLikedCourse, getLikedNews } from "../../../../../Core/Services/Api/Client/clientLiked";
import { delBlogFav, delCourseFav, delCourseServ } from "../../../../../Core/Services/Api/Client/Delete";

import { getBlogDetail } from "../../../../../Core/Services/Api/BlogDetail/BlogDetail";
import BlogIthem from "../LikedBlog/CorseItem/BlogIthem";



const CoursePage = ({location,name, show, itemPerpage, setShowMoreCourse }) => {
 
  // stateForListStyle
  const [listStyle, setListStyle] = useState(false);

  const [response,setResponse]=useState([])

  // course detail modal
  const [detailCourse, setDetailCourse] = useState(false);
  const [detail, setDetail] = useState();
  const [detailId, setDetailId] = useState(null);

  const itemsPerPage = itemPerpage;
  const dispatch = useDispatch();

  // getCourseListFromRedux
  const CourseListItem = useSelector((state) => state.CourseSlice.CourseList);

  // fetchCoursesWithFilters
  const GetLikedCourse = async ()=>{
    const data = await getLikedCourse();
    setResponse(data.favoriteCourseDto);
  }
  const GetLikedNews = async () => {
    const data = await getLikedNews();
    setResponse(data.myFavoriteNews);
  };
  const GetCourseServ = async () => {
    const data = await getCourseServ();
    setResponse(data);
    console.log(data)
  };
  useEffect(()=>{
    if (location == "BlogFav") {
      GetLikedNews()
    }
    if (location == "CourseFav") {
      GetLikedCourse()
    }
    if (location == "CourseServ") {
      GetCourseServ()
    }
  },[])
    
  const DelCourseFav = async (id)=>{
    const res = delCourseFav(id)
    console.log(res)
    GetLikedCourse()
  }


  const DelBlogFav = async (id)=>{
    console.log(id)
    const res = await delBlogFav(id)
    
    GetLikedNews();

  }


  const DelCourseServ = async (id)=>{
    const res = delCourseServ(id)
    GetCourseServ();  
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
  const renderCourses = () => {

      if(response.length==0){return(
          <div className="w-full mt-[2vw] text-gray-700 font-[500] text-[1.5vw] max-md:text-[16px]" >لیست{" "}{ name }{" "}خالی است</div>
         )}

       return response.map((course, index) => (
         <div
           key={index}
           className="w-full h-[3vw] max-md:justify-between max-md:border-b-1 max-md:h-[30px] rounded-[0.4vw] flex items-center text-[0.9vw] text-[#272727] hover:bg-gray-100"
         >
           <div
             className={`w-[8%] max-md:hidden justify-center h-full rounded-[0.5vw] overflow-hidden   ${
               location == "BlogFav" ? "flex" : "hidden"
             }`}
           >
             <img
               className=" h-full rounded-[0.5vw]"
               src={course.currentImageAddressTumb}
               alt=""
             />
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
               className="text-gray-700 w-[10vw] leading-[1.5vw]"
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
               className="text-gray-700"
               content={`استاد: ${course.teacheName}`}
             >
               {course.teacheName}
             </Tooltip>
           </div>
           <div className="w-[16%] max-md:hidden h-full py-[1%] px-[1%] text-center whitespace-nowrap">
             {course.lastUpdate ? convertToJalali(course.lastUpdate) : null}
             {course.updateDate ? convertToJalali(course.updateDate) : null}
             {course.reserverDate ? convertToJalali(course.reserverDate) : null}
           </div>
           <div
             className={`max-md:w-[30%] max-md:text-[14px] w-[12%] h-full py-[1%] px-[1%] text-center whitespace-nowrap ${
               location == "BlogFav" ? "hidden" : "block"
             } ${
               course.accept == null
                 ? null
                 : course.accept == false
                 ? "text-red-600"
                 : "text-green-500"
             }`}
           >
             {course.levelName ? course.levelName : null}
             {course.accept == null
               ? null
               : course.accept == false
               ? "در انتظار تایید"
               : "تایید شده"}
           </div>
           <div
             className={`w-[4%] max-md:ml-[10px] h-full items-center ${
               true ? "flex" : "hidden"
             }
             ${location == "BlogFav" ? 'max-md:mr-[60%]':null}
             `}
           >
             {" "}
             <Tooltip
               className="text-gray-700 w-[7vw] leading-[1.5vw]"
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
                   setTimeout(() => {
                     setDetailCourse(true);
                   }, 2000);

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
                   if (location == "BlogFav") {
                     DelBlogFav(course.favoriteId);
                   }
                   if (location == "CourseFav") {
                     DelCourseFav(course.favoriteId);
                   }
                   if (location == "CourseServ") {
                     DelCourseServ(course.reserveId);
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
          key={detail.id}
          id={detail.id}
          courseId={detail.courseId}
          title={detail.title}
          img={detail.currentImageAddress}
          technologyList={detail.techs != null ? detail.techs : "برنامه نویسی"}
          description={detail.describe}
          teacherName={detail.addUserFullName}
          likeCount={detail.likeCount}
          commandCount={detail.commandCount}
          courseRate={detail.currentRate}
          statusName={detail.statusName}
          price={detail.cost}
          currentRegistrants={detail.currentRegistrants}
          date={detail.lastUpdate}
          listStyle={listStyle}
          level={detail.newsCatregoryName}
          state={detail.courseStatusName}
          courseGroupCount={detail.courseGroupCount}
          capacity={detail.capacity}
          startDate={convertToJalali(detail.insertDate)}
          endDate={convertToJalali(detail.endTime)}
          setDetailCourse={setDetailCourse}
          detailCourse={detailCourse}
          GetId={GetNewsId}
          userIsLiked={detail.currentUserIsLike}
          currentUserDissLike={detail.currentUserIsDissLike}
          userLikeId={detail.userLikeId}
          view={detail.currentView}
        />
      );
    }
      if(location != "BlogFav"){
        return (
          <CourseItem
            key={detail.courseId}
            id={detail.courseId}
            courseId={detail.courseId}
            title={detail.title}
            img={detail.imageAddress}
            technologyList={
              detail.techs != null ? detail.techs : "برنامه نویسی"
            }
            description={detail.describe}
            teacherName={detail.teacherName}
            likeCount={detail.likeCount}
            commandCount={detail.commandCount}
            courseRate={detail.currentRate}
            statusName={detail.statusName}
            price={detail.cost}
            currentRegistrants={detail.currentRegistrants}
            date={detail.lastUpdate}
            listStyle={listStyle}
            level={detail.courseLevelName}
            state={detail.courseStatusName}
            courseGroupCount={detail.courseGroupCount}
            capacity={detail.capacity}
            startDate={convertToJalali(detail.startTime)}
            endDate={convertToJalali(detail.endTime)}
            setDetailCourse={setDetailCourse}
            detailCourse={detailCourse}
            GetId={GetId}
            userIsLiked={detail.currentUserLike}
            currentUserDissLike={detail.currentUserDissLike}
            userLikeId={detail.userLikeId}
          />
        );
      }

  };
  

  return (
    <div className="relative  m-auto w-[100%] bg-transparent text-center max-md:w-full">
      <div
        className={`absolute z-[1000]  backdrop-blur-[3px] top-[-1.5vw] right-[0vw] h-[104%] w-[100%] ${
          detailCourse == true ? "block" : "hidden"
        }`}
      >
        <div
          className={`absolute h-[38.4vw] w-[20vw] max-md:w-[75%] max-md:h-[480px] top-[2vw] backdrop-blur-[5px]  right-[50%] translate-x-[50%] z-40  ${
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
      <div className="w-[100%] selection: mt-[0vw] ">
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

        <div className=" w-full mt-[0.5vw] max-md:py-[10px]">
          <div className="flex items-center  w-full rounded-[0.5vw] bg-[#F0F0F0] text-gray-600 text-[0.9vw] leading-normal">
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
              ${location == "CourseServ" ? 'max-md:mr-[30%]':null}
              `}
            >
              {location == "CourseServ" ? "وضعیت تایید" : "سطح دوره"}
            </div>
            <div className="w-[4%]  py-[1%] px-[1%] text-center"></div>
            <div className="w-[4%]  py-[1%] px-[1%] text-center"></div>
          </div>
        </div>
        {/* courseItemsSection */}
        <div className="flex flex-wrap justify-center items-center  mt-[0.5vw]">
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
