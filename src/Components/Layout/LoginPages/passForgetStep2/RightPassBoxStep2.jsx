import React, { useEffect, useState } from "react";
import { Formik ,Form} from "formik";
import InputModel from "../forAll/InputModel.jsx";
import * as yup from "yup";
import { ForgetPassStep3 } from "../../../../Core/Services/Api/auth.js";
import { ForgetPassStep2 } from "../../../../Core/Services/Api/auth.js";
import { useNavigate, useParams } from "react-router-dom";
import { param } from "framer-motion/client";


const RightPassBoxStep2=()=>{
    const navigate = useNavigate()
    const validation = yup.object().shape({
    newPassword: yup.string().required("این فیلد اجباریست"),
    resetValue: yup.string().required("این فیلد اجباریست")
    });
    useEffect(()=>{
        // console.log(verify)
        handelStep2();
    },
    
    []) 
    const {verify} = useParams()
    // alert(verify)
    
    
    const [id,setId]= useState()
    const handelStep2 = async ()=> {
        const response = await ForgetPassStep2(verify)
        // id==response;
        setId(response)
        console.log(response)
    }
    
    
    const onSubmit=(values)=>{
        
        alert(JSON.stringify(values))
        // console.log(values);
        ForgetPassStep3(values);
        navigate("/")
        
    }
    console.log("id : "+id)
    return(
        <div className="w-1/2 max-sm:w-[100%]">
                <div className=" mx-[6.51vw] py-[4.163vw] h-full ">
                    <Formik
                    initialValues={{ userId:null ,newPassword: "", resetValue: ""}}
                    validationSchema={validation}
                    onSubmit={(values)=>{onSubmit(values)}}
                    >
                    
                    <Form>
                    <div action="post" className=" flex justify-center flex-col items-center">
                        <span className="text-[#8E8E8E] text-[1vw]">رمز عبور جدید</span>
                        <hr className="w-full mt-[0.94vw] "/>
                        <input type="text" value={id} name="userId" className=""/>
                        <InputModel name={"newPassword"} placeholder={"رمز جدید خود را وارد کنید"} label={"رمز جدید"} img={"../../../../../public/images/Login/lock.png"}/>
                        <InputModel name={"resetValue"} placeholder={"رمز خود را تکرار کنید"} label={"تکرار رمز جدید"} img={"../../../../../public/images/Login/lock.png"}/>
                        

                        
                        <button type="submit" className="mt-[2vw] text-white bg-green-500 rounded-[0.563vw] w-full h-[2.25vw] text-[0.83vw] leading-[1.46vw] p-0 m-0">تایید رمز جدید</button>
                        
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
export default RightPassBoxStep2;