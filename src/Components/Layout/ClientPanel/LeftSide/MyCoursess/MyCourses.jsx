import React, { useState } from "react";
import CoursePage from "../Dashbord/CourseListDeatail/Base";
import { useSelector } from "react-redux";

const MyCourses = () => {

  const [showMoreCourse, setShowMoreCourse] = useState(false);

  
const dark = useSelector((state) => state.darkMood);
  return (
    <div
      style={{ background: dark.bgHigh, color: dark.textHigh }}
      className="relative w-full h-full"
    >
      <div className="w-full h-full rounded-[0.5vw] pb-[0.2vw] pt-[0.2vw] px-[0.5vw]  overflow-auto mt-[0.2vw] shadow-lg">
        <CoursePage
          location={"CourseServ"}
          show={true}
          itemPerpage={9}
          setShowMoreCourse={setShowMoreCourse}
          name={"دوره های من"}
          point={"myCourse"}
        />
      </div>
    </div>
  );
};
export default MyCourses;
