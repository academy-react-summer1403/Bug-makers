import React from "react";
import { useSelector } from "react-redux";

const BDMore = ()=>{
    const dark = useSelector((state) => state.darkMood);
    return (
      <div
        style={{ background: dark.bgHigh, color: dark.textHigh }}
        className="w-full h-[3vw] px-[1vw] rounded-[0.52vw] shadow-[-0.26vw_0.26vw_0.26vw_0_rgba(0,0,0,0.1)]  flex justify-between items-center text-[0.83vw]"
      >
        <span>یه عنوان دیگه</span>
        <svg
          width="1.2vw"
          height="1.25vw"
          viewBox="0 0 23 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 22.5C13 23.33 12.33 24 11.5 24C10.67 24 10 23.33 10 22.5C10 21.67 10.67 21 11.5 21C12.33 21 13 21.67 13 22.5ZM16.5 21C15.67 21 15 21.67 15 22.5C15 23.33 15.67 24 16.5 24C17.33 24 18 23.33 18 22.5C18 21.67 17.33 21 16.5 21ZM21.5 21C20.67 21 20 21.67 20 22.5C20 23.33 20.67 24 21.5 24C22.33 24 23 23.33 23 22.5C23 21.67 22.33 21 21.5 21ZM6.5 21C5.67 21 5 21.67 5 22.5C5 23.33 5.67 24 6.5 24C7.33 24 8 23.33 8 22.5C8 21.67 7.33 21 6.5 21ZM1.5 21C0.67 21 0 21.67 0 22.5C0 23.33 0.67 24 1.5 24C2.33 24 3 23.33 3 22.5C3 21.67 2.33 21 1.5 21ZM16.81 12.28L12.5 16.43V1C12.5 0.45 12.05 0 11.5 0C10.95 0 10.5 0.45 10.5 1V16.42L6.19 12.27C5.79 11.89 5.16 11.9 4.78 12.3C4.4 12.7 4.41 13.33 4.81 13.71L9.38 18.11C9.95 18.68 10.7 18.99 11.5 18.99C12.3 18.99 13.05 18.68 13.61 18.12L18.2 13.71C18.6 13.33 18.61 12.69 18.23 12.3C17.85 11.91 17.21 11.89 16.82 12.27L16.81 12.28Z"
            fill="#949494"
          />
        </svg>
      </div>
    );
}
export default BDMore