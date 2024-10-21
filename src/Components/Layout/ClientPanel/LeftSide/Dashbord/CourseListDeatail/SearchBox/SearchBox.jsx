const SearchBox = ({width, placeHolder, icon, value, onChange }) => {
    return (
      <input
        type="text"
        className={ ` text-gray-900 flex-grow-[1] h-[40px] rounded-[10px] text-[12px] bg-no-repeat bg-[5%_50%] indent-3 bg-[#F2F2F2] ${icon}`}
        placeholder={placeHolder}
        value={value} 
        onChange={onChange} 
      />
    );
  };
  
  export default SearchBox;
  