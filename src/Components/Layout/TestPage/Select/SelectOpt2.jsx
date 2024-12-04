import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from 'react-query';
import { getCategoryList2 } from '../../../../Core/Services/Api/BlogPage/Category';
import { useSelector } from 'react-redux';

const SelectOpt2 = ({
  dataCat,
  width,
  placeholder,
  onChange,
  isTeacherSelect,
  isSortSelect,
  FilterValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const opt = [
    {
      id: 1,
      Category: "level",
      CategoryFa: " بر اساس سطح",
    },
    {
      id: 2,
      Category: "date",
      CategoryFa: " بر اساس تاریخ",
    },
  ];

  // Sort data for sorting options
  const sortData = [{ id: 1, value: "آخرین آپدیت" }];

  // Fetch teacher or category list based on prop

  const handleSelect = (option) => {
    
    setIsOpen(false);
    onChange(option);
  };

  const handleRemove = () => {
    setSelectedOption(null);
    
      onChange(false);
    
  };

  useEffect(() => {
    if (FilterValue) {
      setSelectedOption(null);
    }
  }, [FilterValue]);

  
  const dark = useSelector((state) => state.darkMood);
  return (
    <div
      className={`text-gray-800 relative flex-grow-[1] ${
        isOpen ? "z-10" : "z-0"
      }`}
    >
      {selectedOption && (
        <span
          className="cursor-pointer p-3 absolute left-0 top-0"
          onClick={handleRemove}
        >
          ✖
        </span>
      )}
      <div
        className=" max-[1312px]:w-[100%]   h-[40px] rounded-[10px] text-[12px] indent-3 cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: dark.bgLow,
          color: dark.textLow,
        }}
      >
        <span>{selectedOption ? selectedOption : placeholder}</span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            style={{ background: dark.bgLow, color: dark.textHigh }}
            className="absolute w-full  shadow-lg mt-1 max-h-[200px] overflow-y-auto rounded-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {opt?.map((option) => (
              <li
                key={option.id}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-[12px]"
                onClick={() => {handleSelect(option.Category);setSelectedOption(option.CategoryFa);}}
              >
                {option.CategoryFa}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectOpt2;
