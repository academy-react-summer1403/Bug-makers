
import React from "react";


import LeftImageBox from "../forAll/LeftImageBox";
import RightLoginBox from "./RightLoginBox";
import { useSelector } from "react-redux";




const Login = () => {

    
const dark = useSelector((state) => state.darkMood);
console.log(dark.bgLow)
    return (
      <div
        className=" border-[#d1d1d1] border-[0.104vw]  w-[64vw] h-[35vw] rounded-[20px] flex justify-evenly overflow-hidden max-sm:w-[35%] max-sm:h-auto max-sm:scale-[2.5]"
        style={{ background: dark.bgLow, color: dark.textHigh }}
      >
        <RightLoginBox />

        <LeftImageBox
          leftImage={"../../../../../public/images/Login/Image 7.png"}
        />
      </div>
    );
}
export default Login;