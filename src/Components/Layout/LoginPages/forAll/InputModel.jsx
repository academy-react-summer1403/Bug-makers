import { Field ,ErrorMessage} from "formik";
import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import { GoEyeClosed } from "react-icons/go";
import { useSelector } from "react-redux";
import * as yup from "yup";

const InputModel = ({val,type,img,label,placeholder,name}) => {
    // const validation = yup.object().shape({
    // name : yup.string().required("این فیلد اجباریست"),
const [show, setShow] = useState(true);
    // });
    const dark = useSelector((state) => state.darkMood);
    return (
      <>
        <label
          style={{ color: dark.textHigh }}
          htmlFor="userName"
          className="mt-[1.687vw]  text-[0.885vw] font-normal mr-[0.9vw] w-full text-right"
        >
          {label}
        </label>
        <br />
        <div className="relative top-0 right-0 w-full h-[2.813vw] mt-[0.9vw]">
          <Field
            value={val}
            name={name}
            style={{ background: dark.bgHigh, color: dark.textHigh }}
            className="absolute top-0 right-0 text-[0.729vw] pr-[0.833vw] w-full h-full  rounded-[0.563vw] border-[0.104vw] border-[#F8F8F8] shadow-3xl outline-none"
            placeholder={placeholder}
            
            type={type == "password" ? show ? "password" : "text" : type}
            id="userName"
          />
          <ErrorMessage name={name} component={"p"} className="text-red-600" />
          <img
            src={img}
            className={`absolute top-[0.8vw] left-[0.4vw] w-[1.1vw] z-10 ${
              type == "password" ? "hidden" : "block"
            }`}
            alt=""
          />
          <div
            onClick={() => setShow(!show)}
            className={`cursor-pointer absolute left-0 ml-[0.6vw] mt-[1vw] ${
              type == "password" ? "block" : "hidden"
            }`}
          >
            {show ? (
              <FiEye className="w-[1vw] h-[1vw]" color="#cacaca" />
            ) : (
              <GoEyeClosed color="#cacaca" />
            )}
          </div>
        </div>
      </>
    );
}
export default InputModel;