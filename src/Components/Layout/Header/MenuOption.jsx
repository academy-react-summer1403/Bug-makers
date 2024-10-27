import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const MenuOption = ({ className }) => {
  const { selectedButton } = useSelector((state) => state.themeColor);

  const selectNavLink = `
    ${selectedButton === 0 ? 'text-[#4bb0d8]' : ''}
    ${selectedButton === 1 ? 'text-green-600' : ''}
    ${selectedButton === 2 ? 'text-yellow-600' : ''}
  `.trim().replace(/\s+/g, ' ');

  const {t} = useTranslation()
  return (
    <>
      <NavLink
        to='/CoursePage' 
        className={({ isActive }) => 
          isActive ? ` ${className} ${selectNavLink}` : `curses ${className}`
        }
      >
       {t("header.Course")}
      </NavLink>         
      <NavLink
        to='/BlogPage' 
        className={({ isActive }) => 
          isActive ? `${className} ${selectNavLink}` : `curses ${className}`
        }
      >
       {t("header.News")}
      </NavLink>         
      <div className={`Events ${className}`}>
        {t("header.Events")}
      </div>
      <div className={`contactUs ${className}`}>
        {t("header.ContactMe")}
      </div>
    </>
  );
}

export default MenuOption;
