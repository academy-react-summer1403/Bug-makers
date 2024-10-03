import React, { useState, useEffect } from "react";
import { setItem } from "../../../../../Core/Services/common/storage.services";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RigesterStep2 } from "../../../../../Core/Services/Api/auth";

function OptInput({ phoneNumber }) {
    const [otp, setOtp] = useState(new Array(5).fill("")); // حالت اولیه برای کد تایید
    const [errorMessage, setErrorMessage] = useState(""); // وضعیت برای پیام خطا
    const navigate = useNavigate(); // استفاده از useNavigate برای هدایت

    useEffect(() => {
        if (otp.every((digit) => digit !== "")) { // بررسی پر بودن تمام خانه‌ها
            const completedCode = otp.join(""); // تنظیم کد کامل
            verifyCode(completedCode); // بررسی کد بلافاصله بعد از پر شدن تمامی باکس‌ها
        }
    }, [otp]);

    const verifyCode = async (code) => {
        try {
            // ارسال درخواست به API برای بررسی صحت کد
            const response = await RigesterStep2({"phoneNumber" : phoneNumber , "verifyCode" : code});
                

            // console.log(response); // اضافه کردن این خط برای بررسی پاسخ API

            if (response) {
                // اگر کد درست بود، نویگیت به صفحه بعد
                await setItem("verify", code);
                navigate("/sign/rigester/step3"); // هدایت به صفحه بعد
            } else {
                setErrorMessage("کد وارد شده اشتباه است، مجدد امتحان کنید"); // نمایش پیام به کاربر
                setOtp(new Array(5).fill("")); // خالی کردن تمام خانه‌ها
                document.querySelectorAll('input[name="verifyCode"]')[0].focus(); // بازگرداندن نشانگر به اولین خانه
            }
        } catch (error) {
            console.error("Error verifying code:", error);
            setErrorMessage("خطایی رخ داد، لطفاً دوباره امتحان کنید");
        }
    };

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Focus next input box if value is added
        if (element.value && element.nextSibling) {
            element.nextSibling.focus();
        } else if (!element.value && element.previousSibling) {
            // Focus previous input box if value is removed
            element.previousSibling.focus();
        }
    };

    return (
        <div className="flex flex-col items-center" dir="ltr">
            <div className="flex gap-[2vw] ">
                {otp.map((data, index) => (
                    <input
                        className="w-[2.083vw] h-[2.083vw] text-center border-[0.104vw] border-gray-300 focus:border-blue-500 rounded-[0.4vw] bg-white text-gray-800 text-[0.8vw]"
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
            {errorMessage && <p className="text-red-500 mt-[0.6vw] text-[0.7vw]">{errorMessage}</p>} {/* نمایش پیام خطا */}
        </div>
    );
}

export default OptInput;
