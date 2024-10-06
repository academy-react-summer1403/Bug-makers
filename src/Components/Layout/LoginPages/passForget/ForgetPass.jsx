import { Formik } from "formik";
import InputModel from "../forAll/InputModel.jsx";
import React from "react";
import * as yup from "yup";

import LeftImageBox from "../forAll/LeftImageBox.jsx";
import RightPassBox from "./RightPassBox.jsx";


const ForgetPass = () => {



    return(
        
        <div className="text-gray-500 border-[#d1d1d1] border-[0.104vw]  w-[64vw] h-[30vw] rounded-[20px] flex justify-evenly overflow-hidden max-sm:w-[35%] max-sm:h-auto max-sm:scale-[2.5]">
            <RightPassBox/>
            <LeftImageBox leftImage={"../../../../../public/images/Login/Image 8.png"}/>
            
            

        </div>
        
    );
}
export default ForgetPass;