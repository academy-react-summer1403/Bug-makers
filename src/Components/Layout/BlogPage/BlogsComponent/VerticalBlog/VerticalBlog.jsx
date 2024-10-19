import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './VertialBlog.css'

const HorizontalBlog = () => {
  const comments = [
    { id: 1, text: "  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت " },
    { id: 2, text: "  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت " },
    { id: 3, text: "  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت " },
    { id: 4, text: "  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت " }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-[212px] h-[539px] bg-white rounded-[15px] shadow-md overflow-hidden relative p-[3px]">
      <div className="absolute top-[122px] left-[17px] w-[70px] h-[25px] bg-gray-200 rounded-full text-center text-[11px] leading-[20px] text-black">دسته بندی</div>
      <div className="flex h-full w-full flex-col overflow-hidden rounded-[15px]">
        <div className="w-full bg-gradient-to-r from-blue-200 rounded-[15px] to-blue-100 flex items-center justify-center">
          <div className="w-full h-[130px] text-white text-5xl font-bold rounded-[11px]">تصویر</div>
        </div>
        <div className="relative w-full h-[252px] px-[4px] flex flex-col justify-between text-right">
          <div>
            <div className="text-gray-900 font-bold h-[19px] text-[16px] mt-[11px]">عنوان خبر</div>
            <p className="text-gray-600 text-[11px] mt-[12px] max-h-[78px]">توضیحات خبر یا مقاله متن مرتبط با توضیحات دوره لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ.</p>
            <div className="mt-[49px] w-full h-[64px] flex items-center justify-between flex-row">
              
            
                <div className="w-[50%] h-full flex justify-between items-center">
                    <div className="size-[35px] rounded-[8px] bg-gray-300"></div>  
                    <p className="text-[11px] font-[400] text-gray-600">نویسنده خبر</p>
                </div>  
                  <div className="w-[40px] h-full flex gap-y-[10px] justify-center flex-col">
                    <div className="w-full h-[30%] flex justify-between text-gray-500 text-[11px]">
                        <span>76</span>
                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.159 8.44488C17.8568 3.55525 13.6992 -0.194556 8.80445 0.00782001C3.90968 0.210195 0.0758188 4.29041 0.178276 9.18829C0.280731 14.0862 4.28187 18.0025 9.18082 18H14.4128C16.4809 17.9979 18.157 16.3219 18.159 14.2538L18.159 8.44488ZM16.6605 14.2538C16.6605 15.4952 15.6542 16.5015 14.4128 16.5015H9.18083C7.0426 16.5005 5.0058 15.5898 3.57947 13.9968C2.14577 12.4041 1.46953 10.2699 1.72434 8.14218C2.13344 4.72981 4.80261 2.02826 8.2098 1.57805C8.5329 1.53755 8.8582 1.51703 9.18382 1.51661C10.9299 1.51185 12.622 2.12193 13.9633 3.23987C15.5463 4.55554 16.5211 6.46239 16.6605 8.51606L16.6605 14.2538Z" fill="#8A8A8A"/>
                            <path d="M5.83691 7.10303H9.83691C10.3892 7.10303 10.8369 6.65531 10.8369 6.10303C10.8369 5.55074 10.3892 5.10303 9.83691 5.10303H5.83691C5.28463 5.10303 4.83691 5.55074 4.83691 6.10303C4.83691 6.65531 5.28463 7.10303 5.83691 7.10303Z" fill="#8A8A8A"/>
                            <path d="M12.3687 8.00879H5.96718C5.52525 8.00879 5.16699 8.4565 5.16699 9.00879C5.16699 9.56107 5.52525 10.0088 5.96718 10.0088H12.3687C12.8106 10.0088 13.1689 9.56107 13.1689 9.00879C13.1689 8.4565 12.8106 8.00879 12.3687 8.00879Z" fill="#8A8A8A"/>
                            <path d="M12.3687 10.9146H5.96718C5.52525 10.9146 5.16699 11.3623 5.16699 11.9146C5.16699 12.4668 5.52525 12.9146 5.96718 12.9146H12.3687C12.8106 12.9146 13.1689 12.4668 13.1689 11.9146C13.1689 11.3623 12.8106 10.9146 12.3687 10.9146Z" fill="#8A8A8A"/>
                        </svg>

                    </div>
                    <div className="w-full h-[30%] flex justify-between text-gray-500 text-[11px]">
                        <span>130</span>
                        <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.2996 9.53674e-07C11.5813 0.0267282 10.0085 0.970406 9.17627 2.47398C8.34407 0.970406 6.77127 0.0267276 5.05296 8.34465e-07C2.25146 0.121719 0.0742265 2.48318 0.179963 5.28533C0.179963 8.69418 3.76799 12.4172 6.77725 14.9414C8.16425 16.1069 10.1883 16.1069 11.5753 14.9414C14.5845 12.4172 18.1726 8.69418 18.1726 5.28533C18.2783 2.48318 16.1011 0.121719 13.2996 9.53674e-07ZM10.6119 13.7943C9.78231 14.493 8.57023 14.493 7.74061 13.7943C3.88869 10.5624 1.67935 7.46169 1.67935 5.28533C1.57267 3.31078 3.07922 1.6201 5.05296 1.49939C7.0267 1.6201 8.53325 3.31078 8.42658 5.28533C8.42658 5.69937 8.76223 6.03502 9.17627 6.03502C9.59031 6.03502 9.92596 5.69937 9.92596 5.28533C9.81928 3.31078 11.3258 1.6201 13.2996 1.49939C15.2733 1.6201 16.7799 3.31078 16.6732 5.28533C16.6732 7.46169 14.4638 10.5624 10.6119 13.7913V13.7943Z" fill="#8A8A8A"/>
                    </svg>

                    </div>
                </div>
            </div>
          </div>
          <div className="text-[10px] mr-[5px] mt-[20px]">
            <span className='text-[10px] text-gray-700'>اخرین نظرات</span>
          </div>
          
          <div className="h-full w-full mt-[10px] border-[2px] border-[#F6F6F6] rounded-[10px] shadow-4xl">
            {/* <Commentslider/>   */}
            <Slider {...settings}>
              {comments.map(comment => (
                <div key={comment.id} className="relative p-[4px] h-full w-full ">
                  <div className="w-full flex justify-start items-center gap-[10px]">
                    <div className="ml-[2px] inline-block rounded-[10px] size-[32px] bg-gray-700"></div>
                  <p className="text-gray-700 font-[400] text-[10px] ">نام نویسنده نظر</p>
                  </div>
                  <div className="w-full h-full mt-[5px] text-right mb-[10px]">
                    <p className="text-gray-500 font-[400] text-[10px]">{comment.text}</p>
                  </div>
                  
                </div>
              ))}
            </Slider>
          </div>
          <div className="mt-[20px]  flex justify-between items-center text-gray-500 text-xs">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.4583 1.41667H12.75V0.708333C12.75 0.317132 12.4329 0 12.0417 0C11.6505 0 11.3333 0.317132 11.3333 0.708333V1.41667H5.66667V0.708333C5.66667 0.317132 5.34953 0 4.95833 0C4.56713 0 4.25 0.317132 4.25 0.708333V1.41667H3.54167C1.58663 1.41901 0.00234236 3.0033 0 4.95833V13.4583C0.00234236 15.4134 1.58663 16.9977 3.54167 17H13.4583C15.4134 16.9977 16.9977 15.4134 17 13.4583V4.95833C16.9977 3.0033 15.4134 1.41901 13.4583 1.41667ZM1.41667 4.95833C1.41667 3.78473 2.36806 2.83333 3.54167 2.83333L13.4583 2.83333C14.6319 2.83333 15.5833 3.78473 15.5833 4.95833V5.66667H1.41667V4.95833ZM13.4583 15.5833H3.54167C2.36806 15.5833 1.41667 14.6319 1.41667 13.4583V7.08333H15.5833V13.4583C15.5833 14.6319 14.6319 15.5833 13.4583 15.5833Z" fill="#7A7A7A"/>
                <circle cx="8.5" cy="10.5" r="1.5" fill="#7A7A7A"/>
                <circle cx="5.1665" cy="10.5" r="1.5" fill="#7A7A7A"/>
                <circle cx="11.8335" cy="10.5" r="1.5" fill="#7A7A7A"/>
            </svg>
            <span>۲۵ اردیبهشت ۱۴۰۳</span>
            |
            <span>۳ روز پیش</span>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalBlog;
