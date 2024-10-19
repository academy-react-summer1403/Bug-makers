import React from "react";
import PersonalInfo from "./LeftBarDown/PersonalInfo/PersonalInfo";
import { Outlet } from "react-router-dom";
import DashbordEditTop from "./DashbordEditTop/DashbordEditTop";

const DashbordEdit = () => {
  // لیست گزینه‌های پایین نوار


  return (
    <div className="w-full h-full bg-white">
      <div className="w-full h-[40%]">
        <DashbordEditTop />
      </div>
      <div className="w-full h-[60%]">
        <Outlet/>
        {/* <PersonalInfo /> */}
      </div>
    </div>
  );
};
export default DashbordEdit;