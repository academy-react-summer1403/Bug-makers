import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Footer = () => {

    const { selectedButton } = useSelector((state) => state.themeColor);

  return (
    <div className={`bg-transparent m-auto w-[100%] mt-[38.786458333333332vw] relative text-center ${selectedButton === 1 ? 'bg-[#777] text-white' : 'text-gray-600'}`}>
      <div className='border-2 border-[#BEBEBE] w-[90%] m-auto opacity-45'></div>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>

        {/*  work information */}
        <div className='text-center md:text-right mr-[10vw]'>
          <h3 className='text-[1.6276041666666667vw] font-bold my-[4vw]'>پژوهشگاه سپهر</h3>
          <p className='text-[0.78125vw]  mb-[2vw]'>
            متن مختصری درباره پژوهشگاه لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی
          </p>
          <div className='flex flex-row justify-start gap-[3vw] items-center'>
            <ul className='text-[0.98125vw]'>
              <li className='py-[0.5vw]'>لینک های مفید</li>
              <li className='py-[0.5vw]'>لینک های مفید</li>
            </ul>
            <ul className='text-[0.78125vw]'>
              <li className='py-[0.5vw]'>لینک شماره سه</li>
              <li className='py-[0.5vw]'>لینک شماره چهار</li>
            </ul>
          </div>
        </div>

        <div className='text-center m-[1vw]'>
          <h3 className='text-[1.6276041666666667vw] font-bold mr-[10vw] my-[4vw]'>ارتباط با ما</h3>
          <p className='text-[1.0416666666666667vw]  mr-[10vw] my-[4vw]'>
            پذیرای هر گونه پیشنهاد، انتقاد و پاسخگوی سوالات شما هستیم
          </p>
          <div className='flex items-center justify-center relative'>
            <input
              type='text'
              placeholder='متن پیام شما'
              className='border h-[2.6vw] rounded-[0_1vw_1vw_0] px-[1vw] py-[0.5vw] w-[60%] shadow-sm focus:outline-none mr-[10vw]'
            />
            <button className='max-[302px]:/* end responsive */ bg-yellow-500 text-[#fff] text-[0.910416666666666vw]  p-[0.5vw]  rounded-[1vw_0_0_1vw]  '>
              ارسال پیام
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
