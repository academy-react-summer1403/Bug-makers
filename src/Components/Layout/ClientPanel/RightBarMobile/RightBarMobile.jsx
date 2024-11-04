import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { Navigate, useNavigate } from "react-router-dom";
import { removeItem } from "../../../../Core/Services/common/storage.services";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const RightBarMobile = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [overmenu,setOvermenu] = useState(false)
  const navigator = useNavigate();

  const currentUrl = window.location.href;
  const urlParts = currentUrl.split("/");
  const lastPart = urlParts[urlParts.length - 1];

  const setPage = () => {
    if (lastPart == "Dashbord") {
      setActiveIndex(0);
    }
    if (lastPart == "MyCourse") {
      setActiveIndex(1);
    }
    if (lastPart == "MyReserve") {
      setActiveIndex(2);
    }
    if (lastPart == "LikedCourse") {
      setActiveIndex(3);
    }
    if (lastPart == "LikedBlog") {
      setActiveIndex(4);
    }
    if (lastPart == "DashbordEdit") {
      setActiveIndex(5);
    }
  };
  useEffect(() => {
    setPage();
  }, [lastPart]);


  const CourseListItem = useSelector(
    (state) => state.ClientInfoSlice.ClientInfo
  );
  console.log(CourseListItem);

  // لیست آیتم‌های منو
  const menuItems2 = [
    {
      id: 3,
      name: "LikedCourse",
      label: "علاقه‌مندی دوره",
      icon: (
        <svg
          width=""
          height="70%"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.5 17.4286V10.5C20.5 6.72876 20.5 4.84315 19.3284 3.67157C18.1569 2.5 16.2712 2.5 12.5 2.5H11.5C7.72876 2.5 5.84315 2.5 4.67157 3.67157C3.5 4.84315 3.5 6.72876 3.5 10.5V20"
            stroke={activeIndex === 3 ? "#FEFDFF" : "#5e5e5e"}
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M8 3.5V7.19003C8 7.93013 8 8.30019 8.23811 8.44371C8.24836 8.44989 8.25884 8.45571 8.26951 8.46115C8.51756 8.58746 8.84124 8.39707 9.4886 8.01629C9.97254 7.73164 10.2145 7.58931 10.4815 7.58447C10.4938 7.58425 10.5062 7.58425 10.5185 7.58447C10.7855 7.58931 11.0275 7.73164 11.5114 8.01629C12.1588 8.39707 12.4824 8.58747 12.7305 8.46115C12.7412 8.45571 12.7516 8.44989 12.7619 8.44372C13 8.30019 13 7.93013 13 7.19003V3.5"
            stroke={activeIndex === 3 ? "#FEFDFF" : "#5e5e5e"}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20.5 17.5H6C4.61929 17.5 3.5 18.6193 3.5 20C3.5 21.3807 4.61929 22.5 6 22.5H20.5"
            stroke={activeIndex === 3 ? "#FEFDFF" : "#5e5e5e"}
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M20.5 17.5C19.1193 17.5 18 18.6193 18 20C18 21.3807 19.1193 22.5 20.5 22.5"
            stroke={activeIndex === 3 ? "#FEFDFF" : "#5e5e5e"}
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      ),
    },
    {
      id: 4,
      name: "LikedBlog",
      label: "علاقه‌مندی مقالات",
      icon: (
        <svg
          width=""
          height="70%"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 13.5004V15.0446C4 18.2896 4 19.9121 4.88607 21.0111C5.06508 21.2331 5.26731 21.4354 5.48933 21.6144C6.58831 22.5004 8.21082 22.5004 11.4558 22.5004C12.1614 22.5004 12.5141 22.5004 12.8372 22.3864C12.9044 22.3627 12.9702 22.3354 13.0345 22.3047C13.3436 22.1569 13.593 21.9074 14.0919 21.4085L18.8284 16.672C19.4065 16.0939 19.6955 15.8049 19.8478 15.4374C20 15.0698 20 14.6611 20 13.8436V10.5004C20 6.72919 20 4.84358 18.8284 3.672C17.7693 2.61284 16.1265 2.51122 13.0345 2.50146M13 22.0004V21.5004C13 18.672 13 17.2578 13.8787 16.3791C14.7574 15.5004 16.1716 15.5004 19 15.5004H19.5"
            stroke={activeIndex === 4 ? "#FEFDFF" : "#5e5e5e"}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4 8.9532V5.48748C4 4.07894 4 3.37467 4.43934 2.93709C4.87868 2.49951 5.58579 2.49951 7 2.49951C8.41421 2.49951 9.12132 2.49951 9.56066 2.93709C10 3.37467 10 4.07894 10 5.48748V8.9532C10 9.87314 10 10.3331 9.71208 10.4674C9.42416 10.6017 9.06938 10.3073 8.35982 9.71834L7.64018 9.12106C7.33408 8.86699 7.18103 8.73996 7 8.73996C6.81897 8.73996 6.66592 8.86699 6.35982 9.12106L5.64018 9.71834C4.93062 10.3073 4.57584 10.6017 4.28792 10.4674C4 10.3331 4 9.87314 4 8.9532Z"
            stroke={activeIndex === 4 ? "#FEFDFF" : "#5e5e5e"}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 6,
      name: "Payment",
      label: "پرداخت‌ها",
      icon: (
        <svg
          width=""
          height="70%"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 7.17008C5.93408 7.17008 4.91969 7.05077 4 6.83549C3.04003 6.61078 2 7.30207 2 8.30855V19.3175C2 20.1259 2 20.5301 2.19412 20.9469C2.30483 21.1846 2.55696 21.508 2.75898 21.6714C3.11319 21.9578 3.4088 22.027 4 22.1654C4.91969 22.3807 5.93408 22.5 7 22.5C8.91707 22.5 10.6675 22.1141 12 21.478C13.3325 20.842 15.0829 20.456 17 20.456C18.0659 20.456 19.0803 20.5753 20 20.7906C20.96 21.0153 22 20.324 22 19.3175V8.30855C22 7.50018 22 7.096 21.8059 6.67918C21.6952 6.44146 21.443 6.11808 21.241 5.95472C20 4.93869 18 5.9422 18 5.9422"
            stroke={activeIndex === 6 ? "#FEFDFF" : "#5e5e5e"}
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M14.5 14C14.5 15.3807 13.3807 16.5 12 16.5C10.6193 16.5 9.5 15.3807 9.5 14C9.5 12.6193 10.6193 11.5 12 11.5C13.3807 11.5 14.5 12.6193 14.5 14Z"
            stroke={activeIndex === 6 ? "#FEFDFF" : "#5e5e5e"}
            stroke-width="1.5"
          />
          <path
            d="M5.5 15V15.009"
            stroke={activeIndex === 6 ? "#FEFDFF" : "#5e5e5e"}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.5 12.9922V13.0012"
            stroke={activeIndex === 6 ? "#FEFDFF" : "#5e5e5e"}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.5 5C9.99153 4.4943 11.2998 2.5 12 2.5M12 2.5C12.7002 2.5 14.0085 4.4943 14.5 5M12 2.5V8.5"
            stroke={activeIndex === 6 ? "#FEFDFF" : "#5e5e5e"}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
  ];
  const menuItems = [
    {
      id: 0,
      name: "Dashbord",
      label: "داشبورد",
      icon: (
        <svg
          width=""
          height="70%"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.75 11C20.0972 11 22 9.09721 22 6.75C22 4.40279 20.0972 2.5 17.75 2.5C15.4028 2.5 13.5 4.40279 13.5 6.75C13.5 9.09721 15.4028 11 17.75 11Z"
            stroke={activeIndex === 0 ? "#FEFDFF" : "#5e5e5e"}
            stroke-width="1.5"
          />
          <path
            d="M6.25 11C8.59721 11 10.5 9.09721 10.5 6.75C10.5 4.40279 8.59721 2.5 6.25 2.5C3.90279 2.5 2 4.40279 2 6.75C2 9.09721 3.90279 11 6.25 11Z"
            stroke={activeIndex === 0 ? "#FEFDFF" : "#5e5e5e"}
            stroke-width="1.5"
          />
          <path
            d="M17.75 22.5C20.0972 22.5 22 20.5972 22 18.25C22 15.9028 20.0972 14 17.75 14C15.4028 14 13.5 15.9028 13.5 18.25C13.5 20.5972 15.4028 22.5 17.75 22.5Z"
            stroke={activeIndex === 0 ? "#FEFDFF" : "#5e5e5e"}
            stroke-width="1.5"
          />
          <path
            d="M6.25 22.5C8.59721 22.5 10.5 20.5972 10.5 18.25C10.5 15.9028 8.59721 14 6.25 14C3.90279 14 2 15.9028 2 18.25C2 20.5972 3.90279 22.5 6.25 22.5Z"
            stroke={activeIndex === 0 ? "#FEFDFF" : "#5e5e5e"}
            stroke-width="1.5"
          />
        </svg>
      ),
    },
    {
      id: 1,
      name: "MyCourse",
      label: "دوره من",
      icon: (
        <svg
          width=""
          height="70%"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.5 17.4286V10.5C20.5 6.72876 20.5 4.84315 19.3284 3.67157C18.1569 2.5 16.2712 2.5 12.5 2.5H11.5C7.72876 2.5 5.84315 2.5 4.67157 3.67157C3.5 4.84315 3.5 6.72876 3.5 10.5V20"
            stroke={activeIndex === 1 ? "#FEFDFF" : "#5e5e5e"}
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M20.5 17.5H6C4.61929 17.5 3.5 18.6193 3.5 20C3.5 21.3807 4.61929 22.5 6 22.5H20.5"
            stroke={activeIndex === 1 ? "#FEFDFF" : "#5e5e5e"}
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M20.5 22.5C19.1193 22.5 18 21.3807 18 20C18 18.6193 19.1193 17.5 20.5 17.5"
            stroke={activeIndex === 1 ? "#FEFDFF" : "#5e5e5e"}
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M15 7.5H9"
            stroke={activeIndex === 1 ? "#FEFDFF" : "#5e5e5e"}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 11.5H9"
            stroke={activeIndex === 1 ? "#FEFDFF" : "#5e5e5e"}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 2,
      name: "MyReserve",
      label: "رزرو من",
      icon: (
        <svg
          width=""
          height="70%"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.3083 4.88394C15.7173 4.88394 15.4217 4.88394 15.1525 4.78405C15.1151 4.77017 15.0783 4.75491 15.042 4.73828C14.781 4.61855 14.5721 4.40959 14.1541 3.99167C13.1922 3.02977 12.7113 2.54882 12.1195 2.50447C12.04 2.49851 11.96 2.49851 11.8805 2.50447C11.2887 2.54882 10.8077 3.02977 9.84585 3.99166C9.42793 4.40959 9.21897 4.61855 8.95797 4.73828C8.92172 4.75491 8.88486 4.77017 8.84747 4.78405C8.57825 4.88394 8.28273 4.88394 7.69171 4.88394H7.58269C6.07478 4.88394 5.32083 4.88394 4.85239 5.35239C4.38394 5.82083 4.38394 6.57478 4.38394 8.08269V8.19171C4.38394 8.78273 4.38394 9.07825 4.28405 9.34747C4.27017 9.38486 4.25491 9.42172 4.23828 9.45797C4.11855 9.71897 3.90959 9.92793 3.49166 10.3458C2.52977 11.3077 2.04882 11.7887 2.00447 12.3805C1.99851 12.46 1.99851 12.54 2.00447 12.6195C2.04882 13.2113 2.52977 13.6922 3.49166 14.6541C3.90959 15.0721 4.11855 15.281 4.23828 15.542C4.25491 15.5783 4.27017 15.6151 4.28405 15.6525C4.38394 15.9217 4.38394 16.2173 4.38394 16.8083V16.9173C4.38394 18.4252 4.38394 19.1792 4.85239 19.6476C5.32083 20.1161 6.07478 20.1161 7.58269 20.1161H7.69171C8.28273 20.1161 8.57825 20.1161 8.84747 20.2159C8.88486 20.2298 8.92172 20.2451 8.95797 20.2617C9.21897 20.3815 9.42793 20.5904 9.84585 21.0083C10.8077 21.9702 11.2887 22.4512 11.8805 22.4955C11.96 22.5015 12.04 22.5015 12.1195 22.4955C12.7113 22.4512 13.1922 21.9702 14.1541 21.0083C14.5721 20.5904 14.781 20.3815 15.042 20.2617C15.0783 20.2451 15.1151 20.2298 15.1525 20.2159C15.4217 20.1161 15.7173 20.1161 16.3083 20.1161H16.4173C17.9252 20.1161 18.6792 20.1161 19.1476 19.6476C19.6161 19.1792 19.6161 18.4252 19.6161 16.9173V16.8083C19.6161 16.2173 19.6161 15.9217 19.7159 15.6525C19.7298 15.6151 19.7451 15.5783 19.7617 15.542C19.8815 15.281 20.0904 15.0721 20.5083 14.6541C21.4702 13.6922 21.9512 13.2113 21.9955 12.6195C22.0015 12.54 22.0015 12.46 21.9955 12.3805C21.9512 11.7887 21.4702 11.3077 20.5083 10.3458C20.0904 9.92793 19.8815 9.71897 19.7617 9.45797C19.7451 9.42172 19.7298 9.38486 19.7159 9.34747C19.6161 9.07825 19.6161 8.78273 19.6161 8.19171V8.08269C19.6161 6.57478 19.6161 5.82083 19.1476 5.35239C18.6792 4.88394 17.9252 4.88394 16.4173 4.88394H16.3083Z"
            stroke={activeIndex === 2 ? "#FEFDFF" : "#5e5e5e"}
            stroke-width="1.5"
          />
          <path
            d="M12 8.5V12.5L14.8037 14"
            stroke={activeIndex === 2 ? "#FEFDFF" : "#5e5e5e"}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 5,
      name: "DashbordEdit/Personal",
      label: "پروفایل",
      icon: (
        <img className="h-[70%] w-[70%] rounded-full" src={CourseListItem.currentPictureAddress} />
      ),
    },
  ];
const dark = useSelector((state) => state.darkMood);
  return (
    <div
      style={{ background: dark.bgHigh, color: dark.textHigh }}
      className="w-full h-full shadow-lg flex items-center rounded-full p-[1.2vw] flex-row"
    >
      {/* Header */}

      {/* Menu Items */}
      <div className="flex h-[100%] w-[100%] gap-x-2 justify-between items-center">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setActiveIndex(item.id);
              navigator(`${item.name}`);
            }}
            style={{ color: dark.textHigh }}
            className={`flex items-center text-bold text-[0.9vw] justify-center rounded-full max-w-[100px] w-[24%] h-[100%] ${
              dark.selectedButton === 0 ? "hover:border-blue-600" : ""
            } 
                ${dark.selectedButton === 1 ? "hover:border-green-600" : ""} 
                ${dark.selectedButton === 2 ? "hover:border-yellow-600" : ""} 
                ${
                  activeIndex === item.id
                    ? ` text-white
              ${dark.selectedButton === 0 ? "bg-blue-600" : ""} 
              ${dark.selectedButton === 1 ? "bg-green-600" : ""} 
              ${dark.selectedButton === 2 ? "bg-yellow-600" : ""}
              `
                    : ""
                }`}
            // color={activeIndex === item.id ? "warning" : "default"}
          >
            {item.icon}
          </div>
        ))}
        <div
          style={{ color: dark.textHigh }}
          className={`relative flex items-center text-bold text-[0.9vw] justify-center rounded-full w-[19%] h-[100%] transition-all duration-500 hover:border-[#E1C461]  ${
            overmenu == true
              ? ` text-white
            ${dark.selectedButton === 0 ? "bg-blue-600" : ""} 
              ${dark.selectedButton === 1 ? "bg-green-600" : ""} 
              ${dark.selectedButton === 2 ? "bg-yellow-600" : ""}
            `
              : ""
          }`}
          onClick={() => {
            if (overmenu == false) {
              setOvermenu(true);
            } else if (overmenu == true) {
              setOvermenu(false);
            }
          }}
        >
          <svg
            width=""
            height="100%"
            viewBox="0 0 32 32"
            fill="transparent"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26 18C27.1046 18 28 17.1045 28 16C28 14.8955 27.1046 14 26 14C24.8954 14 24 14.8955 24 16C24 17.1045 24.8954 18 26 18Z"
              stroke={overmenu == true ? "#FEFDFF" : "#5e5e5e"}
              stroke-width="1.5"
            />
            <path
              d="M16 18C17.1045 18 18 17.1045 18 16C18 14.8955 17.1045 14 16 14C14.8955 14 14 14.8955 14 16C14 17.1045 14.8955 18 16 18Z"
              stroke={overmenu == true ? "#FEFDFF" : "#5e5e5e"}
              stroke-width="1.5"
            />
            <path
              d="M6 18C7.10453 18 8 17.1045 8 16C8 14.8955 7.10453 14 6 14C4.89547 14 4 14.8955 4 16C4 17.1045 4.89547 18 6 18Z"
              stroke={overmenu == true ? "#FEFDFF" : "#5e5e5e"}
              stroke-width="1.5"
            />
          </svg>
          <div
            style={{ background: dark.bgLow, color: dark.textHigh }}
            className={`flex-col  w-[400%]  rounded-md transition-all duration-500 h-[450%] absolute top-[-470%] left-[40%] ${
              overmenu == true ? "flex" : "hidden"
            }`}
          >
            {menuItems2.map((item) => (
              <Button
                radius="md"
                key={item.id}
                onClick={() => {
                  setOvermenu(false);
                  setActiveIndex(item.id);
                  navigator(`${item.name}`);
                }}
                className={`flex items-center text-bold text-[20px] gap-x-[2vw] justify-start w-full h-[25%] bg-transparent hover:border-[#E1C461] ${
                  activeIndex === item.id
                    ? ` text-white 
                  ${dark.selectedButton === 0 ? "bg-blue-600" : ""} 
                  ${dark.selectedButton === 1 ? "bg-green-600" : ""} 
                  ${dark.selectedButton === 2 ? "bg-yellow-600" : ""}
                  `
                    : ""
                }`}
                color={activeIndex === item.id ? "warning" : "default"}
                auto
              >
                {item.icon}
                {item.label}
              </Button>
            ))}

            <Button
              radius="full"
              className="flex bg-transparent items-center text-bold text-[20px] gap-x-[2vw] justify-start w-full h-[25%] "
              auto
              onClick={() => {
                setOvermenu(false);
              }}
            >
              <svg
                width=""
                height="70%"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 14.5116C9.45338 14.4164 7.38334 14.9064 5.57757 15.9816C4.1628 16.824 0.453366 18.5441 2.71266 20.6966C3.81631 21.748 5.04549 22.5 6.59087 22.5H12"
                  stroke="#5e5e5e"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.5 7C15.5 9.48528 13.4853 11.5 11 11.5C8.51472 11.5 6.5 9.48528 6.5 7C6.5 4.51472 8.51472 2.5 11 2.5C13.4853 2.5 15.5 4.51472 15.5 7Z"
                  stroke="#5e5e5e"
                  stroke-width="1.5"
                />
                <path
                  d="M18 21.2143V22.5M18 21.2143C16.8432 21.2143 15.8241 20.6461 15.2263 19.7833M18 21.2143C19.1568 21.2143 20.1759 20.6461 20.7737 19.7833M15.2263 19.7833L14.0004 20.5714M15.2263 19.7833C14.8728 19.273 14.6667 18.6597 14.6667 18C14.6667 17.3403 14.8727 16.7271 15.2262 16.2169M20.7737 19.7833L21.9996 20.5714M20.7737 19.7833C21.1272 19.273 21.3333 18.6597 21.3333 18C21.3333 17.3403 21.1273 16.7271 20.7738 16.2169M18 14.7857C19.1569 14.7857 20.1761 15.354 20.7738 16.2169M18 14.7857C16.8431 14.7857 15.8239 15.354 15.2262 16.2169M18 14.7857V13.5M20.7738 16.2169L22 15.4286M15.2262 16.2169L14 15.4286"
                  stroke="#5e5e5e"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
              حساب‌های کاربری
            </Button>
            <Button
              onClick={() => {
                setOvermenu(false);

                removeItem("token");

                toast.success("با موفقیت از اکانت خود خارج شدید");
                navigator("/");
              }}
              radius="full"
              className="flex items-center text-bold bg-transparent text-[20px] gap-x-[2vw] justify-start w-full h-[25%]  text-red-500"
              auto
            >
              <svg
                width=""
                height="70%"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18.125C14.9264 19.9769 13.3831 21.5494 11.3156 21.4988C10.8346 21.487 10.2401 21.3194 9.05112 20.984C6.18961 20.1768 3.70555 18.8203 3.10956 15.7815C3 15.223 3 14.5944 3 13.3373V11.6627C3 10.4056 3 9.77705 3.10956 9.21846C3.70555 6.17965 6.18961 4.82316 9.05112 4.01603C10.2401 3.68064 10.8346 3.51295 11.3156 3.50119C13.3831 3.45061 14.9264 5.02307 15 6.87501"
                  stroke="#FF5454"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M21 12.5H10M21 12.5C21 11.7998 19.0057 10.4915 18.5 10M21 12.5C21 13.2002 19.0057 14.5085 18.5 15"
                  stroke="#FF5454"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              خروج از حساب
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBarMobile;
