import React from "react";
import BlogDetailRightTop from "../BlogDetailRightTop/BlogDetailRightTop";
import BSideMinimal from "../BSideMinimal/BSideMinimal";
import BDMore from "../BDcommon/BDMore";

const BDetailRight =()=>{
    return(
        <div className="w-[19%] h-[48vw] flex flex-col items-center gap-[1vw]">
            <BlogDetailRightTop/>
            <BDMore/>
            <BSideMinimal/>

        </div>
    )
}
export default BDetailRight