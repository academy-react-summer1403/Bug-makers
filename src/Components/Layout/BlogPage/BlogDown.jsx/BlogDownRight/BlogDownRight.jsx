import React, { useEffect } from "react";
import BlogTrands from "../BlogDownComponents/BlogTrands";




const BlogDownRight=  (CourseListItem)=>{

    useEffect(
        ()=>{
            console.log(CourseListItem)
        },[]
    )

    
//     return CourseListItem
//       .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
//         .map((news) => (
//         <MinimalBlog
//             key={news.id}
//             title={news.title}
//             cat={news.newsCatregoryName}
//             desc={news.miniDescribe}
//             newsImg={news.currentImageAddressTumb}
//             userImg={news.addUserProfileImage}
//             writer={news.addUserFullName}
//             comment={news.currentView}
//             like={news.currentLikeCount}
//             date={news.updateDate}
//             datePass={news.updateDate}
//         />
//     ));
//   };


    return(
        <div className="text-right h-[95%] w-[23vw] p-[0.313vw] rounded-[0.625vw] shadow-blogDown bg-white">
            <span className="mr-[1.35vw] font-[400] text-[#434343]  w-max text-[1.25vw] mt-[0.99vw]">بر اساس سلیقه شما</span>
            <hr className="border-[0.05vw] mx-[0.42vw] mt-[0.94vw] border-[#C4CDD5]"/>
            <div className="h-[24.22vw] w-full mt-[0.1vw] ">

                {/* {renderCourses()} */}

            </div>


        </div>
    )
}
export default BlogDownRight;