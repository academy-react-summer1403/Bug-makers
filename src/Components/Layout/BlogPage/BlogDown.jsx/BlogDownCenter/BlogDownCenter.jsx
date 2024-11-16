import React from "react";
import BlogTrands from "../BlogDownComponents/BlogTrands";


const BlogDownCenter= ()=>{
    return(
        <div className="text-right h-[95%] overflow-hidden w-[23vw] p-[0.313vw] rounded-[0.625vw] shadow-blogDown bg-white">
            <span className="mr-[1.35vw] font-[400] text-[#434343]  w-max text-[1.25vw] mt-[0.99vw]">ترند ها</span>
            <hr className="border-[0.05vw] mx-[0.42vw] mt-[0.94vw] border-[#C4CDD5]"/>
            <div className="h-[24.22vw] w-full mt-[0.1vw] ">

                <BlogTrands/>
                <BlogTrands/>
                <BlogTrands/>
                <BlogTrands/>
                <BlogTrands/>
                <BlogTrands/>

            </div>


        </div>
    )
}
export default BlogDownCenter;