import React from "react";
import BlogLastComment from "../BlogDownComponents/BlogLastComment";

const BlogDownLeft= ()=>{
    return(
        <div className="text-right h-[548px] w-[338px] p-[6px] rounded-[12px] shadow-blogDown bg-white">
            <span className="mr-[26px] font-[400] text-[#434343]  w-max text-[24px] mt-[19px]">آخرین نظرات</span>
            <hr className="border-[1px] mx-[8px] mt-[18px] border-[#C4CDD5]"/>
            <div className="h-[465px] w-full mt-[2px] ">
                <BlogLastComment/>
                <BlogLastComment/>
                <BlogLastComment/>
                <BlogLastComment/>
                <BlogLastComment/>
                <BlogLastComment/>
                <BlogLastComment/>


            </div>


        </div>
    )
}
export default BlogDownLeft;