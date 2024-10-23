import React from 'react';
import { useNavigate } from 'react-router-dom';
import convertToJalali from '../../../../Common/TimeChanger/TimeToShamsi';
import calculateDateDifference from '../../../../Common/TimeChanger/TimeChanger';

const BlogTrands = ({id,newsImg,title,date,like,comment}) => {
    const navigator =useNavigate()
    date = convertToJalali(date);
    const datePass = calculateDateDifference(date);
  return (
    <>
    <div onClick={()=>{navigator(`/BlogDetail/${id}`)}}  className="w-full h-[4.1vw] flex items-center justify-between bg-white mt-[0.47vw]">
        <div className="h-[3.4vw] w-[3.4vw] bg-gray-200 rounded-[0.42vw] overflow-hidden">
            <img className="h-full" src={newsImg} alt="" />
        </div>

        <div className="flex-grow h-full pr-[0.42vw] w-[80%]">
            <div className="h-1/2 w-full">
                <span className=" inline-block text-gray-800 text-[0.85vw] w-8/12 h-full overflow-hidden text-ellipsis ...">{title}
                </span>
            </div>
            <div className="h-1/2 w-full flex justify-between">
                <div className="text-gray-400 text-[0.6vw] mt-[0.42vw]">{date}</div>
                <div className="flex items-center justify-between w-[38%]">
                    <div className="flex items-center text-gray-400 text-[0.6vw] justify-center gap-1 w-1/3">
                        {like}
                        <svg width="0.99vw" height="0.83vw" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.2996 9.53674e-07C11.5813 0.0267282 10.0085 0.970406 9.17627 2.47398C8.34407 0.970406 6.77127 0.0267276 5.05296 8.34465e-07C2.25146 0.121719 0.0742265 2.48318 0.179963 5.28533C0.179963 8.69418 3.76799 12.4172 6.77725 14.9414C8.16425 16.1069 10.1883 16.1069 11.5753 14.9414C14.5845 12.4172 18.1726 8.69418 18.1726 5.28533C18.2783 2.48318 16.1011 0.121719 13.2996 9.53674e-07ZM10.6119 13.7943C9.78231 14.493 8.57023 14.493 7.74061 13.7943C3.88869 10.5624 1.67935 7.46169 1.67935 5.28533C1.57267 3.31078 3.07922 1.6201 5.05296 1.49939C7.0267 1.6201 8.53325 3.31078 8.42658 5.28533C8.42658 5.69937 8.76223 6.03502 9.17627 6.03502C9.59031 6.03502 9.92596 5.69937 9.92596 5.28533C9.81928 3.31078 11.3258 1.6201 13.2996 1.49939C15.2733 1.6201 16.7799 3.31078 16.6732 5.28533C16.6732 7.46169 14.4638 10.5624 10.6119 13.7913V13.7943Z" fill="#8A8A8A"/>
                        </svg>
                        
                    </div>
                    <div className="flex items-center text-gray-400 text-[0.6vw] justify-center gap-1 w-1/3">
                        {comment}
                        <svg width="0.99vw" height="0.94vw" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.159 8.44488C17.8568 3.55525 13.6992 -0.194556 8.80445 0.00782001C3.90968 0.210195 0.0758188 4.29041 0.178276 9.18829C0.280731 14.0862 4.28187 18.0025 9.18082 18H14.4128C16.4809 17.9979 18.157 16.3219 18.159 14.2538L18.159 8.44488ZM16.6605 14.2538C16.6605 15.4952 15.6542 16.5015 14.4128 16.5015H9.18083C7.0426 16.5005 5.0058 15.5898 3.57947 13.9968C2.14577 12.4041 1.46953 10.2699 1.72434 8.14218C2.13344 4.72981 4.80261 2.02826 8.2098 1.57805C8.5329 1.53755 8.8582 1.51703 9.18382 1.51661C10.9299 1.51185 12.622 2.12193 13.9633 3.23987C15.5463 4.55554 16.5211 6.46239 16.6605 8.51606L16.6605 14.2538Z" fill="#8A8A8A"/>
                            <path d="M5.83691 7.10303H9.83691C10.3892 7.10303 10.8369 6.65531 10.8369 6.10303C10.8369 5.55074 10.3892 5.10303 9.83691 5.10303H5.83691C5.28463 5.10303 4.83691 5.55074 4.83691 6.10303C4.83691 6.65531 5.28463 7.10303 5.83691 7.10303Z" fill="#8A8A8A"/>
                            <path d="M12.3687 8.00879H5.96718C5.52525 8.00879 5.16699 8.4565 5.16699 9.00879C5.16699 9.56107 5.52525 10.0088 5.96718 10.0088H12.3687C12.8106 10.0088 13.1689 9.56107 13.1689 9.00879C13.1689 8.4565 12.8106 8.00879 12.3687 8.00879Z" fill="#8A8A8A"/>
                            <path d="M12.3687 10.9146H5.96718C5.52525 10.9146 5.16699 11.3623 5.16699 11.9146C5.16699 12.4668 5.52525 12.9146 5.96718 12.9146H12.3687C12.8106 12.9146 13.1689 12.4668 13.1689 11.9146C13.1689 11.3623 12.8106 10.9146 12.3687 10.9146Z" fill="#8A8A8A"/>
                        </svg>
                        
                    </div>
                </div>
            </div>
            
        </div>
        
    </div>
    <hr className="border-[0.05vw] border-[#C4CDD5] w-[50%] m-auto"/>
    </>
    );
};

export default BlogTrands;
