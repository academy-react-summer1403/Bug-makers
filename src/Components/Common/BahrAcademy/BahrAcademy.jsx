import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { CgLayoutGrid } from 'react-icons/cg';

const BahrAcademy = () => {
  const { selectedButton } = useSelector((state) => state.themeColor);

  // Animation settings
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // translate 
  const {t , i18n} = useTranslation()
  const direction = i18n.dir()
  const dark = useSelector((state) => state.darkMood);
  return (

    // wrapper 

    
    <motion.div
      className={` ${direction == 'ltr' ? 'ml-[7vw]' : 'mr-[7vw]'}  w-[36vw] h-[40vw]  p-[3vw] max-[714px]:w-[80vw]  relative  mt-[3.0416666666666667vw] z-10 rounded-lg
        ${selectedButton === 1 ? 'mt-[23.999999999999vw] mr-[29.99999999999vw]  p-[1.1vw] h-[20.10vw]' : 'mt-[1.04016666666666667vw] bg-transparent'}
      `}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.5 }}
    >
      {/* title  */}
      <h1 className={`${direction == 'ltr' ? 'text-left' : 'text-right'} max-[750px]:text-[3vw] max-[714px]:text-[5vw] max-[714px]:leading-[10vw] max-[714px]:text-blue-600   max-[468px]:text-[4vw] /* end responsive */ text-[1.953125vw] academyH1 text-[#5E5E5E]`}>{t("content.bahrAcademy.h1")}</h1>
      <p className={`${direction == 'ltr' ? 'text-left' : 'text-right'} max-[750px]:text-[1.5vw] max-[714px]:text-[3vw] max-[714px]:leading-[5vw]  max-[468px]:text-[2vw]  /* end responsive */ text-[0.9114583333333334vw]  text-[#7E7E7E] font-bold mt-[1vw] leading-[3vw]`}>
      {t("content.bahrAcademy.p")}
      </p>
      {/* Btn  */}
      <Link to={'/CoursePage'}>
      <motion.button
        className={`${direction == 'ltr' ? 'left-[3vw]' : 'right-[3vw]'} max-[468px]:text-[2vw] max-[714px]:text-[3vw] /* end responsive */ absolute  px-[2.8vw] py-[0.7vw] text-[1.2vw]  mt-[1vw] rounded-3xl text-white 
          ${selectedButton === 0 ? 'bg-blue-600' : ''} 
          ${selectedButton === 1 ? 'bg-green-600' : ''} 
          ${selectedButton === 2 ? 'bg-yellow-600' : ''}
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}  
      >
        {t("content.bahrAcademy.button")}
      </motion.button>
      </Link>
    </motion.div>
  );
};

export default BahrAcademy;
