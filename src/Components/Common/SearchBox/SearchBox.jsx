const SearchBox = ({ placeHolder, icon, value, onChange }) => {
    return (
      <input
        type="text"
        className={`w-[160px] h-[40px] rounded-[10px] text-[12px] bg-no-repeat bg-[5%_50%] indent-3 bg-[#F2F2F2] ${icon}`}
        placeholder={placeHolder}
        value={value} // مقدار کنترل شده
        onChange={onChange} // مدیریت تغییرات
      />
    );
  };
  
  export default SearchBox;
  