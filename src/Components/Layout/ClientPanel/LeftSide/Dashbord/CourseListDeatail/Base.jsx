import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { setCourseList } from "../../../../../../Redux/Slice/Course/CourseList";
import { getCourseListWithPagination } from "../../../../../../Core/Services/Api/CoursePage/getCourseListWithPagination";
import TextLanding from "../../../../../Common/TextInLanding/TextLanding";
import Pagination from "../../../../../Common/Paginate/Paginate";
import moment from "jalali-moment";
import PriceFilter from "../../../../../ComponentOnce/PriceFilter/PriceFilter";
import SearchBox from "./SearchBox/SearchBox";
import SelectOpt from "./Select/SelectOpt";
import DateModal from "./Date/Date";
import { Tooltip } from "@nextui-org/react";
import CourseCard from "../../../../CourseDetail/CourseCard/CourseCard";
import { getCourseDetail } from "../../../../../../Core/Services/Api/CourseDetail/CourseDetail";
import CourseItem from "./CorseItem/CourseItem";
import convertToJalali from "../../../../../Common/TimeChanger/TimeToShamsi";


const CoursePage = ({ show, itemPerpage, setShowMoreCourse ,name ,point}) => {
  const [myCourseList,setMyCourseList]=useState([])
  // stateForCategoryFilter
  const [categoryQuery, setCategoryQuery] = useState("");

  // stateForTeacherFilter
  const [teacherId, setTeacherId] = useState(null);

  // stateForSearchQuery
  const [queryValue, setQueryValue] = useState("");

  // stateForCurrentPage
  const [currentPage, setCurrentPage] = useState(0);

  // stateForListStyle
  const [listStyle, setListStyle] = useState(false);

  // state value
  const [filterValue, setFilterValue] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [sorting, setSorting] = useState("");

  const [minCost, setMinCost] = useState(null);
  const [maxCost, setMaxCost] = useState(null);

  // course detail modal
  const [detailCourse, setDetailCourse] = useState(false);
  const [detail, setDetail] = useState({});
  const [detailId, setDetailId] = useState(null);

  const itemsPerPage = itemPerpage;
  const dispatch = useDispatch();

  // getCourseListFromRedux
  const CourseListItem = useSelector((state) => state.CourseSlice.CourseList);

  // fetchCoursesWithFilters

  const { isLoading, error, data } = useQuery(
    [
      "getCourse",
      queryValue,
      teacherId,
      categoryQuery,
      startDate,
      endDate,
      sorting,
      minCost,
      maxCost,
    ],
    () =>
      getCourseListWithPagination(
        queryValue,
        teacherId,
        categoryQuery,
        startDate,
        endDate,
        sorting,
        minCost,
        maxCost
      ),
    {
      onSuccess: (data) => {
        dispatch(setCourseList(data.courseFilterDtos || data));
      },
      keepPreviousData: true,
    }
  );
    const { IsLoading, Error, Data } = useQuery(
      [
        "getCourse",
        queryValue,
        teacherId,
        categoryQuery,
        startDate,
        endDate,
        sorting,
        minCost,
        maxCost,
      ],
      () =>
        getCourseListWithPagination(
          queryValue,
          teacherId,
          categoryQuery,
          startDate,
          endDate,
          sorting,
          minCost,
          maxCost
        ),
      {
        onSuccess: (data) => {
          dispatch(setMyCourseList(data.courseFilterDtos || data));
        },
        keepPreviousData: true,
      }
    );


  // handleSearchQueryChange
  const handleSearch = (e) => {
    setQueryValue(e.target.value);
  };

  // handleRemoveFilters
  const handleRemoveFilter = () => {
    setQueryValue("");
    setTeacherId(null);
    setCategoryQuery("");
    setSorting("Active");
    setStartDate("");
    setEndDate("");

    setFilterValue(true);
    setMinCost(null);
    setMaxCost(null);
    setTimeout(() => {
      setFilterValue(false);
    }, 100);
  };

  const filterByDateRange = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  // Converting Date
  // const convertToJalali = (miladiDate) => {
  //   return moment(miladiDate, "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD");
  // };

  const handlePriceFilter = (min, max) => {
    setMinCost(min);
    setMaxCost(max);
  };

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
    if (isLoading) return <p>در حال بارگذاری...</p>;
    if (error) return <p>خطایی رخ داده است...</p>;
    if (IsLoading) return <p>در حال بارگذاری...</p>;
    if (Error) return <p>خطایی رخ داده است...</p>;

    let ithem = null
    if(point=="dashbord") { ithem = CourseListItem}
    else if (point == "myCourse"){ithem = myCourseList}
     
    return ithem.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    ).map((course, index) => (
      <div
        key={index}
        className="w-full h-[3vw] rounded-[0.4vw] flex items-center  text-[#272727] hover:bg-gray-100"
      >
        <div className="w-[16%] h-full py-3 px-6 text-right whitespace-nowrap">
          {course.title}
        </div>
        <div className="w-[32%] h-full py-3 px-6 text-right whitespace-nowrap overflow-hidden text-ellipsis ...">
          <Tooltip className="text-gray-700" content={`${course.describe}`}>
            <span>{course.describe}</span>
          </Tooltip>
        </div>
        <div className="w-[16%] h-full py-3 px-6 text-right whitespace-nowrap">
          <Tooltip
            className="text-gray-700"
            content={`استاد: ${course.teacherName}`}
          >
            {course.teacherName}
          </Tooltip>
        </div>
        <div className="w-[16%] h-full py-3 px-6 text-right whitespace-nowrap">
          {convertToJalali(course.lastUpdate)}
        </div>
        <div className="w-[16%] h-full py-3 px-6 text-right whitespace-nowrap">
          {course.cost} تومان
        </div>
        <div
          className={`w-[4%] h-full items-center ${
            show == true ? "flex" : "hidden"
          }`}
        >
          <svg
            onClick={() => {
              setDetailId(course.courseId);
              setDetailCourse(true);
            }}
            className="cursor-pointer"
            width="24"
            height="24"
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
        </div>
      </div>
    ));
  };

  const GetId = async (detailId) => {
    console.log(detailId);
    const res = await getCourseDetail(detailId);
    setDetail(res);
  };
  useEffect(() => {
    if (detailId) GetId(detailId);
  }, [detailId]);

  const renderDetail = () => {
    if (isLoading) return <p>در حال بارگذاری...</p>;
    if (error) return <p>خطایی رخ داده است...</p>;

    {
      detail == null ? alert() : "";
    }

    return (
      <CourseItem
        key={detail.courseId}
        id={detail.courseId}
        courseId={detail.courseId}
        title={detail.title}
        img={detail.imageAddress}
        technologyList={detail.techs != null ? detail.techs : "برنامه نویسی"}
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
  };

  return (
    <div className="relative m-auto w-[76vw] bg-transparent text-center ">
      <div
        className={`absolute z-[1000]  backdrop-blur-[3px] top-[-1.5vw] right-[0vw] h-[104%] w-[100%] ${
          detailCourse == true ? "block" : "hidden"
        }`}
      >
        <div
          className={`absolute h-[38.4vw] w-[20vw] top-[2vw] backdrop-blur-[5px]  right-[50%] translate-x-[50%] z-40  ${
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
        <span className="text-[1.5vw] font-[600]"> {name} </span>
        <div
          onClick={() => {
            setShowMoreCourse(false);
          }}
          className={`rounded-full border border-red-500 h-[2.2vw] w-[5vw] text-red-500  items-center justify-evenly cursor-pointer ${
            point == "myCourse" ? "hidden" : "flex"
          }`}
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
        {/* searchAndFilterSection */}
        <div
          className={`h-[60px]  relative flex-row flex-wrap justify-center items-center gap-x-3 bg-white rounded-[10px] shadow-[-5px_5px_5px_0px_#0000001C] p-3
            ${show == true ? "flex" : "hidden"}`}
        >
          <SearchBox
            width={"20%"}
            lgWidth={"160px"}
            placeHolder="دنبال چی میگردی"
            value={`${filterValue ? "" : queryValue}`}
            onChange={handleSearch}
          />
          <SelectOpt
            width={point == "myCourse" ? "myCourse" : "100%"}
            lgWidth={"160px"}
            placeholder="استاد دوره"
            isTeacherSelect={true}
            onChange={(value) => setTeacherId(value)}
            FilterValue={filterValue}
          />

          <DateModal
            onFilter={point == "myCourse" ? "myCourse" : filterByDateRange}
          />

          <PriceFilter
            width={"100%"}
            lgWidth={"160px"}
            onFilter={point == "myCourse" ? "myCourse" : handlePriceFilter}
          />
          <span className="block lg:hidden text-[10px] text-[#978A8A] absolute bottom-2 right-4">
            تعداد {CourseListItem.length} نتیجه از {data?.totalCount || 0} دوره
            طبق جستجوی شما یافت شد
          </span>
          <span
            className="block lg:hidden w-[106px] h-[20px] rounded-[16px] text-center text-[10px] bottom-2 m-auto relative  text-[#FE8E8E] cursor-pointer bg-white  "
            onClick={handleRemoveFilter}
          >
            حذف تمامی فیلتر
          </span>
        </div>

        {/* for dashbord........  */}
        <div
          className={` justify-between items-center mb-[0.2vw] ${
            show == false ? "flex" : "hidden"
          }`}
        >
          <div className="text-[1.5vw] font-[600]">جدیدترین دوره‌ها</div>
          <span
            onClick={() => {
              setShowMoreCourse(true);
            }}
            className="text-[#E1C461] cursor-pointer"
          >
            مشاهده همه
          </span>
        </div>

        {/* filterActionSection */}

        <div className=" w-full mt-[0.5vw]">
          <div className="flex items-center w-full rounded-[0.5vw] bg-[#F0F0F0] text-gray-600 text-sm leading-normal">
            <div className="w-[16%]  py-3 px-6 text-right">نام دوره</div>
            <div className="w-[32%]   py-3 px-6 text-right">درباره دوره</div>
            <div className="w-[16%]  py-3 px-6 text-right">استاد دوره</div>
            <div className="w-[16%]  py-3 px-6 text-right">تاریخ برگزاری</div>
            <div className="w-[16%] py-3 px-6 text-right">
              {" "}
              {point == "dashbord" ? "قیمت دوره " : "درصد پرداختی"}{" "}
            </div>
            <div className="w-[4%]  py-3 px-4 text-center"></div>
          </div>
        </div>
        {/* courseItemsSection */}
        <div className="flex flex-wrap justify-center items-center  mt-[0.5vw]">
          {renderCourses()}
        </div>

        {/* paginationSection */}
        <Pagination
          pageCount={Math.ceil(CourseListItem.length / itemsPerPage)}
          handlePageClick={(data) => setCurrentPage(data.selected)}
        />
      </div>
    </div>
  );
};

export default CoursePage;
