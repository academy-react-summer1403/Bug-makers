import React from "react";
import { Formik } from "formik";
import InputModel from "../../forAll/InputModel.jsx";
import * as yup from "yup";
import LineButt from "../forAllRe/LineButt.jsx";
import GreenButt from "../forAllRe/GreenButt.jsx";
import WhiteButt from "../forAllRe/WhiteButt.jsx";



const RightReStep1=()=>{
    const validation = yup.object().shape({
    first: yup.string().required("این فیلد اجباریست"),
    secound: yup.string().required("این فیلد اجباریست")
    });
    return(
        <div className="w-1/2 max-sm:w-[100%] relative">
                <div className="h-[11.458vw] ml-0.833vw absolute top-[7.292vw] right-[4.167vw] flex justify-center flex-col items-center">
                    <LineButt/>
                    <GreenButt/>
                    <LineButt/>
                    <WhiteButt/>
                    <LineButt/>
                    <WhiteButt/>
                    <LineButt/>
                </div>
                <div className=" mx-[6.4vw] py-[4.163vw] h-full ">
                    <Formik
                    initialValues={{ first: "", secound: ""}}
                    validationSchema={validation}
                    >
                    
                    {(form) => (
                    <div action="post" className=" flex justify-center flex-col items-center">
                        <span className="text-[#8E8E8E] text-[1vw]">ثبت نام</span>
                        <hr className="w-full mt-[0.94vw] "/>
                        
                        <InputModel name={"first"} placeholder={"شماره تلفن خود را وارد کنید"} label={"شماره تلفن"} img={"../../../../../public/images/Login/portrait.png"}/>
                        

                        
                        
                        <button className="mt-[2vw] text-white bg-green-500 rounded-[0.563vw] w-full h-[2.25vw] text-[0.83vw] leading-[1.46vw] p-0 m-0">دریافت کد تایید</button>
                        
                        <div className="mt-[0.615vw] text-[0.833vw] h-[1.575vw] w-full flex justify-between items-center">
                            <span className=" ">عضو سایت هستید؟</span>
                            
                            <span className="cursor-pointer hover:text-blue-400">ورود به حساب کاربری</span>
                        </div>
                        
                    </div>
                    )}
                </Formik>

                </div>
        </div>
    );
}
export default RightReStep1;