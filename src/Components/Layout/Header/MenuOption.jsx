import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MenuOption = ({ className }) => {
  const { selectedButton } = useSelector((state) => state.themeColor);

  const selectNavLink = `
    ${selectedButton === 0 ? 'text-[#4bb0d8]' : ''}
    ${selectedButton === 1 ? 'text-green-600' : ''}
    ${selectedButton === 2 ? 'text-yellow-600' : ''}
  `.trim().replace(/\s+/g, ' ');

  return (
    <>
      <NavLink
        to='/CoursePage' 
        className={({ isActive }) => 
          isActive ? `${className} ${selectNavLink}` : `curses ${className}`
        }
      >
        دوره ها
      </NavLink>         
      <NavLink
        to='/BlogPage' 
        className={({ isActive }) => 
          isActive ? `${className} ${selectNavLink}` : `curses ${className}`
        }
      >
       مقالات
      </NavLink>         
      <div className={`Events ${className}`}>رویداد ها</div>
      <div className={`contactUs ${className}`}>تماس با ما</div>
    </>
  );
}

export default MenuOption;
