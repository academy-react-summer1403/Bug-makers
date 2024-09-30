import React from "react";
import { ErrorMessage, Form, Formik } from "formik";
import InputModel from "../../forAll/InputModel.jsx";
import * as yup from "yup";
import LineButt from "../forAllRe/LineButt.jsx";
import GreenButt from "../forAllRe/GreenButt.jsx";
import WhiteButt from "../forAllRe/WhiteButt.jsx";
import ReactCodeInput from "react-code-input";
import '../../forAll/login.css'
import OptInput from "./OptInput.jsx";
import { RigesterStep2 } from "../../../../../Core/Services/Api/auth.js";



const RightReStep2=()=>{
    const validation = yup.object().shape({
    phoneNumber: yup.string().required("این فیلد اجباریست"),
    verifyCode: yup.string().required("این فیلد اجباریست")
    });

    const onSubmit=(values)=>{
        
        alert(JSON.stringify(values))
        console.log(values);
        RigesterStep2(values);
        
    }
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
                    initialValues={{ phoneNumber: "", verifyCode: ""}}
                    validationSchema={validation}
                    onSubmit={(values) => onSubmit(values)}
                    >
                    
                    <Form>
                    <div action="post" className=" flex justify-center flex-col items-center">
                        <span className="text-[#8E8E8E] text-[1vw]">ثبت نام</span>
                        <hr className="w-full mt-[0.94vw] "/>
                        
                        <InputModel name={"first"} placeholder={"شماره تلفن خود را وارد کنید"} label={"شماره تلفن"} img={"../../../../../public/images/Login/portrait.png"}/>


                        <label className="mt-[1.687vw] mb-[0.8vw] text-[#727272] text-[0.885vw] font-normal mr-[0.9vw] w-full text-right" htmlFor="codePicker">کد تایید</label>
                        <OptInput verifyCode={verifyCode}/>
                        <ErrorMessage 
                        name="verifyCode"
                        component={"p"}
                        className="text-red-600"/>  
                        
                        
                        <button type="submit" className="relative mt-[2vw] text-white bg-green-500 rounded-[0.563vw] w-full h-[2.25vw] text-[0.83vw] leading-[1.46vw] p-0 m-0 fade">دریافت مجدد کد تایید 
                            <div class="loader"></div>

                        </button>
                        
                        
                        <div className="mt-[0.615vw] text-[0.833vw] h-[1.575vw] w-full flex justify-between items-center">
                            <span className=" ">عضو سایت هستید؟</span>
                            
                            <span className="cursor-pointer hover:text-blue-400">ورود به حساب کاربری</span>
                        </div>
                        
                    </div>
                    </Form>
                </Formik>

                </div>
        </div>
    );
}
export default RightReStep2;