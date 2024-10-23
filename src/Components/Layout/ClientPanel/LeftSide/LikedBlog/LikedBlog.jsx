import React, { useState } from "react";
import CoursePage from "../LikedCourse/Base";



const LikedBlog = () => {
  const [showMoreCourse, setShowMoreCourse] = useState(false);

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full rounded-[0.5vw] pb-[0.2vw] pt-[0.2vw] px-[0.5vw] bg-white overflow-auto mt-[0.2vw] shadow-lg">
        <CoursePage
          location={"BlogFav"}
          name={"علاقه‌مندی مقالات"}
          show={false}
          itemPerpage={10}
          setShowMoreCourse={setShowMoreCourse}
        />
      </div>
    </div>
  );
};
export default LikedBlog;
