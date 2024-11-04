import React from "react";
import convertToJalali from "../../../Common/TimeChanger/TimeToShamsi";
import { useMutation } from "react-query";
import { Button } from "@nextui-org/react";
import { FaPlug, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

const CoursePreviwe0 = ({ response, CorseReserve , id , className}) => {
  // return (
  //   <div className="h-auto w-full max-w-[550px]  shadow-md p-4 mt-[10vw] whitespace-nowrap text-right mx-auto">
  //     <div className="mb-4">
  //       <h2 className="text-lg font-semibold">مشخصات دوره</h2>
  //     </div>
  //     <div className="flex flex-col  md:flex-row justify-between h-full">
  //       <div className="flex flex-col items-start justify-evenly mb-4 md:mb-0">
  //         <span className="text-gray-700">
  //           سطح دوره : {response.courseLevelName}
  //         </span>
  //         <span className="text-gray-700">
  //           وضعیت : {response.courseStatusName}
  //         </span>
  //       </div>
  //       <div className="flex flex-col justify-evenly items-start w-full md:w-1/3 mb-4 md:mb-0">
  //         <div className="flex items-center justify-between">
  //           <svg
  //             width="17"
  //             height="17"
  //             viewBox="0 0 17 17"
  //             fill="none"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <path
  //               d="M13.4583 1.41667H12.75V0.708333C12.75 0.317132 12.4329 0 12.0417 0C11.6505 0 11.3333 0.317132 11.3333 0.708333V1.41667H5.66667V0.708333C5.66667 0.317132 5.34953 0 4.95833 0C4.56713 0 4.25 0.317132 4.25 0.708333V1.41667H3.54167C1.58663 1.41901 0.00234236 3.0033 0 4.95833V13.4583C0.00234236 15.4134 1.58663 16.9977 3.54167 17H13.4583C15.4134 16.9977 16.9977 15.4134 17 13.4583V4.95833C16.9977 3.0033 15.4134 1.41901 13.4583 1.41667ZM1.41667 4.95833C1.41667 3.78473 2.36806 2.83333 3.54167 2.83333L13.4583 2.83333C14.6319 2.83333 15.5833 3.78473 15.5833 4.95833V5.66667H1.41667V4.95833ZM13.4583 15.5833H3.54167C2.36806 15.5833 1.41667 14.6319 1.41667 13.4583V7.08333H15.5833V13.4583C15.5833 14.6319 14.6319 15.5833 13.4583 15.5833Z"
  //               fill="#7A7A7A"
  //             />
  //             <circle cx="8.5" cy="10.5" r="1.5" fill="#7A7A7A" />
  //             <circle cx="5.1665" cy="10.5" r="1.5" fill="#7A7A7A" />
  //             <circle cx="11.8335" cy="10.5" r="1.5" fill="#7A7A7A" />
  //           </svg>
  //           <span className="text-gray-700">تاریخ شروع:</span>
  //           <span className="ml-2 text-gray-500">
  //             {convertToJalali(response.startTime)}
  //           </span>
  //         </div>
  //         <div className="flex items-center justify-between">
  //           <svg
  //             width="17"
  //             height="17"
  //             viewBox="0 0 17 17"
  //             fill="none"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <path
  //               d="M13.4583 1.41667H12.75V0.708333C12.75 0.317132 12.4329 0 12.0417 0C11.6505 0 11.3333 0.317132 11.3333 0.708333V1.41667H5.66667V0.708333C5.66667 0.317132 5.34953 0 4.95833 0C4.56713 0 4.25 0.317132 4.25 0.708333V1.41667H3.54167C1.58663 1.41901 0.00234236 3.0033 0 4.95833V13.4583C0.00234236 15.4134 1.58663 16.9977 3.54167 17H13.4583C15.4134 16.9977 16.9977 15.4134 17 13.4583V4.95833C16.9977 3.0033 15.4134 1.41901 13.4583 1.41667ZM1.41667 4.95833C1.41667 3.78473 2.36806 2.83333 3.54167 2.83333L13.4583 2.83333C14.6319 2.83333 15.5833 3.78473 15.5833 4.95833V5.66667H1.41667V4.95833ZM13.4583 15.5833H3.54167C2.36806 15.5833 1.41667 14.6319 1.41667 13.4583V7.08333H15.5833V13.4583C15.5833 14.6319 14.6319 15.5833 13.4583 15.5833Z"
  //               fill="#7A7A7A"
  //             />
  //             <circle cx="8.5" cy="10.5" r="1.5" fill="#7A7A7A" />
  //             <circle cx="5.1665" cy="10.5" r="1.5" fill="#7A7A7A" />
  //             <circle cx="11.8335" cy="10.5" r="1.5" fill="#7A7A7A" />
  //           </svg>
  //           <span className="text-gray-700">تاریخ پایان:</span>
  //           <span className="ml-2 text-gray-500">
  //             {convertToJalali(response.endTime)}
  //           </span>
  //         </div>
  //       </div>
  //       <div className="flex flex-col justify-center items-center">
  //         <span className="text-gray-700">قیمت: {response.cost} تومان</span>
  //         <button
  //           onClick={() => CorseReserve.mutate(id)}
  //           className={`w-full bg-green-600 text-white py-2 px-4 rounded-lg  transition duration-300 mt-2 ${response.isCourseReseve == 1 ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
  //         >
  //           {response.isCourseReseve == 1 ? 'حذف این دوره' : 'ثبت نام در این دوره'}
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
const dark = useSelector((state) => state.darkMood);
  
  return (
    <Button
      onClick={() => CorseReserve.mutate(id)}
      // className={`w-full  bg-green-600 text-white py-2 px-4 rounded-lg  transition duration-300 mt-2 ${response.isCourseReseve == 1 ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
      className={`${className}  text-gray-50
        ${dark.selectedButton === 0 ? "bg-blue-600" : ""} 
        ${dark.selectedButton === 1 ? "bg-green-600" : ""} 
        ${dark.selectedButton === 2 ? "bg-yellow-600" : ""}
        ${response.isCourseReseve == 1? 'bg-red-600': ""}
      `}
    >
      
      {response.isCourseReseve == 1 ? " - حذف این دوره" : "+  ثبت نام در این دوره" }
    </Button>
  );
};

export default CoursePreviwe0;
