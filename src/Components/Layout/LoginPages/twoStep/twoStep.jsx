import React from "react";
import LeftImageBox from "../forAll/LeftImageBox";
import RightReStep2 from "../register/step2/RightReStep2";
import { useQuery } from "react-query";
import TowStepLoginPage from "./toStepLoginPage";
import { FaTentArrowTurnLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
const TwoStepLogin = () => {

    return(

        <div className="text-gray-500 relative border-[#d1d1d1] border-[0.104vw]  w-[64vw]   rounded-[20px] flex justify-evenly overflow-hidden max-sm:w-[35%] max-sm:h-auto max-sm:scale-[2.5]">
           <Link  to={'/sign/Login'}> <FaTentArrowTurnLeft  className="w-[2vw] h-[2vw] cursor-pointer absolute top-[2vw] left-[5vw]" /></Link>
            
            <TowStepLoginPage />
            
            <LeftImageBox leftImage={"../../../../../public/images/Login/Image 9 (1).png"}/>
            
            

        </div>

    );
}
export default TwoStepLogin;