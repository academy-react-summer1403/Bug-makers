import React from "react";
import Comments from "./Comments";

const BComment = ()=>{
    return(
        <div className="w-full h-[45.31vw] rounded-[0.78vw] bg-white mt-[2vw] p-[1vw] text-gray-600">
            <div className="h-[2.5vw] w-full flex justify-between items-center">
                <span className="text-[1.1vw] w-[7vw] text-right">نظرات</span>
                <div className="w-[16.5vw] flex text-[0.8vw] justify-between items-center">
                    <div className="h-[1vw] w-1/4 cursor-pointer"> تعداد لایک </div>
                    -
                    <div className="h-[1vw] w-1/4 cursor-pointer">قدیمی‌ترین</div>
                    -
                    <div className="h-[1vw] w-1/4 cursor-pointer">جدید‌ترین</div>
                </div>
                <div className="w-[7.30vw]">
                    <span className="text-[1vw]">76</span>
                    <span className="text-[0.8vw]"> نظر ثبت شده</span>

                </div>
            </div>
            <div className="w-full">
                <Comments/>
            </div>
        </div>
    )
}
export default BComment