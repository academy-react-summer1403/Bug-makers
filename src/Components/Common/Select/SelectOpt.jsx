import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from 'react-query';
import { getTeacherList } from '../../../Core/Services/Api/CoursePage/TeacherList';
import { getCategoryList } from '../../../Core/Services/Api/CoursePage/Category';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; // آیکن اسپینر

const SelectOpt = ({ placeholder, onChange, isTeacherSelect, FilterValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const { data: optionsList, isLoading, error } = useQuery(
    isTeacherSelect ? 'teachers' : 'categories', 
    isTeacherSelect ? getTeacherList : getCategoryList
  );

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(isTeacherSelect ? option.teacherId : option.id);
    }
  };

  const handleRemove = () => {
    setSelectedOption(null);
    if (onChange) {
      onChange(null);
    }
  };

  // استفاده از useEffect برای ریست کردن selectedOption
  useEffect(() => {
    if (FilterValue) {
      setSelectedOption(null); // ریست کردن مقدار
    }
  }, [FilterValue]);



  if (error) {
    return <p>خطایی رخ داده است، لطفا دوباره تلاش کنید.</p>;
  }

  return (
    <div className={`relative w-[160px] ${isOpen ? 'z-10' : 'z-0'}`}>
      {selectedOption && (
        <span
          className="cursor-pointer p-3 absolute left-0 top-0"
          onClick={handleRemove}
        >
          ✖
        </span>
      )}
      <div
        className="w-full h-[40px] rounded-[10px] text-[12px] bg-[#F2F2F2] indent-3 cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption ? selectedOption.fullName || selectedOption.techName : placeholder}</span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="absolute w-full bg-white shadow-lg mt-1 max-h-[200px] overflow-y-auto rounded-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {optionsList?.map((option) => (
              <li
                key={isTeacherSelect ? option.teacherId : option.id} 
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-[12px]"
                onClick={() => handleSelect(option)}
              >
                {isTeacherSelect ? option.fullName : option.techName}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectOpt;
