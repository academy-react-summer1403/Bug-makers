import { useSelector } from "react-redux";

const SearchBox = ({width, placeHolder, icon, value, onChange }) => {
    const dark = useSelector((state) => state.darkMood);
  return (
    <div
      style={{ background: dark.bgLow, color: dark.textHigh }}
      className="relative max-md:col-span-2 text-gray-500 flex-grow-[2] h-[40px] rounded-[10px] text-[12px] overflow-hidden"
    >
      <input
        type="text"
        className={` pr-2 w-full h-full bg-transparent  ${icon}`}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
      />
      <div
        className={`absolute top-0 left-0 w-[40px] h-full rounded-lg flex items-center justify-center
          ${dark.selectedButton === 0 ? "bg-blue-600" : ""} 
          ${dark.selectedButton === 1 ? "bg-green-600" : ""} 
          ${dark.selectedButton === 2 ? "bg-yellow-600" : ""}
          ${dark.selectedButton === 3 ? "bg-red-600" : ""}
          `}
      >
        <svg
          width=""
          height="60%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.5 17.5L22 22"
            stroke="#FEFDFF"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
            stroke="#FEFDFF"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
  };
  
  export default SearchBox;
  