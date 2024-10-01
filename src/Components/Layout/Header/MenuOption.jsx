import React from 'react'

const MenuOption = ({ className }) => {
  return (
    <>
        <div className={`curses ${className}`}  >دوره ها</div>         
        <div className={`Articles ${className}`}>مقالات</div>
        <div className={`Events ${className}`}>رویداد ها</div>
        <div className={`contactUs ${className}`}>تماس با ما</div>
    </>
  )
}

export default MenuOption