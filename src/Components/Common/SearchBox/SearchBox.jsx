const SearchBox = ({width, placeHolder, icon, value, onChange }) => {
  return (
    <input
      type="text"
      className="outline-none min-[2015px]:w-[250px] min-[3000px]:w-[350px] min-[4500px]:w-[450px] /* end responsive */ w-[160px] max-[1312px]:w-[100%] h-[40px] rounded-[10px] bg-[#F2F2F2] text-right text-[14px] indent-[10px] leading-10 font-light text-[#808080] cursor-pointer"
      placeholder={placeHolder}
      value={value} 
      onChange={onChange} 
    />
  );
};

export default SearchBox;
