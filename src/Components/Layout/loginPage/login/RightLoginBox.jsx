import React from "react";
import { Formik } from "formik";
import InputModel from "../forAll/InputModel.jsx";
import * as yup from "yup";



const RightLoginBox=()=>{
    const validation = yup.object().shape({
    first: yup.string().required("این فیلد اجباریست"),
    secound: yup.string().required("این فیلد اجباریست")
    });
    return(
        <div className="w-1/2 max-sm:w-[100%]">
                <div className=" mx-[6.51vw] py-[4.163vw] h-full ">
                    <Formik
                    initialValues={{ first: "", secound: ""}}
                    validationSchema={validation}
                    >
                    
                    {(form) => (
                    <div action="post" className=" flex justify-center flex-col items-center">
                        <span className="text-[#8E8E8E] text-[1vw]">ورود به حساب کاربری</span>
                        <hr className="w-full mt-[0.94vw] "/>
                        
                        <InputModel name={"first"} placeholder={"شماره یا ایمیل خود را وارد کنید"} label={"حساب"} img={"../../../../../public/images/Login/portrait.png"}/>
                        

                        <InputModel name={"secound"} placeholder={"رمز عبور خود را وارد کنید" } label={"رمز عبور"} img={"../../../../../public/images/Login/lock.png"}/>
                        
                        <button className="mt-[2vw] text-white bg-green-500 rounded-[0.563vw] w-full h-[2.25vw] text-[0.83vw] leading-[1.46vw] p-0 m-0">ورود به حساب</button>
                        
                        <div className="mt-[0.615vw] text-[0.833vw] h-[1.575vw] w-full flex justify-evenly items-center">
                            <span className="cursor-pointer hover:text-blue-400">هم اکنون ثبت نام کنید</span>
                            <div className="h-3/4 border-[0.104vw] w-0"></div>
                            <span className="cursor-pointer hover:text-blue-400">فراموشی رمز عبور</span>
                        </div>
                        
                    </div>
                    )}
                </Formik>

                </div>
        </div>
    );
}
export default RightLoginBox;