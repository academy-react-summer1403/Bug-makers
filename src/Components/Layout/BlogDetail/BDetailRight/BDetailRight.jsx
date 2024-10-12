import React from "react";
import BlogDetailRightTop from "../BlogDetailRightTop/BlogDetailRightTop";
import BSideMinimal from "../BSideMinimal/BSideMinimal";
import BDMore from "../BDcommon/BDMore";
import { useSelector } from "react-redux";


const BDetailRight = ()=>{

    const CourseListItem = useSelector((state) => state.BlogSlice.BlogList)
    const renderCourses = () => {


    return CourseListItem
        .slice(0, 1)
        .map((news) => (
        <BSideMinimal
            key={news.id}
            id={news.id}
            title={news.title}
            cat={news.newsCatregoryName}
            desc={news.miniDescribe}
            newsImg={news.currentImageAddressTumb}
            userImg={news.addUserProfileImage}
            writer={news.addUserFullName}
            comment={news.currentView}
            like={news.currentLikeCount}
            date={news.updateDate}
            datePass={news.updateDate}
        />
    ));
    } ;




    return(
        <div className="w-[19%] h-[48vw] flex flex-col items-center gap-[1vw]">
            <BlogDetailRightTop/>
            <BDMore/>
            {renderCourses()}

        </div>
    )
}
export default BDetailRight