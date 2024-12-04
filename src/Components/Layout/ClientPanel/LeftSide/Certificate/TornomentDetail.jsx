import React  from "react";
import { useSelector } from "react-redux";

const CertificateDetail = ({ setDetailCourse, data }) => {
  console.log(data);

  const dark = useSelector((state) => state.darkMood);

  return (
    <div
      style={{
        background: dark.bgHigh,
        color: dark.textHigh,
      }}
      className={`p-[0.5vw] relative shadow-[0px_0px_15px_0px_#aaa]  rounded-[1vw]  overflow-hidden
          "w-[100%]`}
    >
      <div className="= w-full text-right flex justify-between items-center mb-[0.5vw]">
        <span className="text-[1.4vw] max-md:text-[20px] font-[600]">
          اطلاعت
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
      <div className="w-full flex flex-col gap-y-2">
        <div className="w-full h-[20px] flex gap-x-2">
          <span>تعداد گروه ها</span>:<span>{data.groupCount}</span>
        </div>
        <div className="w-full h-[20px] flex gap-x-2">
          <span>تعداد دانشجویان</span>:<span>{data.refferCount}</span>
        </div>
        <div className="w-full h-[20px] flex gap-x-2">
          <span>تعداد چک لیست ها</span>:<span>{data.checkListCount}</span>
        </div>
        <div className="w-full h-[20px] flex gap-x-2">
          <span>میانگین چک لیست ها</span>:
          <span>{data.currentCheckListAvrage}</span>
        </div>
        <div className="w-full h-[20px] flex gap-x-2">
          <span>میانگین کلی</span>:<span>{data.avgRange}</span>
        </div>
      </div>
    </div>
  );
};
export default CertificateDetail;