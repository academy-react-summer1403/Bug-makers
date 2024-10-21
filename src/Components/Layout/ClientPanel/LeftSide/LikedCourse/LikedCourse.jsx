import React, { useState } from "react";
import CoursePage from "./Base";

const LikedCourse = () => {
  const [showMoreCourse, setShowMoreCourse] = useState(false);

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-[8%]" ></div>
      <div className="w-full h-[23vw] rounded-[0.5vw] pb-[0.2vw] pt-[0.2vw] px-[0.5vw] bg-white overflow-auto mt-[0.2vw] shadow-lg">
        <CoursePage
          show={false}
          itemPerpage={4}
          setShowMoreCourse={setShowMoreCourse}
        />
      </div>
      <div
        className={`W-[100%] h-[41vw] pb-[1vw] pt-[1vw] px-[0.5vw] bg-white overflow-auto absolute z-[5000] top-[0vw] right-[0vw]
            ${showMoreCourse == true ? "block" : "hidden"}
            `}
      >
        {/* <CourseTable /> */}
        <CoursePage
          show={true}
          itemPerpage={9}
          setShowMoreCourse={setShowMoreCourse}
        />
        {/* <BlogPage/> */}
      </div>
    </div>
  );
};
export default LikedCourse;
