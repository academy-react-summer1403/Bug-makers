import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from 'react-query';
import { getTeacherList } from '../../../../../../../Core/Services/Api/CoursePage/TeacherList';
import { getCategoryList } from '../../../../../../../Core/Services/Api/CoursePage/Category';
import { useSelector } from 'react-redux';

const SelectOpt = ({ width,placeholder, onChange, isTeacherSelect, isSortSelect, FilterValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Sort data for sorting options
  const sortData = [
    { id: 1, value: 'آخرین آپدیت' }
  ];

  // Fetch teacher or category list based on prop
  const { data: optionsList, isLoading, error } = useQuery(
    isTeacherSelect ? 'teachers' : isSortSelect ? 'sortOptions' : 'categories',
    isTeacherSelect ? getTeacherList : isSortSelect ? () => Promise.resolve(sortData) : getCategoryList
  );

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      if (isSortSelect) {
        onChange(option.value); 
      } else {
        onChange(isTeacherSelect ? option.teacherId : option.id);
      }
    }
  };

  const handleRemove = () => {
    setSelectedOption(null);
    if (onChange) {
      onChange(null);
    }
  };

  useEffect(() => {
    if (FilterValue) {
      setSelectedOption(null);
    }
  }, [FilterValue]);

  if (error) {
    return <p>خطایی رخ داده است، لطفا دوباره تلاش کنید.</p>;
  }
const dark = useSelector((state) => state.darkMood);
  return (
    <div
      style={{ background: dark.bgLow, color: dark.textHigh }}
      className={`text-gray-500 relative flex-grow-[1] ${
        isOpen ? "z-10" : "z-0"
      } ${width == "myCourse" ? "hidden" : "block"}`}
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
        style={{ background: dark.bgLow, color: dark.textHigh }}
        className="w-full h-[40px] rounded-[10px] text-[12px]  indent-3 cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {selectedOption
            ? selectedOption.fullName ||
              selectedOption.techName ||
              selectedOption.value
            : placeholder}
        </span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            style={{ background: dark.bgHigh, color: dark.textHigh }}
            className="absolute w-full shadow-lg mt-1 max-h-[200px] overflow-y-auto rounded-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {optionsList?.map((option) => (
              <li
                key={
                  isSortSelect
                    ? option.id
                    : isTeacherSelect
                    ? option.teacherId
                    : option.id
                }
                className="px-4 py-2 hover:bg-gray-500 cursor-pointer text-[12px]"
                onClick={() => handleSelect(option)}
              >
                {isSortSelect
                  ? option.value
                  : isTeacherSelect
                  ? option.fullName
                  : option.techName}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectOpt;
