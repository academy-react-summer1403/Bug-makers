// Menu.js
import React, { useState } from "react";

const CourseMenu = ({handelPage}) => {
  const [selected, setSelected] = useState(0);

  const handleClick = (index) => {
    setSelected(index);
  };

  return (
    <div className=" max-[850px]:text-[2vw] max-[850px]:gap-x-[7vw] max-[750px]:text-[2.4vw] max-[750px]:gap-x-[6vw] max-custom4:flex-col max-custom4:h-auto max-custom4:gap-[2vw] max-custom3:text-[3vw]   whitespace-nowrap /* end responsive  */ w-full h-[3vw] rounded-[0.52vw] shadow-[-0.26vw_0.26vw_0.26vw_0_rgba(0,0,0,0.1)] flex justify-center gap-x-[11vw] items-center text-[#9F9F9F] text-[1.09vw]">
      {["توضیحات", "سرفصل ها", "ارسال تسک", "نظرات کاربران", "حسابداری"].map(
        (item, index) => (
          <div
            key={index}
            onClick={() => {
              handleClick(index);
              handelPage(index);
            }}
            className={` cursor-pointer duration-200 mb-[1vw]  px-[0.5vw] ${
              selected === index
                ? "max-custom4:bg-white max-custom4:w-full max-custom4:rounded-lg border-b-[0.2vw] pb-[1vw] border-blue-500"
                : ""
            }`}
          >
            {item}
          </div>
        )
      )}
    </div>
  );
};

export default CourseMenu;
