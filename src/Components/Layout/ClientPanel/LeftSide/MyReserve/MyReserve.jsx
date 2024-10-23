import React, { useState } from "react";
import CoursePage from "../LikedCourse/Base";


const MyReserve = () => {
  const [showMoreCourse, setShowMoreCourse] = useState(false);

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full rounded-[0.5vw] pb-[0.2vw] pt-[0.2vw] px-[0.5vw] bg-white overflow-auto mt-[0.2vw] shadow-lg">
        <CoursePage
          location={"CourseFav"}
          name={"رزرو های من"}
          show={false}
          itemPerpage={10}
          setShowMoreCourse={setShowMoreCourse}
        />
      </div>
    </div>
  );
};
export default MyReserve;
