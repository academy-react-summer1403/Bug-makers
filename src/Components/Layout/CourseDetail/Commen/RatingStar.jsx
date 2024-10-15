// RatingStar.js
import React, { useState } from "react";

const RatingStar = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="w-[20%] flex flex-row-reverse relative top-[-0.5vw] justify-between bg-white " style={{ gap: "0.5vw", background: "transparent" }}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={`p-0 bg-transparent size-[1vw] text-[1.5vw] border-none ${
                index <= (hover || rating) ? "text-yellow-500" : "text-gray-300"
            }`}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            &#9733;
          </button>
        );
      })}
    </div>
  );
};

export default RatingStar;
