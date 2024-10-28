import React from "react";
import Map from "./map";

const Address =()=>{
    return (
      <div className=" w-full h-full p-[1vw] max-md:pb-[50px]">
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