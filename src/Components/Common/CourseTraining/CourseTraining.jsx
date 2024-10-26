import React from 'react';
import { motion } from 'framer-motion';
import TextLanding from '../TextInLanding/TextLanding';
import { useSelector } from 'react-redux';

const CourseTraining = () => {
  const { selectedButton } = useSelector((state) => state.themeColor);

  const courses = [
    {
      title: 'دوره آموزش کودکان',
      description: 'نقطه شروع و تلاشی برای پرورش ذهن الگوریتمی و قادر به حل مساله در کودکان در دوره های پایه حل مساله بازی محور در آکادمی.',
      key: 1,
    },
    {
      title: 'دوره آموزش بزرگسالان',
      description: 'آشنایی دوباره به لذت کدنویسی در دوره بزرگسالان و انتقال تجربه ای گام به گام و عمل محور برای کار با پشته ای وسیع از زبان ها ',
      key: 2,
    },
  ];

  // Animation settings
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={` max-[714px]:w-[66%] max-[570px]:w-[66%] m-auto w-[100%] max-[574px]:scale-[150%] max-[714px]:scale-125 max-[574px]:mt-[50vw] text-center  mt-[8.63541666666667vw] bg-transparent
        ${selectedButton === 0 ? 'max-[750px]:mt-[30vw]' : 'mt-[28.63541666666667vw]'}
        `}>
          {/* title  */}
      <TextLanding 
        h3Text='آموزش‌های متناسب با سنین مختلف'
        pText='متد‌های آموزشی متفاوت برای بهره‌مندی حداکثری سنین مختلف'
      />
      
      {/* wrapper  */}
      <div className='  max-[714px]:scale-150 max-[714px]:m-[15vw_15vw_0_0]   max-[574px]:mt-[15vw] w-[31.705729166666668vw] mr-[10vw] text-right indent-[4vw] '>
        {courses.map(({ title, description, key }) => (
          <motion.div
            key={key}
            className={`mt-[8vw] relative 
            ${selectedButton === 1 ? 'bg-white p-[1vw] rounded-lg' : ''}
             ${selectedButton === 1 && key === 2 ? 'absolute right-[50vw] top-[20vw]' : ''}`}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: key * 0.2 }} 
          >
            <h2 className='text-[1.5625vw] leading-[1.8880208333333333vw]'>{title}</h2>
            <p className='text-[1.0416666666666667vw] mt-[2vw] leading-[2.4739583333333335vw] w-[87%] mr-[4vw] indent-0'>{description}</p>
            <div className={`absolute top-0 right-[2vw] opacity-80 ${selectedButton === 1 ? 'hidden' : 'block'}`}>
              <div className={`  border-2 w-[1vw] h-[1vw] rounded-[100%] ${key === 2 ? 'border-[#ccc]' : 'border-[#E1C564]'}`}></div>
              <div className={`w-[2px] mr-[0.4vw] h-[6.510416666666667vw]  ${key === 2 ? 'bg-[#ccc]' : 'bg-[#E1C564]'}`}></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default CourseTraining;
