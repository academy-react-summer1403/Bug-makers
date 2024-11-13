import React, { useState, useEffect } from "react";
import { setItem } from "../../../../Core/Services/common/storage.services";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { twoStepVerify } from "../../../../Core/Services/Api/auth";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoginToken } from "../../../../Redux/Slice/Login/Login";

const OptCode = ({ phoneNumber, password }) => {
    const dispatch = useDispatch()
    const dark = useSelector((state) => state.darkMood);
    const [otp, setOtp] = useState(new Array(5).fill(""));
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const mutation = useMutation(
        (code) => twoStepVerify(code, phoneNumber, password),
        {
            onSuccess: (response) => {
                if (response.token !== null) {
                    setItem("token", response.token); 
                    dispatch(setLoginToken(response.token));
                    navigate("/");
                    toast.success('دوست خوبم خوش اومدی به کمپ ما 😀');

                } else {
                    toast.success('کد رو اشتباه نوشتی قشنگم؟ 🙂');
                    setErrorMessage("کد وارد شده اشتباه است، مجدد امتحان کنید");
                    setOtp(new Array(5).fill(""));
                    document.querySelectorAll('input[name="verifyCode"]')[0].focus();
                }
            },
            onError: () => {
                setErrorMessage("خطایی در ارتباط با سرور وجود دارد.");
            }
        }
    );
    

    useEffect(() => {
        if (otp.every((digit) => digit !== "")) {
            verifyCode(otp.join(""));
        }
    }, [otp]);

    const verifyCode = (code) => {
        mutation.mutate(code);
    };

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.value && element.nextSibling) {
            element.nextSibling.focus();
        } else if (!element.value && element.previousSibling) {
            element.previousSibling.focus();
        }
    };

    return (
      <div className="flex flex-col items-center" dir="ltr">
        <div className="flex gap-[2vw]">
          {otp.map((data, index) => (
            <input
              style={{ background: dark.bgLow, color: dark.textHigh }}
              className="w-[2.083vw] h-[2.083vw] text-center border-[0.104vw] border-gray-300 focus:border-blue-500 rounded-[0.4vw]   text-[0.8vw]"
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
        {mutation.isLoading && <p>در حال بارگذاری...</p>} {/* پیام بارگذاری */}
        {errorMessage && (
          <p className="text-red-500 mt-[0.6vw] text-[0.7vw]">{errorMessage}</p>
        )}
      </div>
    );
};

export default OptCode;
