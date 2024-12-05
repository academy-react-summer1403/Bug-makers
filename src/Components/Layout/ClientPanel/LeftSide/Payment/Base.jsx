import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { setCourseList } from "../../../../../Redux/Slice/Course/CourseList";
import { getCourseListWithPagination } from "../../../../../Core/Services/Api/CoursePage/getCourseListWithPagination";
import TextLanding from "../../../../Common/TextInLanding/TextLanding";
import Pagination from "../../../../Common/Paginate/Paginate";
import moment from "jalali-moment";
import PriceFilter from "../Dashbord/CourseListDeatail/PriceFilter/PriceFilter";
import SearchBox from "../Dashbord/CourseListDeatail/SearchBox/SearchBox";
import SelectOpt from "../Dashbord/CourseListDeatail/Select/SelectOpt";
import DateModal from "../Dashbord/CourseListDeatail/Date/Date";
import { Button, Tooltip } from "@nextui-org/react";
import CourseCard from "../../../CourseDetail/CourseCard/CourseCard";
import { getCourseDetail } from "../../../../../Core/Services/Api/CourseDetail/CourseDetail";
import CourseItem from "../Dashbord/CourseListDeatail/CorseItem/CourseItem";
import convertToJalali from "../../../../Common/TimeChanger/TimeToShamsi";
import { getMyCourseListWithPagination } from "../../../../../Core/Services/Api/Client/clientLiked";
import { setpaymentList } from "../../../../../Redux/Slice/payment/payment";
import { useNavigate } from "react-router-dom";
import { getPayment } from "../../../../../Core/Services/Api/Client/payment";
import CustomSkeleton from "../../../../Common/Sceleton/CostomeSceleton";


