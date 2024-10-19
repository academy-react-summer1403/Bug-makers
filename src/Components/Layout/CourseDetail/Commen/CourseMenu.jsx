// Menu.js
import React, { useState } from "react";

const CourseMenu = ({handelPage}) => {
  const [selected, setSelected] = useState(0);

  const handleClick = (index) => {
    setSelected(index);
  };

  return (
    <div className="w-full h-[3vw] rounded-[0.52vw] shadow-[-0.26vw_0.26vw_0.26vw_0_rgba(0,0,0,0.1)] flex justify-center gap-x-[11vw] items-center text-[#9F9F9F] text-[1.09vw]">
      {["توضیحات", "سرفصل ها", "ارسال تسک", "نظرات کاربران", "حسابداری"].map(
        (item, index) => (
          <div
            key={index}
            onClick={() => {
              handleClick(index);
              handelPage(index);
            }}
            className={`cursor-pointer duration-200 mb-[1vw] px-[0.5vw] ${
              selected === index
                ? "border-b-[0.2vw] pb-[1vw] border-blue-500"
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
