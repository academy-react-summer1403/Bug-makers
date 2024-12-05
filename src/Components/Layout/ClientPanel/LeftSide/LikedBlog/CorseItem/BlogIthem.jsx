import { Tooltip } from "@nextui-org/react";
import { list } from "postcss";
import React from "react";
import { useState } from "react";
import { delLikeNews, postDissLikeNews, postLikeNews } from "../../../../../../Core/Services/Api/BlogDetail/BlogDetail";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BlogIthem = ({
  title,
  id,
  img,
  description,
  technologyList,
  teacherName,
  likeCount,
  commandCount,
  courseRate,
  statusName,
  price,
  currentRegistrants,
  date,
  listStyle,
  level,
  state,
  courseGroupCount,
  capacity,
  startDate,
  endDate,
  setDetailCourse,
  detailCourse,
  GetId,
  currentUserDissLike,
  userIsLiked,
  userLikeId,
  view,
}) => {
  console.log(id);
  const navigate =useNavigate()
  const setNewsDissLike = async () => {
    const res = await postDissLikeNews(id);
    // console.log(res);
    GetId(id);
  };
  const setNewsLike = async () => {
    const res = await postLikeNews(id);
    // console.log(res);
    GetId(id);
  };

  const delLikeNews2 = async () => {
    console.log(userLikeId);
    const res = await delLikeNews(userLikeId);
    console.log(res);
    GetId(id);
  };
  
  const handleNavigate = () => {
    navigate(`/BlogDetail/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const dark = useSelector((state) => state.darkMood);
  return (
    <div
      style={{
        background: dark.bgHigh,
        color: dark.textHigh,
      }}
      className={`p-[0.5vw] relative shadow-[0px_0px_15px_0px_#aaa]  rounded-[1vw]  overflow-hidden
          "w-[100%]  max-h-[100%] max-md:h-full`}
    >
      <div className="max-md:h-[7%] h-[1.8vw] w-full text-right flex justify-between items-center mb-[0.5vw]">
        <span className="text-[1.4vw] max-md:text-[20px] font-[600]">
          علاقه‌مندی مقالات
        </span>
        <div
          onClick={() => {
            setDetailCourse(false);
          }}
          className={`rounded-full w-[4vw] h-[1.5vw] max-md:h-[60%] max-md:w-[18%]  border border-red-500 flex justify-evenly items-center cursor-pointer `}
        >
          <span className="text-red-500 mb-[0.3vw] max-md:text-[11px] max-md:px-[5px] text-[0.9vw]">
            بستن
          </span>
          <svg
            width=""
            height="70%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 5L5 19M5 5L19 19"
              stroke="#FF4242"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div
        className={`rounded-[0.5vw] bg-gradient-to-b from-[#C4CDD5] to-[#F2F2F2] overflow-hidden
          w-[100%] h-[250px]  max-md:h-[30%]
        `}
      >
        {img != "testing" ? (
          <img className={`w-full h-full `} src={img} />
        ) : null}
      </div>
      <div className="absolute top-[3.2vw] px-[0.5vw] max-md:text-[12px] max-md:top-[9%] max-md:h-[5%] max-md:w-[18%] right-[1vw] rounded-full h-[4%] w-[20%] bg-blue-500 text-white text-[0.7vw] ">
        <Tooltip
          className="text-gray-700 max-md:text-[12px] max-md:w-[100px] w-[120%] text-[1vw] leading-[1.4vw]"
          size="sm"
          content={` ${technologyList}`}
        >
          <div className=" max-md:text-[12px]  text-[0.7vw] w-full whitespace-nowrap overflow-hidden text-ellipsis ...">
            {technologyList}
          </div>
        </Tooltip>
      </div>

      <div className="max-md:text-[12px] max-md:right-[20%] max-md:top-[9%] max-md:h-[5%] max-md:w-[18%] absolute top-[3.2vw] right-[5.5vw] rounded-full h-[4%] w-[15%] bg-blue-500 text-white text-[0.7vw]">
        <Tooltip
          className="text-gray-700 max-md:text-[12px] w-[160%] text-[1vw] leading-[1.4vw]"
          size="sm"
          content={` ${level}`}
        >
          <div className=" text-[0.7vw] max-md:text-[12px] w-full whitespace-nowrap overflow-hidden text-ellipsis ...">
            {level}
          </div>
        </Tooltip>
      </div>

      <div className="w-full h-[3vw] max-md:h-[7%] flex justify-between py-[0.5vw]">
        <div
          onClick={handleNavigate}
          className="w-[5vw] h-[2vw] max-md:text-[12px] max-md:w-[25%] max-md:h-[90%] rounded-full bg-[#E1C461] text-white flex justify-center items-center text-[0.7vw] font-[600] cursor-pointer"
        >
          <span>صفحه مقاله</span>
        </div>
        <div className="w-[25%] h-full flex justify-between items-center">
          <div
            onClick={() => {
              userIsLiked == true ? delLikeNews2() : setNewsLike();
            }}
            className="w-[45%] h-full rounded-full border border-[#E4E4E4] flex items-center justify-center cursor-pointer"
          >
            <svg
              width=""
              height="70%"
              viewBox="0 0 24 24"
              fill={userIsLiked == true ? "#FF0000" : "#7F7F7F"}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 12.5C2 11.3954 2.89543 10.5 4 10.5C5.65685 10.5 7 11.8431 7 13.5V17.5C7 19.1569 5.65685 20.5 4 20.5C2.89543 20.5 2 19.6046 2 18.5V12.5Z"
                stroke="#272727"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.4787 7.80626L15.2124 8.66634C14.9942 9.37111 14.8851 9.72349 14.969 10.0018C15.0369 10.2269 15.1859 10.421 15.389 10.5487C15.64 10.7065 16.0197 10.7065 16.7791 10.7065H17.1831C19.7532 10.7065 21.0382 10.7065 21.6452 11.4673C21.7145 11.5542 21.7762 11.6467 21.8296 11.7437C22.2965 12.5921 21.7657 13.7351 20.704 16.0211C19.7297 18.1189 19.2425 19.1678 18.338 19.7852C18.2505 19.8449 18.1605 19.9013 18.0683 19.9541C17.116 20.5 15.9362 20.5 13.5764 20.5H13.0646C10.2057 20.5 8.77628 20.5 7.88814 19.6395C7 18.7789 7 17.3939 7 14.6239V13.6503C7 12.1946 7 11.4668 7.25834 10.8006C7.51668 10.1344 8.01135 9.58664 9.00069 8.49112L13.0921 3.96056C13.1947 3.84694 13.246 3.79012 13.2913 3.75075C13.7135 3.38328 14.3652 3.42464 14.7344 3.84235C14.774 3.8871 14.8172 3.94991 14.9036 4.07554C15.0388 4.27205 15.1064 4.37031 15.1654 4.46765C15.6928 5.33913 15.8524 6.37436 15.6108 7.35715C15.5838 7.46692 15.5488 7.5801 15.4787 7.80626Z"
                stroke="#272727"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div
            onClick={() => {
              currentUserDissLike == true ? delLikeNews2() : setNewsDissLike();
            }}
            className="w-[45%] h-full rounded-full border border-[#E4E4E4] flex items-center justify-center cursor-pointer"
          >
            <svg
              width=""
              height="70%"
              viewBox="0 0 24 24"
              fill={currentUserDissLike == true ? "#FF0000" : "#7F7F7F"}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 11.5C2 12.6046 2.89543 13.5 4 13.5C5.65685 13.5 7 12.1569 7 10.5V6.5C7 4.84315 5.65685 3.5 4 3.5C2.89543 3.5 2 4.39543 2 5.5V11.5Z"
                stroke="#272727"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.4787 16.1937L15.2124 15.3337C14.9942 14.6289 14.8851 14.2765 14.969 13.9982C15.0369 13.7731 15.1859 13.579 15.389 13.4513C15.64 13.2935 16.0197 13.2935 16.7791 13.2935H17.1831C19.7532 13.2935 21.0382 13.2935 21.6452 12.5327C21.7145 12.4458 21.7762 12.3533 21.8296 12.2563C22.2965 11.4079 21.7657 10.2649 20.704 7.9789C19.7297 5.88111 19.2425 4.83222 18.338 4.21485C18.2505 4.15508 18.1605 4.0987 18.0683 4.04586C17.116 3.5 15.9362 3.5 13.5764 3.5H13.0646C10.2057 3.5 8.77628 3.5 7.88814 4.36053C7 5.22106 7 6.60607 7 9.37607V10.3497C7 11.8054 7 12.5332 7.25834 13.1994C7.51668 13.8656 8.01135 14.4134 9.00069 15.5089L13.0921 20.0394C13.1947 20.1531 13.246 20.2099 13.2913 20.2493C13.7135 20.6167 14.3652 20.5754 14.7344 20.1577C14.774 20.1129 14.8172 20.0501 14.9036 19.9245C15.0388 19.728 15.1064 19.6297 15.1654 19.5323C15.6928 18.6609 15.8524 17.6256 15.6108 16.6429C15.5838 16.5331 15.5488 16.4199 15.4787 16.1937Z"
                stroke="#272727"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="text-right  max-md:my-[2px] max-md:text-[10px] font-[600] text-[0.7vw] text-[#787878] mb-[0.4vw]">
        {" "}
        <span>عنوان</span>
      </div>

      <div
        className={`text-[1vw] max-md:text-[12px] max-md:h-[6%] font-semibold whitespace-nowrap max-md:w-full text-right flex justify-start gap-[0.2vw]`}
      >
        <span>{title}</span>
        <div className="flex items-start">
          ({courseRate}
          <svg
            width="5%"
            height=""
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.7741 15.1132C11.4207 15.1132 10.9674 14.9999 10.4007 14.6665L8.4074 13.4865C8.20073 13.3665 7.80073 13.3665 7.60073 13.4865L5.60073 14.6665C4.42073 15.3666 3.7274 15.0866 3.41406 14.8599C3.1074 14.6332 2.6274 14.0532 2.94073 12.7199L3.41406 10.6732C3.4674 10.4599 3.36073 10.0932 3.20073 9.93322L1.5474 8.27988C0.72073 7.45322 0.787396 6.74655 0.90073 6.39988C1.01406 6.05322 1.37406 5.43988 2.52073 5.24655L4.6474 4.89322C4.8474 4.85988 5.13406 4.64655 5.22073 4.46655L6.40073 2.11322C6.93406 1.03988 7.63406 0.879883 8.00073 0.879883C8.3674 0.879883 9.0674 1.03988 9.60073 2.11322L10.7741 4.45988C10.8674 4.63988 11.1541 4.85322 11.3541 4.88655L13.4807 5.23988C14.6341 5.43322 14.9941 6.04655 15.1007 6.39322C15.2074 6.73988 15.2741 7.44655 14.4541 8.27322L12.8007 9.93322C12.6407 10.0932 12.5407 10.4532 12.5874 10.6732L13.0607 12.7199C13.3674 14.0532 12.8941 14.6332 12.5874 14.8599C12.4207 14.9799 12.1541 15.1132 11.7741 15.1132ZM8.00073 12.3932C8.3274 12.3932 8.65406 12.4732 8.91406 12.6266L10.9074 13.8065C11.4874 14.1532 11.8541 14.1532 11.9941 14.0532C12.1341 13.9532 12.2341 13.5999 12.0874 12.9466L11.6141 10.8999C11.4874 10.3465 11.6941 9.63322 12.0941 9.22655L13.7474 7.57322C14.0741 7.24655 14.2207 6.92655 14.1541 6.70655C14.0807 6.48655 13.7741 6.30655 13.3207 6.23322L11.1941 5.87988C10.6807 5.79322 10.1207 5.37988 9.8874 4.91322L8.71406 2.56655C8.50073 2.13988 8.23406 1.88655 8.00073 1.88655C7.7674 1.88655 7.50073 2.13988 7.29406 2.56655L6.11406 4.91322C5.88073 5.37988 5.32073 5.79322 4.8074 5.87988L2.6874 6.23322C2.23406 6.30655 1.9274 6.48655 1.85406 6.70655C1.78073 6.92655 1.93406 7.25322 2.26073 7.57322L3.91406 9.22655C4.31406 9.62655 4.52073 10.3465 4.39406 10.8999L3.92073 12.9466C3.7674 13.6066 3.87406 13.9532 4.01406 14.0532C4.15406 14.1532 4.51406 14.1465 5.10073 13.8065L7.09406 12.6266C7.3474 12.4732 7.67406 12.3932 8.00073 12.3932Z"
              fill="#FAFF16"
            />
          </svg>
          )
        </div>
      </div>

      <div className="text-right text-[0.7vw] max-md:my-[8px] max-md:text-[10px] text-[#787878] font-[600] my-[0.4vw]">
        {" "}
        <span>درباره اخبار یا مقاله</span>
      </div>
      <div
        className={`max-h-[3.6vw]  max-md:max-h-[12%] max-md:text-[10px] mr-[10px] text-[0.6vw] text-right overflow-hidden text-ellipsis ... break-words`}
      >
        <Tooltip
          className="text-gray-700 max-w-[400px] max-h-[200px] overflow-hidden text-ellipsis ... text-right max-md:w-[100px] text-[0.9vw] leading-[1.4vw]"
          size="sm"
          content={`break-words ${description}`}
        >
          {description}
        </Tooltip>

        <div className=" text-[0.6vw] "></div>
      </div>
      <div className="text-right max-md:text-[9px] max-md:my-[8px] text-[0.7vw] text-[#787878] font-[600] my-[0.4vw]">
        {" "}
        <span>منتشرکننده</span>
      </div>
      <div className="w-[80%] max-md:h-[8%] max-md:my-[10px] h-[2.5vw] flex justify-start gap-x-[0.5vw] items-center">
        <div className="w-[2.5vw] h-full rounded-full max-md:w-[15%] bg-gray-400">
          <img src="" alt="" />
        </div>
        <div className="text-right flex flex-col justify-between">
          <span className="text-[0.8vw] font-[600] max-md:text-[10px]">
            {teacherName}
          </span>
        </div>
      </div>

      <div className="w-full h-[5%] flex items-end max-md:h-[10%] max-md:my-[5px]">
        <div className="h-full w-[50%] flex flex-col justify-between">
          <div className="flex h-[50%] items-center gap-x-[0.4vw] my-[0.2vw] font-[600] text-[0.75vw] max-md:text-[12px]">
            <svg
              width="15%"
              height=""
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 2V4M6 2V4"
                stroke="#5e5e5e"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897"
                stroke="#5e5e5e"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.5 8H20.5"
                stroke="#5e5e5e"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z"
                stroke="#5e5e5e"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3 8H21"
                stroke="#5e5e5e"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>{startDate}</span>
          </div>
          <div className="w-full text-[0.9vw] flex gap-x-[0.5vw] max-md:text-[12px]">
            <svg
              width="15%"
              height=""
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z"
                stroke="#5e5e5e"
                stroke-width="1.5"
              />
              <path
                d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z"
                stroke="#5e5e5e"
                stroke-width="1.5"
              />
            </svg>
            {view}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogIthem;
