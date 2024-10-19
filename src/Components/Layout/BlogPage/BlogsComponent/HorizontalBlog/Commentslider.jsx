import React, { useState } from 'react';

const Commentslider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      author: 'نام نویسنده نظر 1',
      text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    },
    {
      author: 'نام نویسنده نظر 2',
      text: 'این یک نمونه از متن دیگری است برای اسلاید دوم',
    },
    {
      author: 'نام نویسنده نظر 3',
      text: 'اسلاید سوم با یک متن نمونه',
    },
  ];

  const moveToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* Slider content */}
      <div className="relative w-3/4 bg-white h-full rounded-lg shadow-lg overflow-hidden">
        <div
          className="slider-content flex transition-transform duration-300 h-full"
         
        >
          {slides.map((slide, index) => (
            <div key={index} className="slide w-full flex flex-col items-end px-4">
              <p className="text-gray-500">{slide.author}</p>
              <p className="text-gray-800">{slide.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Slider controls */}
      <div className="flex justify-center space-x-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            onClick={() => moveToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Commentslider;