import React from "react";
import BlogLastComment from "../BlogDownComponents/BlogLastComment";

const BlogDownLeft= ()=>{
    return(
        <div className="text-right  h-[95%] w-[23vw] p-[0.31vw] rounded-[0.63vw] shadow-blogDown bg-white  max-md:scale-[3] max-md:mt-[80vw]">
            <span className="mr-[1.35vw] font-[400] text-[#434343]  w-max text-[1.25vw] mt-[0.99vw]">آخرین نظرات</span>
            <hr className="border-[0.05vw] mx-[0.42vw] mt-[0.94vw] border-[#C4CDD5]"/>
            <div className="h-[28.22vw] w-full mt-[0.1vw] ">
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