import { Field ,ErrorMessage} from "formik";
import React from "react";
import * as yup from "yup";

const InputModel2 = ({val,type,img,label,placeholder,name , show}) => {

    return(
        <>
            <label htmlFor="userName" className="mt-[1.687vw] text-[#727272] text-[0.885vw] font-normal mr-[0.9vw] w-full text-right">{label}</label>
            <br />
            <div className="relative top-0 right-0 w-full h-[2.813vw] mt-[0.9vw]">
                <Field value={val} name={name} className="absolute top-0 right-0 text-[0.729vw] pr-[0.833vw] w-full h-full bg-white rounded-[0.563vw] border-[0.104vw] border-[#F8F8F8] shadow-3xl outline-none text-black" placeholder={placeholder} type={type}  />
                <img src={img} className="absolute top-[0.8vw] left-[0.4vw] w-[1.1vw] z-10" alt="" />
            </div>
        </>
    );
}
export default InputModel2;