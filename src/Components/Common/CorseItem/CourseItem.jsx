import { list } from 'postcss'
import React from 'react'
import { useState } from 'react'

const CourseItem = ({ title , img , description , technologyList , teacherName , likeCount , commandCount , courseRate , statusName , price , currentRegistrants , date , listStyle}) => {
  return (
    <div dir={`${listStyle ? 'ltr' : 'rtl'}`}  className={`relative shadow-[-15px_15px_15px_0px_#0000000D] bg-white rounded-2xl p-[5px] overflow-hidden group hover:scale-110 cursor-pointer transition-all duration-300  ${listStyle ? 'w-[100%]  h-[350px]' : 'w-[250px]  h-[405px]   '}`}>
        <div className={`w-[600px] h-40 bg-[rgba(245,245,245,0.5)] absolute  transition-all duration-500 group-hover:translate-x-[-150px]  ${listStyle ? 'rotate-45 translate-x-[1000px] translate-y-[-100px] group-hover:translate-y-[250px] group-hover:translate-x-[-450px]' : 'rotate-45 translate-x-[450px] translate-y-[-50px] group-hover:translate-y-[200px]'}`}></div>
        <img src={img}  className={` bg-poster rounded-[11px] ${listStyle ? 'w-[550px] h-[340px]' : 'w-[100%] h-[147px]'}`} />
        <div className={`absolute  w-[70px] h-[25px] rounded-[15px] bg-[#F5F5F4] text-[11px] shadow-[0px_3px_3px_0px_#0000001F] text-[#DEDEDE] leading-[25px] ${listStyle ? 'top-7 left-[520px]' : 'left-5 top-[140px]'}`}>{technologyList}</div>
        <h2 className={`absolute  text-[16px] font-semibold  text-right ${listStyle ? 'top-7 right-3' : 'top-[168px] '}`}>{title}</h2>
        <span className={`text-[14px] text-[#5E5E5E] absolute top-16 right-3 ${listStyle ? 'block' : 'hidden'}`}>عنوان دسته بندی</span>
        <p className={`absolute mr-[10px] text-[11px] text-right  break-words  text-[#9A9A9A] ${listStyle ? 'top-24 right-0 w-[500px]' : 'top-[202px] right-[-5px] w-[100%] '}`}>{description}</p>
        
        <div className={`flex justify-center items-center gap-20 flex-nowrap w-[480px] absolute top-40 right-3 ${listStyle ? 'flex' : 'hidden'}`}>
        <div className='w-[109px] h-[39px]  flex flex-nowrap justify-center items-center gap-2 '>
            <span className='text-[9px] text-[#8A8A8A]'>دانشجو تاکنون</span>
            <h2 className='text-[32px] text-[#878787]'>83</h2>
        </div>
        <div className='w-[109px] h-[39px]  flex flex-nowrap justify-center items-center gap-2 '>
            <span className='text-[9px] text-[#8A8A8A]'>تعداد برگذاری</span>
            <h2 className='text-[32px] text-[#878787]'>34</h2>
        </div>
        <div className='w-[109px] h-[39px]  flex flex-nowrap justify-center items-center gap-2 '>
            <span className='text-[9px] text-[#8A8A8A]'>دانشجو تاکنون</span>
            <h2 className='text-[32px] text-[#878787]'>83</h2>
        </div>
        </div>


        <div className={`absolute t h-[40px]  flex flex-row gap-2 justify-center items-center ${listStyle ? 'top-56 right-3' : 'top-[261px] left-[15px]'}`}>
            <span className='text-[11px] text-[#8A8A8A]'>{teacherName}</span>
            <span className={`text-[9px] text-[#8A8A8A] absolute bottom-0 right-12 ${listStyle ? 'block' : 'hidden'}`}>12دوره فعال</span>
            <img src='' className={`h-[40px] w-[40px] bg-drop-gradient shadow-drop-shadow  ${listStyle ? 'rounded-[10px]' : 'rounded-[100%]'} `} />
        </div>
        <h2 className={` w-[180px] h-[35px] rounded-[8px] absolute top-[229px] right-80 text-[16px] text-center bg-register-course text-white leading-8 ${listStyle ? 'block' : 'hidden'}`}>ثبت نام در دوره</h2>
        <div dir='rtl' className={`absolute h-[24px]  flex flex-row gap-1 justify-center items-center ${listStyle ? 'top-[276px] right-10' : 'top-[308px] left-[15px] '}`}>
            <img src='../../../../public/Image/Icon/calendar.png' className={` ${listStyle ? 'w-[15px] h-[15px]' : 'w-[24px] h-[24px]'}`} />
            <span className='text-[11px] ml-[70px]'>{date}</span>
            <span className='text-[10px] '>{statusName}</span>
        </div>
        <span className={`absolute text-[11px] text-[#8A8A8A] ${listStyle ? ' top-[280px] right-[325px]' : ' top-[347px] left-[190px]'}`}>هزینه دوره</span>
        <div dir='rtl' className={`absolute h-[24px]  flex flex-row gap-2 justify-center items-center ${listStyle ? ' top-[276px] right-[415px]' : ' top-[343px] left-[15px]'}`}>
            <h3 className='text-[16px] text-[#DC6C6C] font-semibold price'>{price}</h3>
            <img src='../../../../public/Image/Icon/toman.png'  />
        </div>
        <div className={` bg-[#f2eefb] absolute  h-[1px] ${listStyle ? 'top-[310px] right-3 w-[42%]' : 'top-[371px] left-0 w-[100%]'}`}></div>
        <div className={`h-3 w-3 rounded-[100%]  absolute top-[305px] right-2 ${listStyle ? 'block' : 'hidden'}`}></div>
        <div dir='ltr' className={`flex flex-nowrap items-center justify-center absolute ${listStyle ? 'gap-24  top-[320px] right-10' : 'gap-8  top-[380px] right-10'}`}>
            <div className={`w-[40px] h-[17px] flex flex-row justify-center items-center gap-2 text-[11px] text-[#8A8A8A] ${listStyle ? 'block' : 'hidden'}`}>
                <span>کاربر</span>
                <img src='../../../../public/Image/Icon/users-alt.png'  />
                <span>{currentRegistrants}</span>
            </div>
            <div className='w-[40px] h-[17px] flex flex-row justify-center items-center gap-2 text-[11px]  text-[#8A8A8A]'>
                <span>{likeCount}</span>
                <img src='../../../../public/Image/Icon/Like.png'  />
            </div>
            <div className='w-[40px] h-[17px] flex flex-row justify-center items-center gap-2 text-[11px]  text-[#8A8A8A]'>
                <span>{courseRate}</span>
                <img src='../../../../public/Image/Icon/star.png'  />
            </div>
            <div className='w-[40px] h-[17px] flex flex-row justify-center items-center gap-2 text-[11px] text-[#8A8A8A]'>
                <span>{commandCount}</span>
                <img src='../../../../public/Image/Icon/comment.png'  />
            </div>
        </div>
    </div>
  )
}

export default CourseItem