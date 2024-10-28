import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // اضافه شدن AnimatePresence
import { useSelector } from 'react-redux';
import { FaArrowTurnUp } from "react-icons/fa6";

const ScrollTopButton = () => {
  const [scrollTopBtn, setScrollTopBtn] = useState(false);
  const { selectedButton } = useSelector((state) => state.themeColor);

//   show button handle scroll
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setScrollTopBtn(true);
    } else {
      setScrollTopBtn(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {scrollTopBtn && (
        <motion.div
          className={`  min-[1700px]:w-16 min-[1700px]:h-16  /* end responsive */ border w-10 z-[1000] h-10 rounded-full fixed bottom-[0.5208333333333334vw] right-[3.15625vw] cursor-pointer flex items-center justify-center
          ${selectedButton === 0 ? 'bg-blue-600' : ''}
          ${selectedButton === 1 ? 'bg-green-500' : ''}
          ${selectedButton === 2 ? 'bg-yellow-500' : ''}`}
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }} 
          transition={{ duration: 0.5, ease: 'easeInOut' }} 
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        >
          <FaArrowTurnUp className='text-white w-[50%] h-[50%]' />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollTopButton;
