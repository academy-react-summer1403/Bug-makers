import React, { useEffect, useRef, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import LineButt from "../register/forAllRe/LineButt.jsx";
import GreenButt from "../register/forAllRe/GreenButt.jsx";
import WhiteButt from "../register/forAllRe/WhiteButt.jsx";
import OptCode from "./optCode.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import InputModel2 from "./input.jsx";
import { GoEyeClosed } from "react-icons/go";
import { FiEye } from "react-icons/fi";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { LoginAPI } from "../../../../Core/Services/Api/auth.js";
import { Button } from "@nextui-org/react";

const TowStepLoginPage = () => {
    const navigate = useNavigate();
    const [resend, setResend] = useState(true);
    const [code, setCode] = useState();
    const [show, setShow] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoading, setIsLoading] = useState(true); 
    const [timeLeft, setTimeLeft] = useState(60); 
    
    const phoneNumberApi = useSelector((state) => state.ToStep.TowStepConfig.phoneNumber);
    const Password = useSelector((state) => state.ToStep.PassWord);

    const setNumber = async () => {
        setPhoneNumber(phoneNumberApi);
    };

    useEffect(() => {
        setNumber();
    }, []);

    useEffect(() => {
        if (isLoading && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setIsLoading(false);
            setTimeLeft(60); // Reset time left for the next use
        }
    }, [isLoading, timeLeft]);

    const validation = yup.object().shape({
        phoneNumber: yup.string().required("به شماره تلفنت احتیاج دارم :)"),
        Password: yup.string().required("به رمز عبورت احتیاج دارم :)"),
        verifyCode: yup.string().required("یعنی کد رو به من نمیگی ؟ 😏")
    });
    
    const mutation = useMutation(
        (data) => LoginAPI(data),
        {
            onSuccess: () => {
                toast.success('کد ارسال شده دوست خوبم 😍');
            },
            onError: () => {
                toast.error('خطا در ارسال کد. لطفاً دوباره امتحان کنید.');
            },
        }
    );

    const handleResendSms = () => {
        if (!isLoading) {
            setIsLoading(true);
            mutation.mutate({ 
                phoneOrGmail: phoneNumberApi, 
                password: Password, 
                rememberMe: true 
            });
        }
    };
const dark = useSelector((state) => state.darkMood);
    return (
      <div
        
        className="w-1/2 max-sm:w-[100%] relative"
      >
        <div className="h-[11.458vw] ml-0.833vw absolute top-[7.292vw] right-[4.167vw] flex justify-center flex-col items-center">
          <LineButt />
          <WhiteButt />
          <LineButt />
          <GreenButt />
          <LineButt />
        </div>
        <div className="mx-[6.4vw] py-[4.163vw] h-full ">
          <Formik
            initialValues={{
              phoneNumber: phoneNumberApi,
              password: Password,
              verifyCode: code,
            }}
            validationSchema={validation}
            onSubmit={(values) => {}}
          >
            {({ touched, errors }) => (
              <Form>
                <div className="relative flex justify-center flex-col items-center">
                  <span className=" text-[1vw]">احراز هویت دوعاملی</span>
                  <hr className="w-full mt-[0.94vw]" />

                  <InputModel2
                  
                    val={phoneNumber}
                    name="phoneNumber"
                    placeholder="شماره تلفن خود را وارد کنید"
                    label="شماره تلفن"
                    img="../../../../../public/images/Login/portrait.png"
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <span className="text-[#40be5d] text-[1vw]">
                      {errors.phoneNumber}
                    </span>
                  )}

                  <label
                    htmlFor="pass"
                    className="mt-[1.687vw]  text-[0.885vw] font-normal mr-[0.9vw] w-full text-right"
                  >
                    رمز عبور
                  </label>
                  <div className="relative top-0 right-0 w-full h-[2.813vw] mt-[0.9vw]">
                    <Field
                      value={Password}
                      name={Password}
                      style={{ background: dark.bgLow, color: dark.textHigh }}
                      className="absolute top-0 right-0 text-[0.729vw] pr-[0.833vw] w-full h-full rounded-[0.563vw] border-[0.104vw] border-[#F8F8F8] shadow-3xl outline-none text-black"
                      placeholder="رمز عبور خود را وارد کنید"
                      type={show ? "password" : "text"}
                    />
                    <div
                      onClick={() => setShow(!show)}
                      className="cursor-pointer absolute left-0 ml-[0.6vw] mt-[1vw]"
                    >
                      {show ? (
                        <FiEye className="w-[1vw] h-[1vw]" color="#cacaca" />
                      ) : (
                        <GoEyeClosed color="#cacaca" />
                      )}
                    </div>
                  </div>
                  {touched.Password && errors.Password && (
                    <span className="text-[#40be5d] text-[1vw]">
                      {errors.Password}
                    </span>
                  )}

                  <label
                    className="mt-[1.687vw] mb-[0.8vw] text-[#727272] text-[0.885vw] font-normal mr-[0.9vw] w-full text-right"
                    htmlFor="codePicker"
                  >
                    کد تایید
                  </label>
                  <OptCode phoneNumber={phoneNumber} password={Password} />

                  <Button
                    onClick={handleResendSms}
                    isDisabled={isLoading}
                    className={`mt-[1.687vw] mb-[0.8vw] text-[#fff] text-[0.885vw] font-normal mr-[0.9vw] w-full text-right ${
                      isLoading ? "bg-[#40BE5D]" : "bg-[#40BE5D]"
                    }`}
                    spinner={
                      <svg
                        className="animate-spin h-5 w-5 text-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          fill="currentColor"
                        />
                      </svg>
                    }
                  >
                    {isLoading
                      ? `کد ارسال شد ${timeLeft}s`
                      : "دریافت مجدد کد تایید"}
                  </Button>

                  <div className="mt-[0.615vw] text-[0.833vw] h-[1.575vw] w-full flex justify-center items-center">
                    <span>مرسی از اینکه مارو انتخاب کردی دوست قشنگم 😘</span>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
};

export default TowStepLoginPage;
