import React from 'react';

const BlogLastComment = () => {
  return (
        <div className="mt-[14px] p-[2px] h-[54px] w-[328px] bg-gray-100 rounded-tl-[10px] rounded-tr-[20px] rounded-br-[10px] rounded-bl-[20px] ">
            <div className="ml-[2px] inline-block rounded-full size-[45px] bg-gray-700"></div>
            <div className="inline-block w-[85%] h-full relative top-[-10px]">
                <div className="flex justify-between p-[4px] w-full">
                    <p className="text-gray-700 font-normal text-[10px] ">نام نویسنده نظر در عنوان خبر </p>
                    <div className="flex justify-evenly w-[80px]">
                        <span className="text-[10px] font-[400] text-[#8A8A8A]"> ۴ دقیقه پیش</span>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 15C3.36438 15 0 11.6356 0 7.5C0 3.36437 3.36438 0 7.5 0C11.6356 0 15 3.36438 15 7.5C15 11.6356 11.6356 15 7.5 15ZM7.5 1.25C4.05375 1.25 1.25 4.05375 1.25 7.5C1.25 10.9462 4.05375 13.75 7.5 13.75C10.9462 13.75 13.75 10.9462 13.75 7.5C13.75 4.05375 10.9462 1.25 7.5 1.25ZM10.625 7.5C10.625 7.15438 10.3456 6.875 10 6.875H8.125V3.75C8.125 3.40438 7.845 3.125 7.5 3.125C7.155 3.125 6.875 3.40438 6.875 3.75V7.5C6.875 7.84562 7.155 8.125 7.5 8.125H10C10.3456 8.125 10.625 7.84563 10.625 7.5Z" fill="#A2A2A2"/>
                        </svg>
                    </div>
                </div>
                    <p className="font-[400] text-gray-500 text-[10px] mr-[10%] mt-[5px]">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم </p>
            </div>
            
        </div>
    )
}

export default BlogLastComment;
