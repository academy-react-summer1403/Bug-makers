import React from "react";
import LeftImageBox from "../../forAll/LeftImageBox";
import RightReStep1 from "./RightReStep1";


const ReStep1 = () => {

    

    return(

        <div className="text-gray-500 border-[#d1d1d1] border-[0.104vw]  w-[64vw] h-[30vw] rounded-[20px] flex justify-evenly overflow-hidden max-sm:w-[35%] max-sm:h-auto max-sm:scale-[2.5]">

            
            <RightReStep1/>
            
            <LeftImageBox leftImage={"../../../../../public/images/Login/Image 7.png"}/>
            
            

        </div>

    );
}
export default ReStep1;