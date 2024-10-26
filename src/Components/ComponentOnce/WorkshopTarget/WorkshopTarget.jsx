import React from 'react';
import { motion } from 'framer-motion'; 
import { useSelector } from 'react-redux';

const WorkshopTarget = () => {
    const { selectedButton } = useSelector((state) => state.themeColor);

  const targets = [
    {
      id: 1,
      title: 'استعداد یابی',
      description: 'یافتن رگه های علاقه و استعداد در دوره های پایلوت استعدادیابی و سپس چینش مسیری برای شکوفا نمودن ذوق برنامه سازی در دانش پژوهان.',
      img: <img src='../../../../public/images/icon/personal.png' className='block w-[8vw] h-[8vw] ' />
    },
    {
      id: 2,
      title: 'راهنمایی و ایجاد انگیزه',
      description: 'آشنایی با پشته ای تکنولوژیک از زبان های کدنویسی با نگاهی عمل محور برای تحریک ذهنیت خلاق در طول فرایند آموزش.',
      img: <img src='../../../../public/images/icon/estedad.png' className='block w-[8vw] h-[8vw]' />
    },
    {
      id: 3,
      title: 'آموزش های تخصصی',
      description: 'کارگاه های تخصصی و تکمیلی برای کار با پلتفرم های بازاری مورد اقبال و برگزاری تورنمت های تیمی رقابتی برای تقویت روحیه کار تیمی و آشنایی عمیق با ابزارهای مدیریت پروژه ، مدیریت سورس تیمی و دورکاری',
      img: <img src='../../../../public/images/icon/amozesh.png' className='block w-[8vw] h-[8vw] mt-[1vw]' />
    },
    {
      id: 4,
      title: 'آماده سازی برای بازار کار',
      description: 'جلسات تنظیم cv برای ساخت و اشتراک رزومه فنی در بسترهای داخلی و بین المللی کاریابی و آماده سازی دانش پژوهان برای شرکت در مصاحبه های کاری حضوری و راه دور',
      img: <img src='../../../../public/images/icon/work.png' className='block w-[8vw] h-[8vw] ' />
    },
  ];

  // Animation settings
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },  
    visible: { opacity: 1, scale: 1 },  
  };

  return (
    // wrapper 
    <div className={` max-[714px]:w-[66%] max-[714px]:mt-[50vw]  max-[570px]:w-[59%] m-auto max-[570px]:scale-[170%] max-[570px]:mt-[39vw] max-[714px]:scale-150  w-[100%] mt-[35vw] text-center
       ${selectedButton === 0 ? 'max-[750px]:mt-[25vw]' : ''}
       ${selectedButton === 2 ? 'max-[750px]:mt-[30vw]' : ''}
       `}>

        {/* title  */}
      <motion.h3 
        className='p-[2vw] text-[1.953125vw] font-black' 
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        اهداف ما در پژوهشگاه سپهر
      </motion.h3>
      <motion.p 
        className='text-[#7E7E7E] text-[1.0416666666666667vw] leading-[3vw]' 
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        تمامی گام‌ها در رسیدن به موفقیت مهم هستند
      </motion.p>
      
      {/* Items  */}
      <div  className=' flex max-[714px]:scale-125   max-[714px]:w-[80%] flex-wrap flex-col gap-[10vw] w-[100%] relative left-[-7vw] '>
        {targets.map((target, index) => (
          <motion.div
            key={target.id}
            className={` mt-[4.9vw] w-[33.723958333333336vw] absolute p-[2vw] 
            ${index === 0 ? 'max-[714px]:right-[10vw] max-[570px]:right-[8vw]  right-[7.999999vw] top-[0.1vw] ' : ''}
            ${index === 1 ? 'max-[714px]:left-[10vw] max-[714px]:top-[18vw] max-[570px]:left-[6vw] left-[12.9999999vw] top-[7.99999999vw]' : ''}
            ${index === 2 ? 'max-[714px]:right-[9vw] max-[714px]:top-[35vw] max-[570px]:right-[7vw] right-[8.1vw] top-[27.1vw]' : ''}
            ${index === 3 ? 'max-[714px]:left-[12vw] max-[714px]:top-[55vw] max-[570px]:left-[8vw] left-[13.1vw] top-[35.1vw]' : ''}
            ${selectedButton === 1 && index === 0 ? 'absolute right-[50.1100vw] top-[19.100vw] ' : ''}
            ${selectedButton === 1 && index === 1 ? 'absolute left-[50.1100vw] top-[41.100vw] ' : ''}
            ${selectedButton === 1 && index === 2 ? 'absolute right-[50.1100vw] top-[64.1100vw] ' : ''}
            ${selectedButton === 1 && index === 3 ? 'absolute left-[50.1100vw] top-[85.1100vw] ' : ''}
            
            `}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6, delay: index * 0.2 }} 
          >
            <div className="flex items-center justify-center mb-[2vw] absolute top-0 ">
              {target.img}
            </div>
            <motion.h3 
              className={`text-[1.5625vw] mt-[3vw] indent-[3vw] ${index === 0 ? 'text-right indent-[9vw]' : ''}`} 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {target.title}
            </motion.h3>
            <motion.p 
              className='text-[1.0416666666666667vw] text-right mt-[3vw]'
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: index * 0.4 }}
            >
              {target.description}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WorkshopTarget;
