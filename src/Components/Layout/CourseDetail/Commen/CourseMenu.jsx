// Menu.js
import React, { useState } from "react";

const CourseMenu = ({handelPage}) => {
  const [selected, setSelected] = useState(0);

  const handleClick = (index) => {
    setSelected(index);
  };

  return (
    <div className="bg-white   whitespace-nowrap /* end responsive  */ pt-2 w-full h-16 rounded-[0.52vw] shadow-[-0.26vw_0.26vw_0.26vw_0_rgba(0,0,0,0.1)] flex  gap-5 items-center text-[#9F9F9F]  text-[1.09vw]">
      {["توضیحات", , "دیدگاه ها"].map(
        (item, index) => (
          <div
            key={index}
            onClick={() => {
              handleClick(index);
              handelPage(index);
            }}
            className={` h-[90%] max-custom4:w-[50%] academyH1 text-[0.8vw] max-md:text-[14px]  leading-10 cursor-pointer mt-5 duration-200 mb-[1vw]  pr-5 ${
              selected === index
                ? "max-custom4:bg-white  max-custom4:m-0  border-b-[0.2vw] max-md:border-b-2 pr-5  border-blue-500"
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
