import { Button, Input } from "@nextui-org/react";
import React from "react";
import TopBar from "./common/TopBar";
import RightBar from "./RightBar/RightBar";
import LeftBar from "./LeftBar/LeftBar";

const ClientPanel = ()=>{

    
    return (
      <div className="w-[100vw] h-[48vw] p-[1.25vw] bg-gray-100 flex justify-between text-[#272727] text-right">
        <div className="w-[20%] h-[100%]">
          <RightBar />
        </div>
        <div className="w-[79%] h-[100%] flex flex-col justify-between">
          <div className="w-full h-[8%] rounded-[0.6vw] bg-white">
            <TopBar />
          </div>
          <div className="w-full h-[91%] rounded-[0.6vw] bg-white">
            <LeftBar/>
          </div>
        </div>
      </div>
    );
}
export default ClientPanel