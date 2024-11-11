import React, { useEffect } from "react";
import BlogTrands from "../BlogDownComponents/BlogTrands";
import { useSelector } from "react-redux";

const BlogDownRight = ({ title }) => {
    const CourseListItem = useSelector((state) => state.BlogSlice.BlogList);

    useEffect(() => {
        console.log(CourseListItem);
    }, [CourseListItem]);

    const renderCourses = () => {
        return CourseListItem.map((news) => (
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
    const dark = useSelector((state) => state.darkMood);
    return (
      <div
        style={{ background: dark.bgHigh, color: dark.textHigh }}
        className="text-right h-auto w-full p-3 rounded-[0.625vw] shadow-blogDown  mb-4"
      >
        <span className="mr-[1.35vw] font-[400] w-max text-[1.25vw] mt-[0.99vw]">
          {title}
        </span>
        <hr className="border-[0.05vw] mx-[0.42vw] mt-[0.94vw] border-[#C4CDD5]" />
        <div className="h-auto w-full mt-[0.1vw] overflow-hidden">
          {renderCourses()}
        </div>
      </div>
    );
}

export default BlogDownRight;
