import React from "react";
import PersonalInfo from "./LeftBarDown/PersonalInfo/PersonalInfo";
import { Outlet } from "react-router-dom";
import DashbordEditTop from "./DashbordEditTop/DashbordEditTop";

const DashbordEdit = () => {
  // لیست گزینه‌های پایین نوار
  const tabs = [
    { id: "Personal", label: "اطلاعات شخصی" },
    { id: "Picture", label: "عکس پروفایل" },
    { id: "Address", label: "آدرس سکونت" },
    { id: "Links", label: "لینک‌ها" },
  ];

  return (
    <div className="w-full h-full bg-white">
      <div className="w-full h-[40%]">
        <DashbordEditTop tabs={tabs} />
      </div>
      <div className="w-full h-[60%]">
        <Outlet />
        {/* <PersonalInfo /> */}
      </div>
    </div>
  );
};
export default DashbordEdit;