const CoursePage = ({
  payment,
  show,
  itemPerpage,
  setShowMoreCourse,
  name,
  point,
}) => {
const dispatch = useDispatch();
const navigator = useNavigate()

  const [payData,setPayData]=useState([])
  // course detail modal
  const [detailCourse, setDetailCourse] = useState(false);
  const [detail, setDetail] = useState({});
  const [detailId, setDetailId] = useState(null);
  const [queryValue, setQueryValue] = useState("");
  const [originalData, setOriginalData] = useState(null);


  const dark = useSelector((state) => state.darkMood);


  // fetchCoursesWithFilters

  const { isLoading, error, data } = useQuery(
    ["getCourse"],
    () =>
      getPayment(),
    {
      onSuccess: (data) => {
        setPayData(data);
        setOriginalData(data)
      },
      keepPreviousData: true,
    }
  );

const handleSearch = (e) => {
  const value = e.target.value;
  setQueryValue(value);

  
  if (value === "") {
    setPayData(originalData); // `originalData` باید شامل داده‌های اصلی (غیرفیلتر شده) باشد
    return;
  }
  // در غیر این صورت، داده‌ها را بر اساس مقدار ورودی فیلتر ن
  const filterData = originalData.filter((el) => {  
      return el.groupName.toLowerCase().includes(value.toLowerCase());
  });
  setPayData(filterData);
};

  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleSelect = (status) => {
      setSelectedStatus(status);
        const filterData = originalData.filter(
          (el) => {
            if (status == "approved") {
              return el.accept == true;
            }
            if (status == "work") {
              return (
                el.accept == false && el.paymentInvoiceImage == null
              );
            }
            if (status == "notApproved") {
              return el.accept == false && el.paymentInvoiceImage != null;
            }
          }
        );
        setPayData(filterData);
      };

       const delfilter = () => {
         setPayData(originalData);
         setQueryValue("");
         setSelectedStatus(null);
       };
  // renderCourseItems
  const renderCourses = () => {
    if (isLoading) return <p>در حال بارگذاری...</p>;
    if (error) return <p>خطایی رخ داده است...</p>;
    console.log(payData)

    if (error) return <p>دوره ای وجود ندارد</p>;

    return payData.map((course, index) => (
      <div
        style={{ background: dark.bgHigh, color: dark.textHigh }}
        key={index}
        className="w-full h-[3vw] max-md:border-b-1 max-md:h-[40px] rounded-[0.4vw] flex items-center text-[1vw]  text-[#272727] hover:bg-gray-100"
      >
        <div className="w-[16%] h-full py-3 px-6 text-right whitespace-nowrap overflow-hidden text-ellipsis ... max-md:w-[40%] max-md:text-[14px]">
          {course.groupName}
        </div>
        <div className="w-[20%] h-full py-3 px-6 text-right whitespace-nowrap max-md:hidden overflow-hidden text-ellipsis ...">
          
            <span>{convertToJalali(course.insertDate)}</span>
          
        </div>
        <div className="w-[20%] h-full py-3  px-6 text-right max-md:w-[40%] max-md:hidden max-md:text-[14px] whitespace-nowrap">
          
            {convertToJalali(course.peymentDate)}
          
        </div>
        <div className="w-[20%] h-full py-3 px-6 text-right whitespace-nowrap max-md:hidden">
          {course.paid} {" تومان  "}
        </div>
        <div className="w-[16%] h-full py-3 px-6 text-right whitespace-nowrap max-md:w-[40%] max-md:text-[14px] flex items-center">
          <div
            className={`w-[5%] h-[30%] bg-red-500 rounded-full ml-[5%] ${
              course.accept == false && course.paymentInvoiceImage != null
                ? "block"
                : "hidden"
            }`}
          ></div>
          <div
            className={`w-[5%] h-[30%] bg-green-500 rounded-full ml-[5%] ${
              course.accept == true ? "block" : "hidden"
            }`}
          ></div>
          <div
            className={`w-[5%] h-[30%] bg-purple-700 rounded-full ml-[5%] ${
              course.accept == false && course.paymentInvoiceImage == null
                ? "block"
                : "hidden"
            }`}
          ></div>
          {course.accept == true
            ? "تایید شده"
            : course.accept == false && course.paymentInvoiceImage == null
            ? "کامل نشده"
            : "تایید نشده"}
        </div>
        <div className={`w-[4%] max-md:w-[10%] h-full flex items-center`}>
          <Tooltip content="مشاهده جزییات">
            <svg
              onClick={() => {
                setDetailId(course.courseId);
                setDetailCourse(true);
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
        <div
          onClick={() => {
            dispatch(setpaymentList(course || []));
            navigator(
              `FacturePeyment/${course.paymentId}/${course.courseId}/${
                course.paymentInvoiceImage == null ? 1 : 0
              }`
            );
          }}
          className={`w-[4%] max-md:w-[10%] h-full flex items-center`}
        >
          <Tooltip
            content={
              course.paymentInvoiceImage == null
                ? "ادامه پرداخت"
                : "مشاهده فاکتور"
            }
          >
            {course.paymentInvoiceImage != null ? (
              <svg
                width=""
                height="50%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.5 16.9286V10C20.5 6.22876 20.5 4.34315 19.3284 3.17157C18.1569 2 16.2712 2 12.5 2H11.5C7.72876 2 5.84315 2 4.67157 3.17157C3.5 4.34315 3.5 6.22876 3.5 10V19.5"
                  stroke="#787878"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M20.5 17H6C4.61929 17 3.5 18.1193 3.5 19.5C3.5 20.8807 4.61929 22 6 22H20.5"
                  stroke="#787878"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M9 10.3265L10.409 11.8131C11.159 12.6044 11.534 13 12 13C12.466 13 12.841 12.6044 13.591 11.8131L15 10.3265M12 12.9128V6"
                  stroke="#787878"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.5 17C19.1193 17 18 18.1193 18 19.5C18 20.8807 19.1193 22 20.5 22"
                  stroke="#787878"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            ) : (
              <svg
                width=""
                height="50%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 19C10.6675 19.6224 8.91707 20 7 20C5.93408 20 4.91969 19.8833 4 19.6726C3.4088 19.5372 3.11319 19.4695 2.75898 19.1892C2.55696 19.0294 2.30483 18.7129 2.19412 18.4803C2 18.0725 2 17.677 2 16.886V6.11397C2 5.12914 3.04003 4.45273 4 4.6726C4.91969 4.88325 5.93408 5 7 5C8.91707 5 10.6675 4.62236 12 4C13.3325 3.37764 15.0829 3 17 3C18.0659 3 19.0803 3.11675 20 3.3274C20.5912 3.46281 20.8868 3.53051 21.241 3.81079C21.443 3.97064 21.6952 4.28705 21.8059 4.51966C22 4.92751 22 5.32299 22 6.11397V11.5"
                  stroke="#787878"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M18.5 21V14M15 17.5H22"
                  stroke="#787878"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M14.5 11.5C14.5 12.8807 13.3807 14 12 14C10.6193 14 9.5 12.8807 9.5 11.5C9.5 10.1193 10.6193 9 12 9C13.3807 9 14.5 10.1193 14.5 11.5Z"
                  stroke="#787878"
                  stroke-width="1.5"
                />
                <path
                  d="M5.5 12.5V12.509"
                  stroke="#787878"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
          </Tooltip>
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
    <div
      style={{ background: dark.bgHigh, color: dark.textHigh }}
      className="relative m-auto w-full bg-transparent text-center h-full max-md:w-full  "
    >
      <div
        className={`absolute z-[20]  backdrop-blur-[3px] top-[-1.5vw] right-[0vw] h-[104%] w-[100%]  ${
          detailCourse == true ? "block" : "hidden"
        }`}
      >
        <div
          className={`sticky h-[38.4vw] max-md:w-[75%] max-md:h-[480px] max-md:absolute w-[20vw] top-[2vw] backdrop-blur-[5px]  right-[50%] translate-x-[50%] z-40  ${
            detailCourse == true ? "block" : "hidden"
          }`}
        >
          {detailCourse == true ? renderDetail() : <div></div>}
        </div>
      </div>

      <div
        className={`justify-between pb-[0.2vw] px-[1vw] items-start  ${
          show == true ? "flex" : "hidden"
        }`}
      >
        <span className="text-[1.5vw] max-md:text-[20px] font-[600]">
          {" "}
          {name}{" "}
        </span>
        <div
          onClick={() => {
            setShowMoreCourse(false);
          }}
          className={`rounded-full border border-red-500 h-[2.2vw] max-md:h-[30px] max-md:w-[20%]  max-md:text-[14px] text-[0.9vw] w-[5vw] text-red-500  items-center justify-evenly cursor-pointer ${
            point == "myCourse" ? "hidden" : "flex"
          }`}
        >
          <svg
            width=""
            height="70%"
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
      <div className="w-[100%] selection: mt-[0vw] h-full">
        {/* searchAndFilterSection */}
        <div
          className={`h-[10%] max-md:h-[20%] w-full  relative flex-row flex-wrap justify-start items-center gap-x-3 max-md:gap-y-[20px] rounded-[10px] shadow-[-5px_5px_5px_0px_#0000001C] p-3
            ${show == true ? "flex max-md:grid max-md:grid-cols-2" : "hidden"}`}
        >
          <SearchBox
            width={"20%"}
            lgWidth={"160px"}
            placeHolder="جست جو کنید ..."
            value={`${queryValue}`}
            onChange={handleSearch}
          />
          <div
            className={`max-md:col-span-2 max-md:gap-x-1 max-md:justify-center items-center gap-x-2 flex-row-reverse mr-[2%] ${
              point == "myCourse" ? "flex" : "hidden"
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
            <span className="text-gray-600">|</span>
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
            <Button
              radius="full"
              className={`${
                selectedStatus === "work"
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
              onClick={() => handleSelect("work")}
            >
              کامل نشده
            </Button>
            |<span className="text-gray-500 ">فیلتر</span>
          </div>
        </div>
        {/* filterActionSection */}

        <div className=" w-full mt-[0.5vw] max-md:py-[10px] h-max ">
          <div
            style={{ background: dark.bgLow, color: dark.textLow }}
            className="flex items-center  w-full rounded-[0.5vw]  leading-normal"
          >
            <div className="w-[16%] max-md:w-[40%] max-md:text-[16px] text-[1.1vw] py-[1%] px-6 text-right">
              نام گروه دوره
            </div>
            <div className="w-[20%] text-[1.1vw]   py-[1%] px-6 text-right max-md:hidden">
              تاریخ برگزاری
            </div>
            <div className="w-[20%]  text-[1.1vw] py-[1%] px-6 text-right max-md:hidden">
              تاریخ پرداخت
            </div>
            <div className="w-[20%] max-md:w-[40%] max-md:text-[16px] max-md:hidden text-[1.1vw] py-[1%] px-6 text-right">
              مبلغ دوره
            </div>
            <div className="w-[16%] max-md:w-[40%] max-md:text-[16px]  text-[1.1vw] py-[1%] px-6 text-right">
              وضعیت دوره
            </div>

            <div className="w-[4%] text-[1.1vw] py-3 px-4 text-center"></div>
          </div>
        </div>
        {/* courseItemsSection */}
        <div className="flex flex-wrap justify-center items-center  mt-[0.5vw]  max-h-[82%] overflow-auto">
          {payData?.length == 0 || isLoading ? (
            <CustomSkeleton count={8} />
          ) : null}
          {renderCourses()}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
