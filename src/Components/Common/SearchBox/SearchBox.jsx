const SearchBox = ({width, placeHolder, icon, value, onChange }) => {
    return (
      <input
        type="text"
        className="flex-grow-[2]  h-[40px] rounded-[10px] bg-[#F2F2F2] text-right text-[14px] indent-[10px] leading-10 font-light text-[#808080] cursor-pointer"
        placeholder={placeHolder}
        value={value} 
        onChange={onChange} 
      />
    );
  };
  
  export default SearchBox;
  