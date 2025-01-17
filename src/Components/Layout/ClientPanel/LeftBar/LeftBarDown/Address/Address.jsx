import React from "react";
import Map from "./map";
import { useSelector } from "react-redux";

const Address =()=>{
  const dark = useSelector((state) => state.darkMood);
    return (
      <div
        style={{ background: dark.bgHigh, color: dark.textHigh }}
        className=" w-full h-full p-[1vw] max-md:pb-[50px]"
      >
        <span className="block my-[1vw] text-[0.9vw] max-md:text-[14px] max-md:my-[10px]">
          داخل نقشه موقعیت مکانی محل سکونت خود را انتخاب کنید
        </span>

        <div className="h-[80%] w-full rounded-[0.5vw] flex justify-center items-center">
          <Map />
        </div>
      </div>
    );
}
export default Address