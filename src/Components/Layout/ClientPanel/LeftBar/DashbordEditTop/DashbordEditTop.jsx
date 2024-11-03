import React, { useState } from "react";
import { Button, Avatar } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DashbordEditTop = () => {
  const [activeTab, setActiveTab] = useState("Personal");
  const navigator = useNavigate();
  const CourseListItem = useSelector(
    (state) => state.ClientInfoSlice.ClientInfo
  );
    const tabs = [
      { id: "Personal", label: "اطلاعات شخصی" },
      { id: "Picture", label: "عکس پروفایل" },
      { id: "Address", label: "آدرس سکونت" },
      { id: "Links", label: "لینک‌ها" },
      { id: "Security", label: "امنیت" },
      { id: "PassWord", label: "رمز عبور" },
    ];

    const dark = useSelector((state) => state.darkMood);
  return (
    <div
      style={{ background: dark.bgHigh, color: dark.textHigh }}
      className=" shadow-md rounded-lg p-6 pb-0 w-full h-full relative "
    >
      {/* Header Section */}
      <div className="bg-[#E1C461] h-[40%] rounded-t-lg -mx-6 -mt-6 max-md:h-[25%]"></div>
      <div
        className="rounded-full flex justify-center items-center size-[6vw] overflow-hidden absolute bottom-[50%] max-md:bottom-[65%] right-[2%] bg-gradient-to-b from-[#F2F2F2] to-[#C4CDD5]
      max-md:size-[80px]
      "
      >
        <img
          className="h-full "
          src={CourseListItem.currentPictureAddress}
          alt=""
        />
      </div>
      <div className="flex items-center justify-between mt-[40px] px-[1%] max-md:flex-col ">
        <div className="w-[50%] max-md:w-full">
          <div className="flex items-center gap-x-[0.5vw] max-md:gap-x-1">
            <p className="text-[1.4vw] font-semibold  max-md:text-[20px]">
              {CourseListItem.fName} {CourseListItem.lName}
            </p>
            <p className="text-[0.8vw] text-gray-500 max-md:text-[12px]">
              ( دانشجو )
            </p>
          </div>
          <div className="flex items-center flex-wrap text-[0.9vw] text-gray-500 mt-2 justify-between w-[100%] max-md:text-[13px]">
            <svg
              width="4%"
              height=""
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.16699 7.50002C4.16699 4.75016 4.16699 3.37523 5.02127 2.52096C5.87553 1.66669 7.25047 1.66669 10.0003 1.66669C12.7502 1.66669 14.1251 1.66669 14.9794 2.52096C15.8337 3.37523 15.8337 4.75016 15.8337 7.50002V12.5C15.8337 15.2499 15.8337 16.6248 14.9794 17.4791C14.1251 18.3334 12.7502 18.3334 10.0003 18.3334C7.25047 18.3334 5.87553 18.3334 5.02127 17.4791C4.16699 16.6248 4.16699 15.2499 4.16699 12.5V7.50002Z"
                stroke="#787878"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M9.16699 15.8333H10.8337"
                stroke="#787878"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.5 1.66669L7.57417 2.1117C7.7349 3.0761 7.81527 3.5583 8.14599 3.85172C8.491 4.1578 8.98008 4.16669 10 4.16669C11.0199 4.16669 11.509 4.1578 11.854 3.85172C12.1847 3.5583 12.2651 3.0761 12.4258 2.1117L12.5 1.66669"
                stroke="#787878"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
            </svg>

            <span>{CourseListItem.phoneNumber}</span>
            <svg
              width="1%"
              height=""
              viewBox="0 0 4 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle opacity="0.5" cx="2" cy="2" r="2" fill="#787878" />
            </svg>

            <svg
              width="4%"
              height=""
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_745_10262)">
                <path
                  d="M13.5906 3.6533C13.0981 3.6533 12.8517 3.6533 12.6274 3.57006C12.5962 3.5585 12.5656 3.54578 12.5353 3.53192C12.3178 3.43215 12.1437 3.25801 11.7954 2.90975C10.9938 2.10816 10.5931 1.70737 10.0999 1.67041C10.0337 1.66545 9.96699 1.66545 9.90074 1.67041C9.40758 1.70737 9.00674 2.10816 8.2052 2.90974C7.85693 3.25801 7.6828 3.43215 7.4653 3.53192C7.43509 3.54578 7.40438 3.5585 7.37322 3.57006C7.14887 3.6533 6.9026 3.6533 6.41008 3.6533H6.31923C5.06264 3.6533 4.43435 3.6533 4.04398 4.04368C3.65361 4.43405 3.65361 5.06234 3.65361 6.31893V6.40978C3.65361 6.9023 3.65361 7.14856 3.57037 7.37291C3.5588 7.40407 3.54608 7.43479 3.53223 7.46499C3.43245 7.68249 3.25832 7.85663 2.91004 8.2049C2.10847 9.00644 1.70768 9.40727 1.67072 9.90044C1.66575 9.96669 1.66575 10.0334 1.67072 10.0996C1.70768 10.5928 2.10847 10.9935 2.91004 11.7951C3.25832 12.1434 3.43245 12.3175 3.53223 12.535C3.54608 12.5653 3.5588 12.5959 3.57037 12.6271C3.65361 12.8514 3.65361 13.0978 3.65361 13.5903V13.6811C3.65361 14.9377 3.65361 15.566 4.04398 15.9564C4.43435 16.3468 5.06264 16.3468 6.31923 16.3468H6.41008C6.9026 16.3468 7.14887 16.3468 7.37322 16.4299C7.40438 16.4415 7.43509 16.4543 7.4653 16.4681C7.6828 16.5679 7.85693 16.742 8.2052 17.0903C9.00674 17.8919 9.40758 18.2927 9.90074 18.3296C9.96699 18.3346 10.0337 18.3346 10.0999 18.3296C10.5931 18.2927 10.9938 17.8919 11.7954 17.0903C12.1437 16.742 12.3178 16.5679 12.5353 16.4681C12.5656 16.4543 12.5962 16.4415 12.6274 16.4299C12.8517 16.3468 13.0981 16.3468 13.5906 16.3468H13.6814C14.938 16.3468 15.5663 16.3468 15.9567 15.9564C16.3471 15.566 16.3471 14.9377 16.3471 13.6811V13.5903C16.3471 13.0978 16.3471 12.8514 16.4302 12.6271C16.4418 12.5959 16.4546 12.5653 16.4684 12.535C16.5682 12.3175 16.7423 12.1434 17.0906 11.7951C17.8922 10.9935 18.293 10.5928 18.3299 10.0996C18.3349 10.0334 18.3349 9.96669 18.3299 9.90044C18.293 9.40727 17.8922 9.00644 17.0906 8.2049C16.7423 7.85663 16.5682 7.68249 16.4684 7.46499C16.4546 7.43479 16.4418 7.40407 16.4302 7.37291C16.3471 7.14856 16.3471 6.9023 16.3471 6.40978V6.31893C16.3471 5.06234 16.3471 4.43405 15.9567 4.04368C15.5663 3.6533 14.938 3.6533 13.6814 3.6533H13.5906Z"
                  stroke="#787878"
                  stroke-width="1.5"
                />
                <path
                  d="M7.08301 13.75C7.6652 12.7436 8.75334 12.0664 9.99967 12.0664C11.246 12.0664 12.3342 12.7436 12.9163 13.75M11.6663 8.33335C11.6663 9.25385 10.9202 10 9.99967 10C9.07926 10 8.33301 9.25385 8.33301 8.33335C8.33301 7.41288 9.07926 6.66669 9.99967 6.66669C10.9202 6.66669 11.6663 7.41288 11.6663 8.33335Z"
                  stroke="#787878"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_745_10262">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span>{CourseListItem.nationalCode}</span>
            <svg
              width="1%"
              height=""
              viewBox="0 0 4 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle opacity="0.5" cx="2" cy="2" r="2" fill="#787878" />
            </svg>

            <svg
              width="4%"
              height=""
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.83301 7.08331L8.28469 8.53281C9.71401 9.3779 10.2853 9.3779 11.7147 8.53281L14.1663 7.08331"
                stroke="#787878"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.68013 11.2297C1.73461 13.7842 1.76185 15.0616 2.70445 16.0077C3.64706 16.954 4.95894 16.9869 7.58269 17.0528C9.19975 17.0935 10.8009 17.0935 12.418 17.0528C15.0417 16.9869 16.3536 16.954 17.2962 16.0077C18.2388 15.0616 18.2661 13.7842 18.3205 11.2297C18.3381 10.4082 18.3381 9.59165 18.3205 8.77032C18.2661 6.21568 18.2388 4.93837 17.2962 3.99218C16.3536 3.04599 15.0417 3.01303 12.418 2.9471C10.8009 2.90647 9.19975 2.90647 7.58268 2.94709C4.95894 3.01301 3.64706 3.04597 2.70445 3.99217C1.76185 4.93836 1.7346 6.21567 1.68013 8.77023C1.66261 9.59165 1.66261 10.4082 1.68013 11.2297Z"
                stroke="#787878"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
            </svg>
            <span>{CourseListItem.email}</span>

            <svg
              onClick={() => {
                navigator(`/ClientPanel/DashbordEdit/Personal`);
              }}
              className="mr-[2vw] cursor-pointer"
              width="4%"
              height=""
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591"
                stroke="#6B6B6B"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11 20H17"
                stroke="#6B6B6B"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>
        <div className="h-full w-[55%] mr-[3vw] max-md:w-full">
          <span className="block  mb-[0.5vw] text-[1vw] text-[#787878] max-md:text-[12px] max-md:mt-[10px]">
            درباره من
          </span>
          <p className="text-[0.8vw] max-md:text-[12px]">
            {CourseListItem.userAbout}
          </p>
        </div>
      </div>

      {/* Tab Section */}
      <div className="flex max-md:w-[100%] h-[18%] justify-between max-md:justify-start absolute bottom-0 gap-x-8 max-md:gap-x-1 overflow-hidden max-md:h-[13%]">
        {tabs.map((tab) => (
          <div className="max-md:w-[15%] text-center">
            <div
              radius="sm"
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                navigator(`/ClientPanel/DashbordEdit/${tab.id}`);
              }}
              className={`cursor-pointer  rounded-[0.5vw]  whitespace-nowrap pb-2 min-w-[15%] h-[90%] overflow-hidden  text-ellipsis ...  min-h-[15px] text-[1vw] hover:border-[#E1C461]
                max-md:text-[12px]
                ${activeTab === tab.id ? "text-[#E1C461]" : ""} `}
            >
              {tab.label}
            </div>
            <div
              className={`w-full h-0 rounded-t-full ${
                activeTab === tab.id
                  ? " border-[0.2vw] border-[#E1C461]  max-md:border-[3px]"
                  : ""
              }`}
            ></div>
          </div>
        ))}
      </div>

      {/* Content Section */}
      {/* <div className="mt-4">
        {activeTab === "personal" && <p>اطلاعات شخصی کاربر</p>}
        {activeTab === "picture" && <p>بخش عکس پروفایل</p>}
        {activeTab === "address" && <p>بخش آدرس سکونت</p>}
        {activeTab === "links" && <p>بخش لینک‌ها</p>}
      </div> */}
    </div>
  );
};

export default DashbordEditTop;
