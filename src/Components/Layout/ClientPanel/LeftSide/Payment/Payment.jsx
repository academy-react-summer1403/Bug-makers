import React, { useState } from "react";
import CoursePage from "../Dashbord/CourseListDeatail/Base";

const Payment = () => {
  const [showMoreCourse, setShowMoreCourse] = useState(false);

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full rounded-[0.5vw] pb-[0.2vw] pt-[0.2vw] px-[0.5vw] bg-white overflow-auto mt-[0.2vw] shadow-lg">
        <CoursePage
          location={"CourseServ"}
          payment={true}
          show={true}
          itemPerpage={9}
          setShowMoreCourse={setShowMoreCourse}
          name={"پرداختی ها"}
          point={"myCourse"}
        />
      </div>
    </div>
  );
};
export default Payment;
