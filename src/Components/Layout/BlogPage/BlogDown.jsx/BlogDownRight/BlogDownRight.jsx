import React, { useEffect } from "react";
import BlogTrands from "../BlogDownComponents/BlogTrands";
import { useSelector } from "react-redux";




const BlogDownRight =  ({title})=>{

    const CourseListItem = useSelector((state) => state.BlogSlice.BlogList)
    useEffect(
        ()=>{
            console.log(CourseListItem) ;
            
            
        },[]
    )

    const renderCourses = () => {

    return CourseListItem
        .map((news) => (
        <BlogTrands
            key={news.id}
            title={news.title}
            
            
            newsImg={news.currentImageAddressTumb}
            
            comment={news.currentView}
            like={news.currentLikeCount}
            date={news.updateDate}

        />
    ));
}



    return(
        <div className="text-right h-[95%] w-[23vw] p-[0.313vw] rounded-[0.625vw] shadow-blogDown bg-white max-md:scale-[3] max-md:mt-[80vw]">
            <span className="mr-[1.35vw] font-[400] text-[#434343]  w-max text-[1.25vw] mt-[0.99vw]">{title}</span>
            <hr className="border-[0.05vw] mx-[0.42vw] mt-[0.94vw] border-[#C4CDD5]"/>
            <div className="h-[28.22vw] w-full mt-[0.1vw] overflow-hidden">

               {renderCourses()}

            </div>


        </div>
    )
}
export default BlogDownRight;