import React from "react";
import LeftBarTop from "./LeftBarTop/LeftBarTop";
import PersonalInfo from "./LeftBarDown/PersonalInfo/PersonalInfo";

const LeftBar = ()=>{
    return (
      <div className="w-full h-full">
        <div className="w-full h-[40%]">
          <LeftBarTop />
        </div>
        <div className="w-full h-[60%]">
            <PersonalInfo/>
        </div>
      </div>
    );
}
export default LeftBar