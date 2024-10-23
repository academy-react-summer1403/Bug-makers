import React from "react";
import BSideMinimal from "../BSideMinimal/BSideMinimal";
import BDMore from "../BDcommon/BDMore";
import { useSelector } from "react-redux";

const BDetailLeft = ()=>{

    const CourseListItem = useSelector((state) => state.BlogSlice.BlogList)
    const renderCourses = () => {


    return CourseListItem
        .slice(0, 3)
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
        />
    ));
    } ;



    return(
        <div className="w-[19%] h-[890px] hidden md:block">
            <BDMore/>
            <div className="w-full mt-[1vw] flex flex-col items-center gap-y-[1vw]">

                {renderCourses()}
            </div>
            
        </div>
    )
}
export default BDetailLeft