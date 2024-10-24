import React, { useState, useEffect } from 'react';
import { CiSearch, CiUser, CiMenuBurger, CiLogin } from "react-icons/ci";
import MenuOption from './MenuOption';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getItem } from '../../../Core/Services/common/storage.services';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { selectedButton } = useSelector((state) => state.themeColor);

  const getItem = useSelector((state) => state.LoginToken.token)
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
  return (
    <div className={`z-[1000] h-16 flex items-center justify-center flex-row flex-nowrap shadow-[0px_10px_10px_0px_#00000008] transition-all duration-300 
      ${isSticky ? 'fixed top-0 left-0 w-full bg-[#F5F5F4]' : 'relative bg-[#F5F5F4]'}`}>
      
      {/* Menu in Responsive */}
      <div className='max-[625px]:block  /* end responsive */ mobileMode w-8 h-8 absolute right-[40px] cursor-pointer hidden '>
        <CiMenuBurger 
          className='max-[394px]:w-5 max-[394px]:h-6 max-[394px]:mt-1 /*end responsive*/ m-auto w-7 h-7' 
          onClick={() => setOpenMenu(!openMenu)}
        />
        <ul className={`max-[362px]:w-[200px] max-[254px]:w-[150px] /*end responsive*/ border w-[300px] rounded-lg mt-2 bg-[#f5f5f4] shadow-[0px_10px_10px_0px_#00000008] transition-all duration-100 ${openMenu ? 'visible opacity-100' : 'invisible opacity-0'}`}>
          <MenuOption 
            className={`p-1 indent-4 cursor-pointer 
              ${selectedButton === 0 ? 'hover:text-[#4bb0d8] ' : ''}
              ${selectedButton === 1 ? 'hover:text-green-600' : ''}
              ${selectedButton === 2 ? 'hover:text-yellow-600' : ''}
            `}
          />
        </ul>
      </div>
      <Link to={'/'} onClick={handleScrollToTop}>
      <img src='../../../../../../public/images/icon/Logo.png' className='max-[842px]:w-[100px] max-[842px]:h-[25px] max-[842px]:top-5 max-[625px]:m-auto /*end responsive*/ logo h-[40px] w-[170px] absolute top-3 right-[80px]' />
      </Link>
      <div className='max-[710px]:text-[13px] max-[710px]:gap-5 max-[394px]:text-[10px] max-[394px]:gap-3 max-[652px]:hidden /*end responsive*/ menu w-[42vw] whitespace-nowrap text-[14px] flex justify-center items-center flex-row flex-nowrap gap-10'>
        <MenuOption 
          className={`cursor-pointer 
            ${selectedButton === 0 ? 'hover:text-[#4bb0d8]' : ''}
            ${selectedButton === 1 ? 'hover:text-green-600' : ''}
            ${selectedButton === 2 ? 'hover:text-yellow-600' : ''}
          `}
        />
      </div>

      <div className='cursor-pointer max-[710px]:w-[30px] max-[710px]:h-[30px] max-[625px]:left-[80px] max-[465px]:left-[40px] max-[394px]:w-7 max-[394px]:h-7 /* end responsive */ search border rounded-[15px] w-[45px] h-[30px] absolute left-[142px] bg-custom-gradient-Header shadow-custom-shadow'>
        <CiSearch className='max-[710px]:w-4 max-[710px]:h-4 /*end responsive*/ m-auto w-5 h-5 mt-1 searchIcon' />
      </div>
      
      <div className='cursor-pointer max-[710px]:w-[30px] max-[710px]:h-[30px] max-[625px]:left-[30px] max-[465px]:left-[8px] max-[394px]:w-7 max-[394px]:h-7 /*end responsive*/ profile border rounded-[15px] w-[45px] h-[30px] absolute left-[80px] bg-custom-gradient-Header shadow-custom-shadow'>
        {getItem ? (
        <CiUser className='m-auto h-5 w-5 mt-1' onClick={() => navigate('/ClientPanel/dashbord')} />) : (
        <CiLogin className='m-auto h-5 w-5 mt-1' onClick={() => navigate('/sign/login')} />
        ) }
      </div>
    </div>
  );
};

export default Header;
