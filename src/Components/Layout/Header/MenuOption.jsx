import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const MenuOption = ({ className }) => {
const dark = useSelector((state) => state.darkMood);

  const selectNavLink = `
     ${dark.selectedButton === 0 ? "text-blue-600" : ""}
    ${dark.selectedButton === 1 ? "text-green-600" : ""}
    ${dark.selectedButton === 2 ? "text-yellow-600" : ""}
    ${dark.selectedButton === 3 ? "text-red-600" : ""}
  `
    .trim()
    .replace(/\s+/g, " ");

  const {t} = useTranslation()
  return (
    <>
      <NavLink
        to="/CoursePage"
        className={({ isActive }) =>
          isActive ? ` ${className} ${selectNavLink}` : `curses ${className}`
        }
      >
        {t("header.Course")}
      </NavLink>
      <NavLink
        to="/BlogPage"
        className={({ isActive }) =>
          isActive ? `${className} ${selectNavLink}` : `curses ${className}`
        }
      >
        {t("header.News")}
      </NavLink>
      <NavLink
        to="/PodcastPage"
        className={({ isActive }) =>
          isActive ? `${className} ${selectNavLink}` : `curses ${className}`
        }
      >
        {t("header.Podcast")}
      </NavLink>
      <div className={`Events ${className}`}>{t("header.Events")}</div>
      <div className={`contactUs ${className}`}>{t("header.ContactMe")}</div>
    </>
  );
}

export default MenuOption;
