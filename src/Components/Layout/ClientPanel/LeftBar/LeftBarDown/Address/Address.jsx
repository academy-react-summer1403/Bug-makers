import React from "react";
import Map from "./map";

const Address =()=>{
    return (
      <div className=" w-full h-full p-[2vw">
        <span className="block mb-[2vw]">
          داخل نقشه موقعیت مکانی محل سکونت خود را انتخاب کنید
        </span>

        <div className="h-[80%] w-full rounded-[0.5vw] flex justify-center items-center">
          <Map />
        </div>
      </div>
    );
}
export default Address