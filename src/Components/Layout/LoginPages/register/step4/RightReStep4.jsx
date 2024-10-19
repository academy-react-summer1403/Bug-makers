import React from "react";
import { Form, Formik } from "formik";
import InputModel from "../../forAll/InputModel.jsx";
import * as yup from "yup";
import LineButt from "../forAllRe/LineButt.jsx";
import GreenButt from "../forAllRe/GreenButt.jsx";
import WhiteButt from "../forAllRe/WhiteButt.jsx";
import { RigesterStep3 } from "../../../../../Core/Services/Api/auth.js";
import { getItem } from "../../../../../Core/Services/common/storage.services.js";
import { useNavigate } from "react-router-dom";


const RightReStep4=()=>{
    const navigate = useNavigate()
    const validation = yup.object().shape({
    password: yup.string().required("این فیلد اجباریست"),
    gmail: yup.string().required("این فیلد اجباریست")
    });
    const phoneN="phoneN";
    const phoneNumber = getItem(phoneN)

    const onSubmit=async (values)=>{
        
        // alert(JSON.stringify(values))
        
        const response= await RigesterStep3(values);
        if(response){
            console.log(response);
            // alert(" شما با موفقیت ثبت نام شدید")

            navigate("/")     
        }
        else{
            // alert("ثبت نام موفقیت امیز نبود مجدد امتحان کنید")
            navigate("/sign/rigester/step1")  
        }
        
        
    }
    return(
        <div className="w-1/2 max-sm:w-[100%] relative">
                <div className="h-[11.458vw] ml-0.833vw absolute top-[7.292vw] right-[4.167vw] flex justify-center flex-col items-center">
                    <LineButt/>
                    <WhiteButt/>
                    <LineButt/>
                    <WhiteButt/>
                    <LineButt/>
                    <GreenButt/>
                    <LineButt/>
                </div>
                <div className=" mx-[6.4vw] py-[4.163vw] h-full ">
                    <Formik
                    initialValues={{ password: "", gmail: "",phoneNumber: `${phoneNumber}`}}
                    validationSchema={validation}
                    onSubmit={(values)=>{onSubmit(values)}}
                    >
                    
                    <Form>
                    <div action="post" className=" flex justify-center flex-col items-center">
                        <span className="text-[#8E8E8E] text-[1vw]">ثبت نام</span>
                        <hr className="w-full mt-[0.94vw] "/>
                        
                        <InputModel name={"gmail"} placeholder={"ایمیل خود را وارد کنید"} label={"ایمیل"} img={"../../../../../public/images/Login/portrait.png"}/>
                        <InputModel name={"password"} placeholder={"رمز عبور خود را وارد کنید" } label={"رمز عبور"} img={"../../../../../public/images/Login/lock.png"}/>


                        
                        
                        <button type="submit" className="mt-[2vw] text-white bg-green-500 rounded-[0.563vw] w-full h-[2.25vw] text-[0.83vw] leading-[1.46vw] p-0 m-0">تکمیل ثبت نام</button>
                        
                        <div className="mt-[0.615vw] text-[0.833vw] h-[1.575vw] w-full flex justify-between items-center">
                            <span className=" ">عضو سایت هستید؟</span>
                            
                            <span onClick={()=>{navigate("/sign/login")}} className="cursor-pointer hover:text-blue-400">ورود به حساب کاربری</span>
                        </div>
                        
                    </div>
                    </Form>
                </Formik>

                </div>
        </div>
    );
}
export default RightReStep4;