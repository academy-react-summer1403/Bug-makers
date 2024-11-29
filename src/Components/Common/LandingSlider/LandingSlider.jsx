import React, { useState } from 'react'; // useState به کد اضافه شده است
import TextLanding from '../TextInLanding/TextLanding';
import { PiStudentFill } from 'react-icons/pi';
import MiniSlider from '../MiniSlider/MiniSlider';
import { useTranslation } from 'react-i18next';

const LandingSlider = () => {
  const [isHovered, setIsHovered] = useState(false); // مدیریت وضعیت هاور

  const { t , i18n } = useTranslation();
  const direction = i18n.dir();
  return (
    <div
      className=' max-[714px]:w-[100%] m-auto w-[100%] mt-[38.786458333333332vw] bg-transparent z-10 relative text-center'
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} 
    >
      <TextLanding 
        h3Text={t("content.slider.topic")}
        pText={t("content.slider.p")}
      />

      {/*  Student Info */}
      <div className={` ${direction === 'ltr' ? 'ml-[10vw]' : 'mr-[10vw]'} student relative min-h-[6vw] w-[26.809895833333332vw] `}>
        <div className={` ${direction === 'ltr' ? 'left-0' : 'right-0'} w-[7vw] h-[7vw] bg-[#F5F5F4] absolute right-0 bottom-[0.2vw] shadow-custom-shadow rounded-full flex justify-center `}>
          <PiStudentFill className='m-auto w-[4vw] h-[4vw]' />
        </div>
        <h3 className={` ${direction === 'ltr' ? 'text-left' : 'text-right'} text-[1.5625vw] max-md:text-[8px]  indent-[8vw] mt-[2vw]`}>{t("content.slider.student")}</h3>
        <p className={` ${direction === 'ltr' ? 'text-left ml-[8.2vw]' : 'text-right mr-[8vw]'} text-[1.171875vw] max-w-[20.4375vw] break-words`}>
        {t("content.slider.studentP")}
        </p>
      </div>

      <MiniSlider isHovered={isHovered}  /> 
    </div>
  );
};

export default LandingSlider;
