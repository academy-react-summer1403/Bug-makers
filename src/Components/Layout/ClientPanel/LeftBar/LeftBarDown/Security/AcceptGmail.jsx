import { Button } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { gmailVerifiy } from "../../../../../../Core/Services/Api/Client/Profile";

const AcceptGmail = ()=>{
    const navigator = useNavigate()
    const {first}= useParams()
    const {secound}= useParams()
    const { third } = useParams();

    const setVerify = async ()=>{
        const res = await gmailVerifiy(`${first}/${secound}/${third}`);
        console.log(res)
    }

    useEffect(()=>{
        setVerify()
    },[])

    return(
        <div className="flex justify-center items-center h-screen w-screen bg-white">
            <div className="p-[2%] h-[50%] w-[40%] max-md:w-full flex flex-col items-center justify-between shadow-2xl rounded-xl">
                <svg fill="green" width="" height="40%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path id="accept" d="M1008,120a12,12,0,1,1,12-12A12,12,0,0,1,1008,120Zm0-22a10,10,0,1,0,10,10A10,10,0,0,0,1008,98Zm-0.08,14.333a0.819,0.819,0,0,1-.22.391,0.892,0.892,0,0,1-.72.259,0.913,0.913,0,0,1-.94-0.655l-2.82-2.818a0.9,0.9,0,0,1,1.27-1.271l2.18,2.184,4.46-7.907a1,1,0,0,1,1.38-.385,1.051,1.051,0,0,1,.36,1.417Z" transform="translate(-996 -96)"/>
                </svg>
                <div className="text-[2vw] max-md:text-[20px]">جیمیل شما با موفقیت تایید شد</div>
                <Button
                onClick={()=>{navigator("/")}}
                    className="w-[50%]" >رفتن به صفحه اصلی</Button>
            </div>
        </div>
    )
}
export default AcceptGmail