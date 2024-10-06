import React, { useState } from 'react';
import moment from 'jalali-moment';
import { motion, AnimatePresence } from 'framer-motion';

const DateModal = ({ onFilter }) => {
  const [startDay, setStartDay] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endDay, setEndDay] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endYear, setEndYear] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [hasData, setHasData] = useState(true);

  const handleFilter = () => {
    const startDate = moment(`${startYear}-${startMonth}-${startDay}`, 'YYYY-MM-DD').format('YYYY-MM-DD');
    const endDate = moment(`${endYear}-${endMonth}-${endDay}`, 'YYYY-MM-DD').format('YYYY-MM-DD');
    
    const data = onFilter(startDate, endDate);

    if (data) {
      setHasData(true);
      setIsOpen(false);
    } else {
      setHasData(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      {/* Modal Trigger Button */}
      <div
        className="w-[160px] h-[40px] rounded-[10px] bg-[#F2F2F2] text-right text-[14px] indent-[10px] leading-10 font-light text-[#808080] cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        بازه زمانی
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-10"
            initial={{ opacity: 0, y: -100 }}  
            animate={{ opacity: 1, y: 0 }}    
            exit={{ opacity: 0, y: -100 }}    
            transition={{ duration: 0.5 }}    
          >
            <div className="w-[514px] relative h-[303px] bg-white p-5 rounded-lg shadow-lg">
              <h2 className="text-lg mb-4 text-right">فیلتر بازه زمانی</h2>
              <hr />
              <div className="flex relative justify-center items-center flex-row flex-nowrap">
                {/* Start Date */}
                <div className="flex flex-row items-center flex-nowrap absolute top-10 right-3">
                  <label className="text-[13px]">تاریخ شروع:</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      className="border px-2 m-2 py-1 rounded-[7px] w-[43px] h-[25px] mr-8 bg-[#F2F2F2] text-[11px]"
                      placeholder="روز"
                      value={startDay}
                      onChange={(e) => setStartDay(e.target.value)}
                    />
                    <input
                      type="text"
                      className="border px-2 m-2 py-1 rounded-[7px] w-[43px] h-[25px] bg-[#F2F2F2] text-[11px]"
                      placeholder="ماه"
                      value={startMonth}
                      onChange={(e) => setStartMonth(e.target.value)}
                    />
                    <input
                      type="text"
                      className="border px-2 m-2 py-1 rounded-[7px] w-[43px] h-[25px] bg-[#F2F2F2] text-[11px]"
                      placeholder="سال"
                      value={startYear}
                      onChange={(e) => setStartYear(e.target.value)}
                    />
                  </div>
                </div>

                {/* End Date */}
                <div className="flex flex-row flex-nowrap justify-center items-center absolute top-24 right-3">
                  <label className="text-[13px]">تاریخ پایان:</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      className="border px-2 m-2 py-1 rounded-[7px] w-[43px] h-[25px] bg-[#F2F2F2] mr-8 text-[11px]"
                      placeholder="روز"
                      value={endDay}
                      onChange={(e) => setEndDay(e.target.value)}
                    />
                    <input
                      type="text"
                      className="border px-2 m-2 py-1 rounded-[7px] w-[43px] h-[25px] bg-[#F2F2F2] text-[11px]"
                      placeholder="ماه"
                      value={endMonth}
                      onChange={(e) => setEndMonth(e.target.value)}
                    />
                    <input
                      type="text"
                      className="border px-2 m-2 py-1 rounded-[7px] w-[43px] h-[25px] bg-[#F2F2F2] text-[11px]"
                      placeholder="سال"
                      value={endYear}
                      onChange={(e) => setEndYear(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Confirm and Cancel Buttons */}
              <button
                className="bg-[#91ACCF] text-white w-[106px] h-[30px] rounded-[8px] absolute bottom-5 right-36"
                onClick={handleFilter}
              >
                تایید
              </button>
              <button
                className="bg-transparent text-[#626262] w-[106px] border-2 border-[#91ACCF] h-[30px] rounded-[8px] absolute bottom-5 left-36"
                onClick={() => {
                  setIsOpen(false);
                  setStartDay('');
                  setStartMonth('');
                  setStartYear('');
                  setEndDay('');
                  setEndMonth('');
                  setEndYear('');
                  setHasData(true);
                }}
              >
                انصراف
              </button>
                {/* Display message if no data */}
                {!hasData && (
                  <p className="text-black mt-2">
                    دیتا یافت نشد
                  </p>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DateModal;
