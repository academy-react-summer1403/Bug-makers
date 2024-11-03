import React, { useEffect } from "react";
import BlogTrands from "../../BlogPage/BlogDown.jsx/BlogDownComponents/BlogTrands";
import { useSelector } from "react-redux";




const BlogDetailRightTop =({title})=>{

    const CourseListItem =useSelector((state) => state.BlogSlice.BlogList)


    const renderCourses = () => {

    return CourseListItem
        .slice(0, 4)
        .map((news) => (
        <BlogTrands
            key={news.id}
            id={news.id}
            title={news.title}
            
            
            newsImg={news.currentImageAddressTumb}
            
            comment={news.currentView}
            like={news.currentLikeCount}
            date={news.updateDate}

        />
    ));
}


const dark = useSelector((state) => state.darkMood);
    return (
      <div
        style={{ background: dark.bgHigh, color: dark.textHigh }}
        className="shadow-[-0.52vw_0.52vw_0.52vw_0_rgba(0,0,0,0.1)] text-right h-[24.43vw] w-[100%] p-[0.313vw] rounded-[0.625vw] "
      >
        <span className="mr-[1.35vw] font-[400]  h-[6%] block w-full text-[1vw] mt-[0.99vw]">
          مطالب پیشنهادی
        </span>
        <hr className="border-[0.05vw] mx-[0.42vw] mt-[0.94vw] border-[#C4CDD5]" />
        <div className="h-[28.22vw] w-full mt-[0.1vw] overflow-hidden">
          {renderCourses()}
        </div>
      </div>
    );
}
export default BlogDetailRightTop;