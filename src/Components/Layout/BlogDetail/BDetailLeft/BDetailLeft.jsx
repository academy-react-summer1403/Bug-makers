import React from "react";
import BSideMinimal from "../BSideMinimal/BSideMinimal";
import BDMore from "../BDcommon/BDMore";

const BDetailLeft =()=>{
    return(
        <div className="w-[19%] h-[890px]">
            <BDMore/>
            <div className="w-full mt-[1vw] flex flex-col items-center gap-y-[1vw]">
                <BSideMinimal/><BSideMinimal/><BSideMinimal/>
            </div>
            
        </div>
    )
}
export default BDetailLeft