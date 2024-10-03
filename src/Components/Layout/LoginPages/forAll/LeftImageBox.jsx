import React from "react";

import './login.css'

const LeftImageBox =({leftImage})=>{
    return(
        <div className="w-1/2 flex justify-center max-sm:hidden items-center">
            <img src={leftImage} alt="" className="w-[90%] h-[70%]"/>
        </div>
    );
}
export default LeftImageBox;