import React, { useEffect, useRef, useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import InputModel from "../../forAll/InputModel.jsx";
import * as yup from "yup";
import LineButt from "../forAllRe/LineButt.jsx";
import GreenButt from "../forAllRe/GreenButt.jsx";
import WhiteButt from "../forAllRe/WhiteButt.jsx";

import '../../forAll/login.css'
import OptInput from "./OptInput.jsx";
import { getItem } from "../../../../../Core/Services/common/storage.services.js";
import { useNavigate } from "react-router-dom";
import { RigesterStep1 } from "../../../../../Core/Services/Api/auth.js";
import { Button } from "@nextui-org/react";



const RightReStep2=()=>{
    const navigate = useNavigate()
    const [resend,setResend]=useState(true)
    const [code,setCode] = useState()
    const [reset,setReset]=useState(false)
     const [isLoading, setIsLoading] = useState(false);
     const [timeLeft, setTimeLeft] = useState(10); 
    const phoneN="phoneN";
    const [phoneNumber,setPhoneNumber] = useState("")
    
    const setNumber =async ()=>{
        setPhoneNumber(getItem(phoneN))
        

    }
    useEffect(()=>{
    setNumber();
    },[])

    useEffect(() => {
      if (!isLoading && timeLeft > 0) {
        const timer = setTimeout(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else if (timeLeft === 0 ) {
        setIsLoading(true);
        setTimeLeft(5); // Reset time left for the next use
      }
    }, [isLoading, timeLeft]);


    const isInitialMount = useRef(true)


        const handelResend = async ()=>{
            if (!isLoading) {
              
              console.log({ phoneNumber: phoneNumber });
              const res = await RigesterStep1({ phoneNumber: phoneNumber });
              setIsLoading(false);
              // alert(isInitialMount)
            }
   
        }
    
    // useEffect(()=>{
    //     setVerify()
    //     const finalValue={phoneNumber:`${phoneNumber}`,verifyCode: `${code}`}
    //     onSubmit(finalValue)
    //     console.log(code)
    // },[code])

    





    const validation = yup.object().shape({
    phoneNumber: yup.string().required("این فیلد اجباریست"),
    verifyCode: yup.string().required("این فیلد اجباریست")
    });
    
    // const onSubmit=(values)=>{
        
    //     // alert(JSON.stringify(values))
    //     console.log(values);
    //     RigesterStep2(values);
        


        
    // }
    // const setVerify = async()=>{
    //     const verify ="verify"
    //     await setCode(getItem(verify))
        
        
    // }
    
// console.log(code)

    return (
      <div className="w-1/2 max-sm:w-[100%] relative">
        <div className="h-[11.458vw] ml-0.833vw absolute top-[7.292vw] right-[4.167vw] flex justify-center flex-col items-center">
          <LineButt />
          <GreenButt />
          <LineButt />
          <WhiteButt />
          <LineButt />
          <WhiteButt />
          <LineButt />
        </div>
        <div className=" mx-[6.4vw] py-[4.163vw] h-full ">
          <Formik
            initialValues={{ phoneNumber: "", verifyCode: `${code}` }}
            validationSchema={validation}
            // onChange={(values) => onSubmit(values)}
          >
            <Form>
              <div
                action="post"
                className="relative flex justify-center flex-col items-center"
              >
                <span className="text-[#8E8E8E] text-[1vw]">ثبت نام</span>
                <hr className="w-full mt-[0.94vw] " />
                <InputModel
                  val={`${getItem(phoneN)}`}
                  name={"phoneNumber"}
                  placeholder={"شماره تلفن خود را وارد کنید"}
                  label={"شماره تلفن"}
                  img={"../../../../../public/images/Login/portrait.png"}
                />
                <label
                  className="mt-[1.687vw] mb-[0.8vw] text-[#727272] text-[0.885vw] font-normal mr-[0.9vw] w-full text-right"
                  htmlFor="codePicker"
                >
                  کد تایید
                </label>
                <OptInput phoneNumber={phoneNumber} />
                <ErrorMessage
                  name="verifyCode"
                  component={"p"}
                  className="text-red-600"
                />
                <Button
                  
                  onClick={handelResend}
                  isDisabled={!isLoading}
                  className={`mt-[1.687vw] mb-[0.8vw] text-[#fff] text-[0.885vw] font-normal mr-[0.9vw] w-full text-right ${
                    !isLoading ? "bg-[#40BE5D]" : "bg-[#40BE5D]"
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
                  {!isLoading
                    ? `کد ارسال شد ${timeLeft}s`
                    : "دریافت مجدد کد تایید"}
                </Button>
                <div className="mt-[0.615vw] text-[0.833vw] h-[1.575vw] w-full flex justify-between items-center">
                  <span className=" ">عضو سایت هستید؟</span>

                  <span
                    onClick={() => {
                      navigate("/sign/login");
                    }}
                    className="cursor-pointer hover:text-blue-400"
                  >
                    ورود به حساب کاربری
                  </span>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    );
}
export default RightReStep2;