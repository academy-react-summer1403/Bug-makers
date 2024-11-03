import React, { useEffect } from "react";
import PersonalInfo from "./LeftBarDown/PersonalInfo/PersonalInfo";
import { Outlet } from "react-router-dom";
import DashbordEditTop from "./DashbordEditTop/DashbordEditTop";
import { ProfileGet } from "../../../../Core/Services/Api/Client/Profile";

import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { setClientInfo } from "../../../../Redux/Slice/ClientInfo/ClientInfo";


const DashbordEdit = () => {

      const dispatch = useDispatch();

      const { data: getProfileInfo } = useQuery({
        queryKey: ["getProfileInfo"],
        queryFn: ProfileGet,
        onSuccess: (data) => {
          dispatch(setClientInfo(data || []));
        },
      });


  // const CourseListItem = useSelector(
  //     (state) => state.ClientInfoSlice.ClientInfo
  //   );
  //   console.log(CourseListItem);
  // لیست گزینه‌های پایین نوار
const dark = useSelector((state) => state.darkMood);

  return (
    <div
      className="w-full h-full  "
      style={{ background: dark.bgHigh, color: dark.textHigh }}
    >
      <div className="w-full h-[40%]">
        <DashbordEditTop />
      </div>
      <div className="w-full h-[60%] ">
        <Outlet />
        {/* <PersonalInfo /> */}
      </div>
    </div>
  );
};
export default DashbordEdit;