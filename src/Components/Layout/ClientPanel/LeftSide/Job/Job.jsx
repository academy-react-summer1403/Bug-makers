import React, { useState } from "react";
import { useSelector } from "react-redux";
import CoursePage from "./Base";

const Job = () => {
  const dark = useSelector((state) => state.darkMood);
  const [showMoreCourse, setShowMoreCourse] = useState(false);

  return (
    <div
      style={{ background: dark.bgHigh, color: dark.textHigh }}
      className="relative w-full h-full"
    >
      <div className="w-full h-full rounded-[0.5vw] pb-[0.2vw] pt-[0.2vw] px-[0.5vw] overflow-auto mt-[0.2vw] shadow-lg">
        <CoursePage
          location={"Tornoment"}
          name={"مسابقات من"}
          show={false}
          itemPerpage={10}
          setShowMoreCourse={setShowMoreCourse}
        />
      </div>
    </div>
  );
};
export default Job