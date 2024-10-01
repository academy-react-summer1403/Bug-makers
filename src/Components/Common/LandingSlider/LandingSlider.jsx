import React, { useState } from 'react'; // useState به کد اضافه شده است
import TextLanding from '../TextInLanding/TextLanding';
import { PiStudentFill } from 'react-icons/pi';
import MiniSlider from '../MiniSlider/MiniSlider';

const LandingSlider = () => {
  const [isHovered, setIsHovered] = useState(false); // مدیریت وضعیت هاور

  return (
    <div
      className='m-auto w-[100%] mt-[38.786458333333332vw] bg-transparent z-10 relative text-center'
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} 
    >
      <TextLanding 
        h3Text='با افتخار از آکادمی بحرالعلوم'
        pText='موفقیت و حضور دانش آموخته‌های ما در شرکت‌های مطرح'
      />

      {/*  Student Info */}
      <div className='student relative min-h-[6vw] w-[26.809895833333332vw] mr-[10vw]'>
        <div className='w-[7vw] h-[7vw] bg-[#F5F5F4] absolute right-0 bottom-[0.2vw] shadow-custom-shadow rounded-full flex justify-center'>
          <PiStudentFill className='m-auto w-[4vw] h-[4vw]' />
        </div>
        <h3 className='text-[1.5625vw] text-right indent-[8vw] mt-[2vw]'>نام دانشجو</h3>
        <p className='text-[1.171875vw] max-w-[20.4375vw] text-right mr-[8vw] break-words'>
          از پاییز ۹۸ ... عنوان فعلی در علی
        </p>
      </div>

      <MiniSlider isHovered={isHovered}  /> 
    </div>
  );
};

export default LandingSlider;
