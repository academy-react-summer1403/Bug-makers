import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from 'react-query';
import { getTeacherList } from '../../../Core/Services/Api/CoursePage/TeacherList';
import { getCategoryList } from '../../../Core/Services/Api/CoursePage/Category';
import { useSelector } from 'react-redux';

const SelectOpt = ({ width, placeholder, onChange, isTeacherSelect, isSortSelect, FilterValue , className}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Sort data for sorting options
  const sortData = [
    { id: 1, value: 'Cost' , label : 'بر اساس قیمت'},
    { id: 2, value: 'StatusName', label : 'وضعیت دوره'},
    { id: 3, value: 'InsertDate' , label : 'تاریخ '},
    { id: 4, value: 'TeacherName', label : 'نام استاد' },
    { id: 5, value: 'LastUpdate', label : 'آخرین آپدیت' },
    { id: 6, value: 'LevelName' , label : 'سطح دوره'},
    { id: 7, value: 'TypeName' , label : 'تایپ دوره'},
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
  console.log(optionsList);
const dark = useSelector((state) => state.darkMood);
  return (
    <div
      className={`relative  max-[1312px]:w-[100%] ${isOpen ? "z-10" : "z-0"}`}
      
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
        className={`outline-none min-[2015px]:w-[250px] min-[3000px]:w-[350px] min-[4500px]:w-[450px] /* end responsive */ w-[160px] max-[1312px]:w-[100%] h-[40px] rounded-[10px]  text-right text-[14px] indent-[10px] leading-10 font-light  cursor-pointer ${className}`}
        onClick={() => setIsOpen(!isOpen)}
        style={{
        background: dark.bgLow,
        color: dark.textHigh,
      }}
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
            style={{
              background: dark.bgLow,
              color: dark.textHigh,
            }}
            className="absolute w-full  shadow-lg mt-1 max-h-[200px] overflow-y-auto rounded-lg"
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
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-[12px]"
                onClick={() => handleSelect(option)}
              >
                {isSortSelect
                  ? option.label
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
