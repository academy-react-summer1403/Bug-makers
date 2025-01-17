import React, { useEffect , useRef , useState} from 'react'
import { useSelector } from 'react-redux';
import { svgThemeBlue } from '../SvgPath/SvgPath';
import { svgThemeGreen } from '../SvgPath/SvgPath';
import { svgThemeYellow } from '../SvgPath/SvgPath';
import { useTranslation } from 'react-i18next';

const ScrollSvg = () => {

  const dark = useSelector((state) => state.darkMood);

    const pathRef = useRef(null);

    useEffect(() => {
      const path = pathRef.current;
      const pathLength = path.getTotalLength();

      setTimeout(() => {
        path.style.strokeDashoffset = 33000;
        path.style.transition = 'stroke-dashoffset 1s '; 
    }, 0);
  
      path.style.strokeDasharray = `${pathLength} ${pathLength}`;
      path.style.strokeDashoffset = pathLength;

      // scroll 
      const handleScroll = () => {
        const scrollPercentage =
          (document.documentElement.scrollTop + document.body.scrollTop) /
          (document.documentElement.scrollHeight - document.documentElement.clientHeight);
        const drawLength = pathLength * scrollPercentage;
        path.style.strokeDashoffset = 33000 - drawLength;
      };

      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const {i18n} = useTranslation();
    const direction = i18n.dir()

  return (
    <div
      className={`w-[100%] max-[800px]:hidden overflow-hidden absolute top-0 z-0 ${
        direction === "ltr" ? "hidden" : "block"
      }  `}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1120 6941"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d={`
          ${dark.selectedButton === 0 ? svgThemeBlue : ""} 
          ${dark.selectedButton === 1 ? svgThemeBlue : ""} 
          ${dark.selectedButton === 2 ? svgThemeBlue : ""}
          ${dark.selectedButton === 3 ? svgThemeBlue : ""}`}
          stroke={
            dark.selectedButton === 0
              ? "#3772FF"
              : dark.selectedButton === 1
              ? "green"
              : dark.selectedButton === 2
              ? "#ca8a04"
              : dark.selectedButton === 3
              ? "#dd0208"
              : "#3772FF"
          }
          strokeWidth={2}
        />
      </svg>
    </div>
  );
}

export default ScrollSvg
