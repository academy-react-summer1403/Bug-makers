import React, { useState, useEffect } from "react";
import { setItem } from "../../../../../Core/Services/common/storage.services";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OptInput({ verifyCode, phoneNumber }) {
    const [otp, setOtp] = useState(new Array(5).fill(""));
    const [completedCode, setCompletedCode] = useState("");
    const navigate = useNavigate(); // استفاده از useNavigate برای هدایت

    useEffect(() => {
        const timer = setTimeout(() => {
            if (otp.every((digit) => digit !== "")) {
                setCompletedCode(otp.join(""));
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [otp]);

    useEffect(() => {
        if (completedCode) {
            const verifyCode = async () => {
                try {
                    // درخواست به API برای بررسی صحت کد
                    const response = await axios.post('https://classapi.sepehracademy.ir/api/Sign/SendVerifyMessage', { code: completedCode, phoneNumber:phoneNumber });
                    
                    if (response.data.success) {
                        // اگر کد درست بود، نویگیت به صفحه بعد
                        await setItem("verify", completedCode);
                        navigate("/sign/rigester/step3"); // هدایت به صفحه بعد
                    } else {
                        alert("کد وارد شده اشتباه است");
                    }
                } catch (error) {
                    console.error("Error verifying code:", error);
                }
            };
            verifyCode();
        }
    }, [completedCode, navigate, phoneNumber]);

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
        </div>
    );
}

export default OptInput;
