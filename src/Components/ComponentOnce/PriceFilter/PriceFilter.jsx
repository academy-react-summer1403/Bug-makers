import React, { useState } from 'react';

const PriceFilter = ({ onFilter }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [selectedMinPrice, setSelectedMinPrice] = useState(0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(1000000);
  const [timer, setTimer] = useState(null);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;

    if (name === 'minPrice') {
      if (Number(value) <= selectedMaxPrice) {
        setSelectedMinPrice(Number(value));
      }
    } else if (name === 'maxPrice') {
      if (Number(value) >= selectedMinPrice) {
        setSelectedMaxPrice(Number(value));
      }
    }

    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      onFilter(selectedMinPrice, selectedMaxPrice);
    }, 1000);

    setTimer(newTimer);
  };

  return (
    <div className="price-filter   h-[40px] max-[1024px]:w-[100%]   relative flex flex-nowrap justify-center items-center gap-3">
      <h3 className="absolute right-0 top-3 text-[15px] max-[1024px]:text-[15px]">قیمت:</h3>
      <span className="absolute text-[13px] right-8 top-0 max-[1024px]:text-[10px]">حداکثر: {selectedMaxPrice}</span>
      <span className="absolute text-[13px] left-[0] top-[-2px] max-[1024px]:text-[10px] ">حداقل: {selectedMinPrice}</span>
      <div className="range-slider relative w-[10vw] max-[1024px]:w-[100%] top-2 mr-16  h-[4px] rounded-3xl border-[4px] border-[#C7C7C7] ">
        <input
          type="range"
          name="minPrice"
          min={minPrice}
          max={maxPrice}
          value={selectedMinPrice}
          onChange={handlePriceChange}
          step={10000}
          className="absolute right-0 top-[-10px] w-full"
          style={{ zIndex: selectedMinPrice < maxPrice ? '2' : '0' }}
        />
        <input
          type="range"
          name="maxPrice"
          min={minPrice}
          max={maxPrice}
          value={selectedMaxPrice}
          onChange={handlePriceChange}
          step={10000}
          className="absolute left-0 top-[-10px] w-full"
        />
      </div>
    </div>
  );
};

export default PriceFilter;
