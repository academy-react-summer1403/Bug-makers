import React from "react";
import TehranClock from "../../../../Common/TimeChanger/TimeHours";
import TodayDate from "../../../../Common/TimeChanger/TodayDate";
import PersianCalender from "../../../../Common/TimeChanger/PersianCalender";
import CommentCard from "./CommentBar/CommentBar";
import CommentSection from "./CommentBar/CommentBar";
import CourseTable from "./CourseList/CourseList";
import Gauge from "../../LeftBar/LeftBarDown/PersonalInfo/ComplitingCircle";
import Home from "./CourseListDeatail/Base";
import Filters from "./CourseListDeatail/Filters";
import Layout from "./CourseListDeatail/Layout";
import Courses from "./CourseListDeatail/Courses";

const Dashbord =()=>{
   
    return (
      <div className="w-full h-full">
        <div className="h-[14%] w-full flex items-center py-[1vw]">
          <span className="font-[600] text-[1.8vw]">سلام، صبح‌ بخیر پارسا</span>
          <div className="h-full w-[6%] flex justify-between items-center mr-[30%]">
            <div className="size-[1.7vw] rounded-full bg-white flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#272727"
                  stroke-width="1.5"
                />
                <path
                  d="M12 8V12L14 14"
                  stroke="#272727"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.8vw]">ساعت</span>
              <span className="text-[#333] font-[600]">
                <TehranClock />{" "}
              </span>
            </div>
          </div>
          <div className="h-full w-[9%] flex justify-between items-center mr-[10%]">
            <div className="size-[1.7vw] rounded-full bg-white flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 2V4M6 2V4"
                  stroke="#272727"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897"
                  stroke="#272727"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.5 8H20.5"
                  stroke="#272727"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z"
                  stroke="#272727"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3 8H21"
                  stroke="#272727"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col ">
              <span className="text-[0.8vw]">تاریخ</span>
              <span className="text-[#333] font-[600]">
                <TodayDate />{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="relative w-full h-[35%] justify-between flex">
          <div className="w-[55%] h-full">
            <CommentSection />
          </div>

          <div className="w-[20%] h-[99%] bg-white rounded-[0.5vw]">
            <Gauge value={5} />
          </div>
          <div className="h-full w-[22%] relative top-[-5vw]">
            <PersianCalender />
          </div>
        </div>
        <div>
          {/* <CourseTable /> */}
          <Layout>
            <Filters/>
            <Courses />
          </Layout>
        </div>
      </div>
    );
}
export default Dashbord