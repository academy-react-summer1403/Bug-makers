import React, { useState } from "react";

function OptInput({verifyCode}) {
    const [otp, setOtp] = useState(new Array(5).fill(""));

    const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input box
    if (element.nextSibling) {
        element.nextSibling.focus();
    }
    };

return (
<div className="flex flex-col items-center">
    <div className="flex gap-[2vw] ">
        {otp.map((data, index) => (
            <input
            className="w-[2.083vw] h-[2.083vw] text-center border-[0.104vw] border-gray-300 focus:border-blue-500 rounded-md bg-white text-gray-800"
            type="text"
            name="verifyCode"
            maxLength="1"
            key={index}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onFocus={(e) => e.target.select()}
            />
        ))}
    </div>
    {/* <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md">
        دریافت مجدد کد تایید
    </button> */}
    </div>
);
}

export default OptInput;