import React from "react";
import { Formik,Form } from "formik";
import InputModel from "../forAll/InputModel.jsx";
import * as yup from "yup";
import { ForgetPassStep1 } from "../../../../Core/Services/Api/auth.js";



const RightPassBox=()=>{
    const validation = yup.object().shape({
    email: yup.string().required("این فیلد اجباریست"),
    });

    const onSubmit=(values)=>{
        
        alert(JSON.stringify(values))
        console.log(values);
        ForgetPassStep1(values);
        
    }
    return(
        <div className="w-1/2 max-sm:w-[100%]">
                <div className=" mx-[6.51vw] py-[4.163vw] h-full ">
                    <Formik
                    initialValues={{ email: "", baseUrl: "https://localhost:5173/resetpassword"}}
                    validationSchema={validation}
                    onSubmit={(values)=>{onSubmit(values)}}
                    >
                    
                    <Form>
                    <div action="post" className=" flex justify-center flex-col items-center">
                        <span className="text-[#8E8E8E] text-[1vw]">فراموشی رمز عبور</span>
                        <hr className="w-full mt-[0.94vw] "/>
                        
                        <InputModel name={"email"} placeholder={" ایمیل خود را وارد کنید"} label={"ایمیل"} img={"../../../../../public/images/Login/portrait.png"}/>
                        

                        
                        <button className="mt-[2vw] text-white bg-green-500 rounded-[0.563vw] w-full h-[2.25vw] text-[0.83vw] leading-[1.46vw] p-0 m-0">ارسال لینک بازیابی</button>
                        
                        <div className="mt-[0.615vw] text-[0.833vw] h-[1.575vw] w-full flex justify-evenly items-center">
                            <span className="cursor-pointer hover:text-blue-400">ورود به حساب کاربری</span>
                            <div className="h-3/4 border-[0.104vw] w-0"></div>
                            <span className="cursor-pointer hover:text-blue-400">هم اکنون ثبت نام کنید</span>
                        </div>
                        
                    </div>
                    </Form>
                </Formik>

                </div>
        </div>
    );
}
export default RightPassBox;