import React, { useState } from 'react';
import { IoMdColorPalette } from "react-icons/io";
import { motion, AnimatePresence } from 'framer-motion'; 
import { useSelector, useDispatch } from 'react-redux';
import { selectButton } from '../../../Redux/Slice/Theme/Theme';

const ThemeColor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { selectedButton } = useSelector((state) => state.themeColor);

  const handleColorSelect = (colorIndex) => {
    dispatch(selectButton(colorIndex));
    setIsOpen(false);

    // Scroll to the top of the page when a color is selected
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.div
      className={`border w-[4.166666666666667vw] z-[1000] h-[4.166666666666667vw] rounded-full fixed bottom-[0.5208333333333334vw] left-[10.15625vw] cursor-pointer flex items-center justify-center
      ${selectedButton === 0 ? 'bg-blue-600' : ''}
      ${selectedButton === 1 ? 'bg-green-500' : ''}
      ${selectedButton === 2 ? 'bg-yellow-500' : ''}`}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}  
      onClick={() => setIsOpen(!isOpen)} 
    >
      <IoMdColorPalette className='text-white w-[3vw] h-[3vw]' />

      {/* Color Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className='bg-white shadow-lg rounded-lg w-[7vw] fixed bottom-[4vw] left-0 flex flex-col mb-[0.5vw] items-center space-y-[0.5vw] p-[0.5vw]'
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}  
            exit={{ opacity: 0, y: -10 }}    
            transition={{ duration: 0.3 }}   
          >
            <li>
              <button 
                className='max-[643px]:px-[2vw] max-[643px]:py-[1.5vw] max-[300px]:px-[3vw] max-[300px]:py-[2vw] /* end responsive */ bg-blue-500 text-white w-[100%] py-[0.5vw] px-[1vw] rounded hover:bg-blue-700'
                onClick={() => handleColorSelect(0)} 
              >
              </button>
            </li>
            <li>
              <button 
                className=' max-[643px]:px-[2vw] max-[643px]:py-[1.5vw] max-[300px]:px-[3vw] max-[300px]:py-[2vw] /* end responsive */ bg-green-500 text-white w-[100%] py-[0.5vw] px-[1vw] rounded hover:bg-green-700'
                onClick={() => handleColorSelect(1)} 
              >
              </button>
            </li>
            <li>
              <button 
                className='max-[643px]:px-[2vw] max-[643px]:py-[1.5vw] max-[300px]:px-[3vw] max-[300px]:py-[2vw] /* end responsive */ bg-yellow-500 text-white w-[100%] py-[0.5vw] px-[1vw] rounded hover:bg-yellow-700'
                onClick={() => handleColorSelect(2)}
              >
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ThemeColor;
