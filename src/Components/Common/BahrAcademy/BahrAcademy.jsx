import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

const BahrAcademy = () => {
  const { selectedButton } = useSelector((state) => state.themeColor);

  // Animation settings
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };



  return (

    // wrapper 

    <motion.div
      className={`  w-[36vw]   relative mr-[7vw] mt-[3.0416666666666667vw] z-10 rounded-lg
        ${selectedButton === 1 ? 'mt-[23.999999999999vw] mr-[29.99999999999vw] bg-white p-[1.1vw] h-[20.10vw]' : 'mt-[1.04016666666666667vw] bg-transparent'}
      `}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.5 }}
    >
      {/* title  */}
      <h1 className='max-[750px]:text-[3vw] text-right max-[468px]:text-[4vw] /* end responsive */ text-[1.953125vw] font-extrabold text-[#5E5E5E]'>آکادمی بحرالعلوم</h1>
      <p className='max-[750px]:text-[1.5vw] text-right max-[468px]:text-[2vw]  /* end responsive */ text-[0.9114583333333334vw]  text-[#7E7E7E] font-bold mt-[1vw] leading-[3vw]'>
        آکادمی جامعه کوچکی است از ذهن های بزرگ برای رشد مراتب تخصص و دانستگی
        هدف تغییر سرنوشت هاست با درک دوباره لذت کدنویسی
      </p>
      {/* Btn  */}
      <Link to={'/CoursePage'}>
      <motion.button
        className={` max-[468px]:text-[2vw] /* end responsive */ absolute right-[1vw] p-[0.5vw] text-[1.2vw]  mt-[1vw] rounded-3xl text-white 
          ${selectedButton === 0 ? 'bg-blue-600' : ''} 
          ${selectedButton === 1 ? 'bg-green-600 m-1' : ''} 
          ${selectedButton === 2 ? 'bg-yellow-600' : ''}
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}  
      >
        مشاهده دوره
      </motion.button>
      </Link>
    </motion.div>
  );
};

export default BahrAcademy;
