import React from 'react';
import BlogLikeSvg from '../../BlogPage/BlogForAll/BlogLikeSvg/BlogLikeSvg';
import { useNavigate } from 'react-router-dom';



const BSideMinimal = ({id,cat,newsImg,title,desc,userImg,writer,like,comment,date,datePass}) => {
    const navigator =useNavigate()
    return (
    <div onClick={()=>{navigator(`/BlogDetail/${id}`)}} className="shadow-[-0.78vw_0.78vw_0.78vw_0_#0000000D] w-full h-[17.19vw] bg-white rounded-[0.78vw]  overflow-hidden relative p-[0.16vw] cursor-pointer ">
        <div className="absolute top-[5.73vw] left-[0.89vw] w-[4.17vw] h-[1.3vw] bg-gray-200 rounded-full text-center text-[0.57vw] leading-[1.04vw] text-black">{cat}</div>
        <div className="flex h-full w-full flex-col overflow-hidden rounded-[0.78vw]">
            <div className="w-full bg-gradient-to-r from-blue-200 rounded-[0.78vw] to-blue-100 flex items-center justify-center">
                <div className="w-full h-[6.25vw] text-white text-5xl font-bold rounded-[0.57vw] overflow-hidden">
                    <img className="w-max h-max" src={newsImg} alt="" />
                </div>
            </div>
            <div className="relative w-full h-[13.13vw] p-[0.21vw] flex flex-col justify-between text-right">
                <div>
                    <div className="text-gray-900 font-[600] h-[2.6vw] text-[0.73vw] mt-[0.52vw] w-full overflow-hidden text-ellipsis ...">{title}</div>
                    <p className="text-gray-600 font-[400] leading-[0.78vw] text-[0.57vw] mt-[0.42vw] h-[1.72vw] overflow-hidden text-ellipsis ...">{desc}</p>
                    <div className="mt-[0.94vw] w-full h-[3vw] flex items-center justify-between flex-row">
                        <div className="w-[35%] h-full flex justify-between items-center">
                            <div className="size-[1.82vw] rounded-[0.42vw] bg-gray-300 overflow-hidden">
                                <img className="w-full h-full" src={userImg} alt="" />    
                            </div>  
                            <p className="w-[3.23vw] text-[0.57vw] font-[400] text-gray-600">{writer}</p>
                        </div>  
                        <BlogLikeSvg like={like} comment={comment}/>
                    </div> 
                    <div className="flex justify-between items-center text-gray-500 text-[0.63vw]">
                    <svg width="0.89vw" height="0.89vw" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.4583 1.41667H12.75V0.708333C12.75 0.317132 12.4329 0 12.0417 0C11.6505 0 11.3333 0.317132 11.3333 0.708333V1.41667H5.66667V0.708333C5.66667 0.317132 5.34953 0 4.95833 0C4.56713 0 4.25 0.317132 4.25 0.708333V1.41667H3.54167C1.58663 1.41901 0.00234236 3.0033 0 4.95833V13.4583C0.00234236 15.4134 1.58663 16.9977 3.54167 17H13.4583C15.4134 16.9977 16.9977 15.4134 17 13.4583V4.95833C16.9977 3.0033 15.4134 1.41901 13.4583 1.41667ZM1.41667 4.95833C1.41667 3.78473 2.36806 2.83333 3.54167 2.83333L13.4583 2.83333C14.6319 2.83333 15.5833 3.78473 15.5833 4.95833V5.66667H1.41667V4.95833ZM13.4583 15.5833H3.54167C2.36806 15.5833 1.41667 14.6319 1.41667 13.4583V7.08333H15.5833V13.4583C15.5833 14.6319 14.6319 15.5833 13.4583 15.5833Z" fill="#7A7A7A"/>
                        <circle cx="8.5" cy="10.5" r="1.5" fill="#7A7A7A"/>
                        <circle cx="5.1665" cy="10.5" r="1.5" fill="#7A7A7A"/>
                        <circle cx="11.8335" cy="10.5" r="1.5" fill="#7A7A7A"/>
                    </svg>
                    <span className="text-[0.52vw] font-[400]">{date}</span>
                    |
                    <span className="text-[0.52vw] font-[400]">{datePass}</span>
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default BSideMinimal;
