import React from "react";
import { useNavigate } from "react-router-dom";

const RecommendLi =({id,title})=>{
    const navigator =useNavigate()
    return(
        <li onClick={()=>{navigator(`/BlogDetail/${id}`)}}  className="hover:text-gray-600 cursor-pointer">{title}</li>
    )

}
export default RecommendLi;