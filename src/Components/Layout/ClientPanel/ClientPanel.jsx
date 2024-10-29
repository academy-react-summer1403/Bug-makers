import { Button, Input } from "@nextui-org/react";
import React from "react";
import TopBar from "./common/TopBar";
import RightBar from "./RightBar/RightBar";

import { Outlet } from "react-router-dom";
import RightBarMobile from "./RightBarMobile/RightBarMobile";

const ClientPanel = ()=>{

    
    return (
      <div className="w-[100vw] min-[2500px]:w-[70%] min-[2500px]:mx-auto relative h-[100vh] p-[1.25vw] bg-gray-100 flex justify-between text-[#272727] text-right">
        <div className="w-[20%] h-[100%] max-md:hidden">
          <RightBar />
        </div>
        <div className=" fixed z-50 h-[8%] w-[95%] bottom-[1%] left-[50%] translate-x-[-50%] hidden max-md:block">
          <RightBarMobile />
        </div>
        <div className="w-[79%] h-[100%] flex flex-col justify-between max-md:w-[100%]">
          <div className="w-full h-[8%] rounded-[0.6vw] bg-white ">
            <TopBar />
          </div>
          <div className="w-full h-[91%] rounded-[0.6vw] bg-transparent overflow-hidden">
            <Outlet />
            {/* <LeftBar/> */}
          </div>
        </div>
      </div>
    );
}
export default ClientPanel