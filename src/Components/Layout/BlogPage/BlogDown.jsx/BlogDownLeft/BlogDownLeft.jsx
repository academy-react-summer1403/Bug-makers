import React from "react";
import BlogLastComment from "../BlogDownComponents/BlogLastComment";

const BlogDownLeft = () => {
    return (
        <div className="text-right h-auto w-full  rounded-[0.63vw] p-3 shadow-blogDown bg-white mb-4">
            <span className="mr-[1.35vw] font-[400] text-[#434343] w-max text-[1.25vw] mt-[0.99vw]">آخرین نظرات</span>
            <hr className="border-[0.05vw] mx-[0.42vw] mt-[0.94vw] border-[#C4CDD5]" />
            <div className="h-auto w-full mt-[0.1vw]">
                {[...Array(7)].map((_, index) => (
                    <BlogLastComment key={index} />
                ))}
            </div>
        </div>
    );
}

export default BlogDownLeft;
