import React from "react";
import { Form, Formik } from "formik";
import InputModel from "../forAll/InputModel.jsx";
import * as yup from "yup";
import { LoginAPI } from "../../../../Core/Services/Api/auth.js";
import * as Icon from "react-icons/fi";
import Checkbox from "react-custom-checkbox";
import { BsJustify } from "react-icons/bs";




const RightLoginBox=()=>{
    const validation = yup.object().shape({
    phoneOrGmail: yup.string().required("این فیلد اجباریست"),
    password: yup.string().required("این فیلد اجباریست")
    });
    const onSubmit=(values)=>{
        const finalVal = JSON.stringify(values)
        alert(JSON.stringify(values))
        console.log(values);
        LoginAPI(values);
        
    }
    
    return(
        <div className="w-1/2 max-sm:w-[100%]">
                <div className=" mx-[6.51vw] py-[4.163vw] h-full ">
                    <Formik
                    initialValues={{ phoneOrGmail: "", password: "",rememberMe:true}}
                    validationSchema={validation}
                    
                    onSubmit={(values)=>{onSubmit(values)}}
                    >
                    
                    <Form>
                    <div action="post" className=" flex justify-center flex-col items-center">
                        <span className="text-[#8E8E8E] text-[1vw]">ورود به حساب کاربری</span>
                        <hr className="w-full mt-[0.94vw] "/>
                        
                        <InputModel type={"text"} name={"phoneOrGmail"} placeholder={"شماره یا ایمیل خود را وارد کنید"} label={"حساب"} img={"../../../../../public/images/Login/portrait.png"}/>
                        
                        

                        <InputModel type={"password"} name={"password"} placeholder={"رمز عبور خود را وارد کنید" } label={"رمز عبور"} img={"../../../../../public/images/Login/lock.png"}/>

                        <Checkbox 
                            icon={<Icon.FiCheck color="#174A41" size={14} />}
                            name="rememberMe" 
                            checked={true}
                            onSubmit={(values)=>onSubmit(values)}
                            
                            borderColor="#D7C629"
                            style={{ cursor: "pointer" }}
                            labelStyle={{ marginLeft: 20, userSelect: "none" }}
                            right={"true"}
                            containerClassName="mt-10 mr-0"
                            label="من را به خاطر بسپار"
                        />
                        
                        <button type="submit" className="mt-[2vw] text-white bg-green-500 rounded-[0.563vw] w-full h-[2.25vw] text-[0.83vw] leading-[1.46vw] p-0 m-0">ورود به حساب</button>
                        
                        <div className="mt-[0.615vw] text-[0.833vw] h-[1.575vw] w-full flex justify-evenly items-center">
                            <span className="cursor-pointer hover:text-blue-400">هم اکنون ثبت نام کنید</span>
                            <div className="h-3/4 border-[0.104vw] w-0"></div>
                            <span className="cursor-pointer hover:text-blue-400">فراموشی رمز عبور</span>
                        </div>
                        
                    </div>
                    </Form>
                
                </Formik>

                </div>
        </div>
    );
}
export default RightLoginBox;