import { useSelector } from "react-redux";

const SearchBox = ({width, placeHolder, icon, value, onChange , className }) => {
  const dark = useSelector((state) => state.darkMood);
  return (
    <input
      type="text"
      style={{
        background: dark.bgLow,
        color: dark.textHigh,
      }}
      className={`outline-none min-[2015px]:w-[250px] min-[3000px]:w-[350px] min-[4500px]:w-[450px] /* end responsive */ w-[750px] max-[1312px]:w-[100%] h-[40px] rounded-[10px]  text-right text-[14px] indent-[10px] leading-10 font-light  cursor-pointer ${className}`}
      placeholder={placeHolder}
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchBox;
