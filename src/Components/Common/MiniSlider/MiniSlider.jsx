import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useSelector } from 'react-redux';

const MiniSlider = ({ isHovered  }) => {
  const { selectedButton } = useSelector((state) => state.themeColor);

  const [currentSlide, setCurrentSlide] = useState(2); 

  const logos = [
    { id: 1, img: '/Image/Icon/alibaba.png' },
    { id: 2, img: '/Image/Icon/digikala.png' },
    { id: 3, img: '/Image/Icon/khdokar.png' },
    { id: 4, img: '/Image/Icon/snap.png' },
    { id: 5, img: '/Image/Icon/agagh.png' },
    { id: 6, img: '/Image/Icon/game.png' },
  ];

  const nextSlide = () => {
    if (logos.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % logos.length); 
    }
  }

  const prevSlide = () => {
    if (logos.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + logos.length) % logos.length); 
    }
  };

  // Automatic slide
  useEffect(() => {
    if (!isHovered) {
      const intervalId = setInterval(prevSlide, 3000); 
      return () => clearInterval(intervalId);
    }
  }, [isHovered]);

  return (
    <>
      {/* Slider */}
      <motion.div className='slider w-[80%] mt-[5vw] m-auto h-[15vw] z-10 overflow-hidden relative'>
        <div className='w-[100%] h-[100%] flex justify-center items-center flex-row gap-[5vw]'>
          {logos.map((logo, index) => {
            const isCenter = index === currentSlide;
            
            return (
              <div
                key={logo.id} 
                className={`w-[6.90625vw] h-[6.90625vw] border-2 rounded-2xl transition-transform duration-300 ease-in-out ${isCenter ? 'scale-150' : 'scale-100'}`}
              >
                <img 
                  src={logo.img} 
                  alt={`logo-${index}`} 
                  className={`w-[100%] h-[100%] object-contain rounded-2xl transition duration-300 ${isCenter ? '' : 'filter grayscale'}`} 
                />
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Right & Left Buttons */}
      <motion.button 
        onClick={nextSlide} 
        className='text-gray-500 absolute left-[5vw] top-[25vw]'
      >
        <FaChevronLeft className='w-[6vw] h-[6vw]' />
      </motion.button>

      <motion.button 
        onClick={prevSlide} 
        className='text-gray-500 absolute right-[5vw] top-[24.5vw]'
      >
        <FaChevronRight className='w-[6vw] h-[6vw]' />
      </motion.button>

      {/* Item Status */}
      <motion.ul className='flex justify-center gap-[1vw] mt-[2vw]'>
        {logos.map((logo, index) => {
          const isActive = index === currentSlide;

          return (
            <li
              key={logo.id} 
              className={`w-[20px] h-[20px] border-2 cursor-pointer rounded-full transition duration-300
                ${isActive && selectedButton === 0 ?   'bg-blue-600' : ''} 
                ${isActive && selectedButton === 1 ?   'bg-green-600' : ''} 
                ${isActive && selectedButton === 2 ?   'bg-yellow-600' : ''} `}
            />
          );
        })}
      </motion.ul>
    </>
  );
};

export default MiniSlider;
