import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { getSqurity, ProfileStep1, setSqurity, updatePassword } from "../../../../../../Core/Services/Api/Client/Profile";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

const Security = () => {
  
  const [response,setResponse]=useState({})
  
  const CourseListItem = useSelector(
    (state) => state.ClientInfoSlice.ClientInfo
  );


  const GetSqurity = async ()=>{
    const res = await getSqurity()
    setResponse(res)
  }
  useEffect(()=>{
    GetSqurity()
  },[]);
const dark = useSelector((state) => state.darkMood);



    const validation = yup.object().shape({
      recoveryEmail: yup.string().required("این فیلد اجباریست"),
      
    });


const [twoStep, setTwoStep] = useState(response.twoStepAuth);
  const onSubmit = async (val) => {


    console.log(val);
    const data = {
      recoveryEmail: val.recoveryEmail,
      twoStepAuth: twoStep,
    };
    const res = await setSqurity(data);
    if(res.StatusCode == 400){
        toast.error(
          "لطفا اطاعات مربوطه را به درستی وارد نمایید."
        );
    }
    else{
        toast(res.message);
    }
    
  };


  return (
    <Formik
      enableReinitialize
      initialValues={{
        recoveryEmail: "",
      }}
      validationSchema={validation}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="w-[50%] max-md:w-full h-full p-[2vw] flex flex-col items-start gap-y-[1vw] max-md:gap-y-[20px] overflow-auto">
          <div className="flex  flex-col max-md:items-center w-full items-start justify-start h-full gap-y-2">
            <span className="text-[#8E8E8E] text-[1vw] max-md:text-[16px]">
              امنیت حساب
            </span>
            <Field name="recoveryEmail">
              {({ field }) => (
                <Input
                  defaultValue={CourseListItem.email}
                  type="email"
                  label="ایمیل"
                  
                  className={`max-h-[20%] mt-[2%] ${dark.input}`}
                  img="../../../../../public/images/Login/lock.png"
                  onBlur={(e) => setFieldValue("recoveryEmail", e.target.value)}
                />
              )}
            </Field>
            <ErrorMessage
              name="recoveryEmail"
              component={"span"}
              className="text-red-600 text-[80%] my-[0px]"
            />
            <div className="flex items-center w-full my-[2%] gap-x-2 h-[10%]">
              <label> ورود دو مرحله ای : </label>
              <div
                onClick={() => {
                  twoStep == true ? setTwoStep(false) : setTwoStep(true);
                }}
                className={`cursor-pointer max-md:w-[40%] text-[0.9vw] max-md:text-[16px] flex items-center justify-center text-white w-[15%] h-full rounded-xl ${
                  twoStep == true ? "bg-red-500" : "bg-green-500"
                } `}
              >
                {twoStep == true ? "غیرفعال سازی" : "فعال سازی"}
              </div>
            </div>
            <button
              type="submit"
              className={`min-h-[50px] max-md:text-[16px] mt-[2%] text-white  rounded-[0.6vw] max-md:rounded-xl w-[30%] max-md:w-full h-[12%] text-[0.83vw] leading-[1.46vw] p-0 m-0
                ${dark.selectedButton === 0 ? "bg-blue-600" : ""} 
                ${dark.selectedButton === 1 ? "bg-green-600" : ""} 
                ${dark.selectedButton === 2 ? "bg-yellow-600" : ""} 
                ${dark.selectedButton === 3 ? "bg-red-600" : ""}
                `}
            >
              اعمال تغیررات
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Security;
