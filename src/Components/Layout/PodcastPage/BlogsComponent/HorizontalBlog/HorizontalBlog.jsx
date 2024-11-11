import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Commentslider from './Commentslider';
import '../BlogPage.css'

const HorizontalBlog = () => {
  const comments = [
    { id: 1, text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم " },
    { id: 2, text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم " },
    { id: 3, text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم " },
    { id: 4, text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم " }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-[439px] h-[262px] bg-white rounded-[15px] shadow-md overflow-hidden relative p-[3px]">
      <div className="absolute top-[4%] left-[30%] w-[70px] h-[25px] bg-gray-200 rounded-full text-center text-[11px] leading-[20px] text-black">دسته بندی</div>
      <div className="flex h-full w-full flex-row-reverse overflow-hidden rounded-[15px]">
        <div className="w-2/5 bg-gradient-to-r from-blue-200 to-blue-100 flex items-center justify-center">
          <div className="w-[207px] h-[252px] text-white text-5xl font-bold rounded-[11px]">تصویر</div>
        </div>
        <div className="relative w-[252px] h-[252px] px-[4px] flex flex-col justify-between text-right">
          <div>
            <div className="text-gray-900 font-bold h-[19px] text-[16px] mt-[11px]">عنوان خبر</div>
            <p className="text-gray-600 text-[11px] mt-[12px]">توضیحات خبر یا مقاله متن مرتبط با توضیحات دوره لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ.</p>
            <div className="mt-[12px] w-[45%] h-[64px] flex items-center justify-between flex-row flex-wrap mr-auto">
              
            
                <p className="text-[11px] font-[400] text-gray-600">نویسنده خبر</p>
                  <div className="size-[35px] rounded-[8px] bg-gray-300"></div>
                  <div className="flex space-x-1 text-gray-500 text-xs">
                    <span>76</span>
                  <svg className="h-4 w-4 fill-current text-gray-500" viewBox="0 0 20 20">
                    <path d="M2.5 0a2.5 2.5 0 00-2.45 2.04A2.5 2.5 0 002 6.92V18.5a1.5 1.5 0 002.47 1.12l4.8-3.7 4.8 3.7A1.5 1.5 0 0017 18.5V6.92a2.5 2.5 0 002.45-2.88A2.5 2.5 0 0017.5 0h-15zM12 10H8v4H4v-4H0V6h4V2h4v4h4v4z"/>
                  </svg>
                  </div>
                  <div className="flex space-x-1 text-gray-500 text-xs">
                  <span>130</span>
                  <svg className="h-4 w-4 fill-current text-gray-500" viewBox="0 0 20 20">
                    <path d="M10 15l5 5V5l-5 5-5-5v15z"/>
                  </svg>
                </div>
            </div>
          </div>
          <div className="absolute top-[180px] right-[0px] z-20 text-[12px]">
            <span className='text-[10px] text-gray-700'>اخرین نظرات</span>
          </div>
          
          <div className="absolute top-[175px] left-[-147px]  h-[35px] w-[336px]">
            {/* <Commentslider/>   */}
            <Slider {...settings}>
              {comments.map(comment => (
                <div key={comment.id} className="relative p-[4px] h-[39px] w-[334px] bg-gray-100 rounded-tl-[10px] rounded-tr-[20px] rounded-br-[10px] rounded-bl-[20px] ">
                  
                  <div className='inline-block w-[75%] h-full relative top-[-6px]'>
                    <p className="text-gray-700 text-[10px] ">نام نویسنده نظر</p>
                    <p className="text-gray-500 text-[10px] mr-[10%]">{comment.text}</p>
                  </div>
                  <div className="ml-[18px] inline-block rounded-full size-[32px] bg-gray-700"></div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="mt-2  flex justify-between items-center text-gray-500 text-xs">
            <span>۳ روز پیش</span>
            <span>۲۵ اردیبهشت ۱۴۰۳</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalBlog;
