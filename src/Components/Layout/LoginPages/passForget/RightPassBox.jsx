import React from "react";
import { Formik,Form } from "formik";
import InputModel from "../forAll/InputModel.jsx";
import * as yup from "yup";
import { ForgetPassStep1 } from "../../../../Core/Services/Api/auth.js";
import { useNavigate } from "react-router-dom";



const RightPassBox=()=>{
    const navigate = useNavigate()
    const validation = yup.object().shape({
    email: yup.string().required("لطفا ایمیل خود را صحیح وارد کنید"),
    });

    const onSubmit=(values)=>{
        
        
        console.log(values);
        ForgetPassStep1(values);
        
    }
    return(
        <div className="w-1/2 max-sm:w-[100%]">
                <div className=" mx-[6.51vw] py-[4.163vw] h-full ">
                    <Formik
                    initialValues={{ email: "", baseUrl: "http://localhost:5173/sign/resetPass/:"}}
                    validationSchema={validation}
                    onSubmit={(values)=>{onSubmit(values)}}
                    >
                    
                    <Form>
                    <div action="post" className=" flex justify-center flex-col items-center">
                        <span className="text-[#8E8E8E] text-[1vw]">فراموشی رمز عبور</span>
                        <hr className="w-full mt-[0.94vw] "/>
                        
                        <InputModel name={"email"} placeholder={" ایمیل خود را وارد کنید"} label={"ایمیل"} img={"../../../../../public/images/Login/portrait.png"} type={"email"}/>
                        

                        
                        <button className="mt-[2vw] text-white bg-green-500 rounded-[0.563vw] w-full h-[2.25vw] text-[0.83vw] leading-[1.46vw] p-0 m-0">ارسال لینک بازیابی</button>
                        
                        <div className="mt-[0.615vw] text-[0.833vw] h-[1.575vw] w-full flex justify-evenly items-center">
                            <span onClick={()=>{navigate("/sign/login")}} className="cursor-pointer hover:text-blue-400">ورود به حساب کاربری</span>
                            <div className="h-3/4 border-[0.104vw] w-0"></div>
                            <span onClick={()=>{navigate("/sign/rigester/step1")}} className="cursor-pointer hover:text-blue-400">هم اکنون ثبت نام کنید</span>
                        </div>
                        
                    </div>
                    </Form>
                </Formik>

                </div>
        </div>
    );
}
export default RightPassBox;