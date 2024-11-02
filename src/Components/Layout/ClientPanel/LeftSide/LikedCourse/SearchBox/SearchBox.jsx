const SearchBox = ({width, placeHolder, icon, value, onChange }) => {
    return (
      <div className="relative max-md:col-span-2 max-md:w-full text-gray-900 w-[30%] h-[40px] rounded-[10px] text-[12px] overflow-hidden">
        <input
          type="text"
          className={`w-full h-full bg-no-repeat bg-[5%_50%] indent-3 bg-[#F2F2F2] ${icon}`}
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
        />
        <div className="absolute top-0 left-0 w-[40px] h-full bg-[#E1C461] rounded-lg flex items-center justify-center">
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
  