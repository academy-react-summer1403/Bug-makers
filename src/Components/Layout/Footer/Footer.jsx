import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Footer = () => {

    const { selectedButton } = useSelector((state) => state.themeColor);

    const {t} = useTranslation();

  return (
    <div className={` bg-transparent m-auto w-[100%] mt-[38.786458333333332vw] relative text-center ${selectedButton === 1 ? 'bg-[#777] text-white' : 'text-gray-600'}`}>
      <div className='border-2 border-[#BEBEBE] w-[90%] m-auto opacity-45'></div>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>

        {/*  work information */}
        <div className='text-center md:text-right mr-[10vw]'>
          <h3 className='text-[15px] font-bold my-[4vw]'>{t("content.footer.topic")}</h3>
          <p className='text-[8px]  mb-[2vw]'>
          {t("content.footer.p")}
          </p>
          <div className='flex flex-row justify-start gap-[3vw] items-center'>
            <ul className='text-[11px]'>
              <li className='py-[0.5vw]'>{t("content.footer.link1")}</li>
              <li className='py-[0.5vw]'>{t("content.footer.link2")}</li>
            </ul>
            <ul className='text-[8px]'>
              <li className='py-[0.5vw]'>{t("content.footer.link3")}</li>
              <li className='py-[0.5vw]'>{t("content.footer.link4")}</li>
            </ul>
          </div>
        </div>

        <div className='text-center m-[1vw]'>
          <h3 className='text-[16px] font-bold mr-[10vw] my-[4vw]'>{t("content.footer.contactWe")}</h3>
          <p className='text-[16px]  mr-[10vw] my-[4vw]'>
          {t("content.footer.p2")}
          </p>
          <div className='flex items-center justify-center relative'>
            <input
              type='text'
              placeholder={t("content.footer.inputT")}
              className='border h-[38px] rounded-[0_1vw_1vw_0] px-[1vw] py-[0.5vw] w-[60%]  shadow-sm focus:outline-none mr-[10vw]'
            />
            <button className='max-[302px]:/* end responsive */ bg-yellow-500 text-[#fff] text-[13px]  p-[8px]  rounded-[1vw_0_0_1vw]  '>
            {t("content.footer.sendInput")}
            </button>
          </div>
        </div>
      </div>

      <div className='flex justify-center gap-[2vw] mt-[4vw] opacity-70'>
          {/* social icon */}
          <a href='#' className=' text-[2vw]'>
            <FaFacebookF />
          </a>
          <a href='#' className=' text-[2vw]'>
            <FaTwitter />
          </a>
          <a href='#' className='text-[2vw]'>
            <FaInstagram />
          </a>
          <a href='#' className=' text-[2vw]'>
            <FaLinkedinIn />
          </a>
          <a href='#' className=' text-[2vw]'>
            <FaYoutube />
          </a>
        </div>
      <div className='border-2 border-[#BEBEBE] w-[90%] opacity-45 m-auto my-[1vw]'></div>

        <p className={`0 m-auto mt-[1vw] ${selectedButton === 1 ? 'text-white' : 'text-gray-400'}`}>© Sepehr Academy</p>
    </div>
  );
};

export default Footer;
