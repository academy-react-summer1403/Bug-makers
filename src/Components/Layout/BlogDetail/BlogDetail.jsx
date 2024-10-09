import React from "react";
import BDetailRight from "./BDetailRight/BDetailRight";
import BDetailLeft from "./BDetailLeft/BDetailLeft";
import BDetailCenter from "./BDetailCenter/BDetailCenter";

const BlogDetail = ()=>{
    return(
        <div className="m-auto w-full relative text-center bg-[#f5f5f4] h-[155.78vw]">
            <div className="w-[85%] mt-[5vw] h-[95%] m-auto flex bg-[#f5f5f4] bg-cover bg-blogBack justify-between">
                <BDetailRight/>
                <BDetailCenter/>
                <BDetailLeft/>
                
                
            </div>

        </div>
    )
}
export default BlogDetail