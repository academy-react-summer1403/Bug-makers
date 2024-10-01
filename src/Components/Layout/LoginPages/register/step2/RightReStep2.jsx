import React, { useEffect, useState } from "react";
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
import { getItem } from "../../../../../Core/Services/common/storage.services.js";
import { useNavigate } from "react-router-dom";
import { RigesterStep1 } from "../../../../../Core/Services/Api/auth.js";



const RightReStep2=()=>{
    const navigate = useNavigate()
    const [resend,setResend]=useState(true)
    const [code,setCode] = useState()
    const [reset,setReset]=useState(false)
    const phoneN="phoneN";
    const [phoneNumber,setPhoneNumber] = useState()
    
    const setNumber =async ()=>{
        setPhoneNumber(getItem(phoneN))
    }
    useEffect(()=>{
    setNumber();
    resendTime();
    RigesterStep1(phoneNumber);
    alert(phoneNumber)    
    
    },[])
    useEffect(()=>{
        RigesterStep1(phoneN);
    },[reset])
    
    // useEffect(()=>{
    //     setVerify()
    //     const finalValue={phoneNumber:`${phoneNumber}`,verifyCode: `${code}`}
    //     onSubmit(finalValue)
    //     console.log(code)
    // },[code])

    



    const resendTime=()=>{
        setTimeout(()=>{setResend(resend==false);},55000)
    } 

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
                    initialValues={{ phoneNumber: "", verifyCode: `${code}`}}
                    validationSchema={validation}
                    onChange={(values) => onSubmit(values)}
                    >
                    
                    <Form>
                    <div action="post" className="relative flex justify-center flex-col items-center">
                        <span className="text-[#8E8E8E] text-[1vw]">ثبت نام</span>
                        <hr className="w-full mt-[0.94vw] "/>
                        
                        <InputModel val={`${getItem(phoneN)}`} name={"phoneNumber"} placeholder={"شماره تلفن خود را وارد کنید"} label={"شماره تلفن"} img={"../../../../../public/images/Login/portrait.png"}/>


                        <label className="mt-[1.687vw] mb-[0.8vw] text-[#727272] text-[0.885vw] font-normal mr-[0.9vw] w-full text-right" htmlFor="codePicker">کد تایید</label>
                        <OptInput phoneNumber={phoneNumber}  />
                        <ErrorMessage 
                        name="verifyCode"
                        component={"p"}
                        className="text-red-600"/>  
                        
                        
                        <button onClick={()=>{setReset(!reset); navigate("/sign/rigester/step2")}} type="submit" disabled={resend} className="relative mt-[2vw] text-white bg-[#40BE5D] rounded-[0.563vw] w-full h-[2.25vw] text-[0.83vw] leading-[1.46vw] p-0 m-0 fade">دریافت مجدد کد تایید 
                            

                        </button>
                        <div class="loader"></div>
                        
                        
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
export default RightReStep2;