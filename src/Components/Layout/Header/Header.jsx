import React, { useState, useEffect, useRef } from 'react';
import { CiSearch, CiUser, CiMenuBurger, CiLogin } from "react-icons/ci";
import MenuOption from './MenuOption';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getItem } from '../../../Core/Services/common/storage.services';
import LanguageSelector from '../../language-selector'
import { useTranslation } from 'react-i18next';
import SearchModal from '../../Common/searchModal/searchModal';
import SiteSetting from '../../../Pages/site setting/SiteSetting';
import VoiceCommand from '../../Common/VoiceAssit/VoiceAssit';
const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  


  const isLogin = getItem('token');
  const getItem2 = useSelector((state) => state.LoginToken.token)
  console.log(getItem2);
  // Handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
const navigate = useNavigate()

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

  const {i18n} = useTranslation()
  const ref = useRef();

  useEffect(() => {
    ref.current.dir = i18n.dir()
  }, [i18n, i18n.language])


  const dark = useSelector((state) => state.darkMood);

  return (
    <div
      ref={ref}
      className={`z-[1000] step2 min-[1940px]:h-36 h-16  flex items-center justify-center flex-row flex-nowrap shadow-[0px_10px_10px_0px_#00000008] transition-all duration-300 
      ${isSticky ? "fixed top-0 right-0 w-[100%] " : "relative w-[100%] "}`}
      style={{ background: dark.bgHigh, color: dark.textHigh }}
    >
      {/* Menu in Responsive */}
      <div className=" max-[625px]:block  /* end responsive */ mobileMode w-8 h-8 absolute right-[40px] cursor-pointer hidden ">
        <CiMenuBurger
          className="max-[394px]:w-5  max-[394px]:h-6 max-[394px]:mt-1 /*end responsive*/ m-auto w-7 h-7"
          onClick={() => setOpenMenu(!openMenu)}
        />
        <ul
          className={` max-[362px]:w-[200px] lg:text-xl   max-[254px]:w-[150px] /*end responsive*/ border w-[300px] rounded-lg mt-2  shadow-[0px_10px_10px_0px_#00000008] transition-all duration-100 ${
            openMenu ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <MenuOption
            className={` lg:text-xl p-1 indent-4 cursor-pointer 
              ${dark.selectedButton === 0 ? "hover:text-blue-500 " : ""}
              ${dark.selectedButton === 1 ? "hover:text-green-600" : ""}
              ${dark.selectedButton === 2 ? "hover:text-yellow-600" : ""}
              ${dark.selectedButton === 3 ? "hover:text-[#dd0208]" : ""}
            `}
          />
        </ul>
      </div>
      <Link to={"/"} onClick={handleScrollToTop}>
        <img
          src="../../../../../../public/images/icon/Logo.png"
          className="max-[842px]:w-[100px] max-[842px]:h-[25px] max-[842px]:top-5 max-[625px]:m-auto /*end responsive*/ logo h-[40px] w-[170px] absolute top-3 right-[80px]"
        />
      </Link>
      <div className=" max-[710px]:text-[13px] max-[710px]:gap-5 max-[394px]:text-[10px] max-[394px]:gap-3 max-[652px]:hidden /*end responsive*/ menu w-[42vw] whitespace-nowrap text-[14px] flex justify-center items-center flex-row flex-nowrap gap-10">
        <MenuOption
          className={`cursor-pointer 
            ${dark.selectedButton === 0 ? "hover:text-blue-500" : ""}
            ${dark.selectedButton === 1 ? "hover:text-green-600" : ""}
            ${dark.selectedButton === 2 ? "hover:text-yellow-600" : ""}
            ${dark.selectedButton === 3 ? "hover:text-[#dd0208]" : ""}
          `}
        />
      </div>
      {/* <LanguageSelector /> */}
      <VoiceCommand classes='absolute top-[-21px] left-[320px]' />
      <SearchModal />

      <div className="cursor-pointer max-[710px]:w-[30px] max-[710px]:h-[30px] max-[625px]:left-[30px] max-[465px]:left-[8px] max-[394px]:w-7 max-[394px]:h-7 /*end responsive*/ profile border rounded-[15px] w-[45px] h-[30px] absolute left-[150px]  shadow-xl">
        {getItem2 || isLogin ? (
          <CiUser
            className="m-auto h-5 w-5 mt-1"
            onClick={() => navigate("/ClientPanel/dashbord")}
          />
        ) : (
          <CiLogin
            className="m-auto h-5 w-5 mt-1"
            onClick={() => navigate("/sign/login")}
          />
        )}
      </div>
      <SiteSetting />
    </div>
  );
};

export default Header;
