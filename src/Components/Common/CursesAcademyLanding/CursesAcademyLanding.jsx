import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaBattleNet } from 'react-icons/fa';
import { GrHtml5 } from 'react-icons/gr';
import { PiAngularLogoThin } from 'react-icons/pi';
import { GiGuillotine } from 'react-icons/gi';
import TextLanding from '../TextInLanding/TextLanding';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const CursesAcademyLanding = () => {

    const { selectedButton } = useSelector((state) => state.themeColor);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const {t} = useTranslation()

  const icons = [
    { id: 1, Icon: FaReact, delay: 0.6 },
    { id: 2, Icon: PiAngularLogoThin, delay: 0.8 },
    { id: 3, Icon: GrHtml5, delay: 1 },
    { id: 4, Icon: FaBattleNet, delay: 1.2 },
    { id: 5, Icon: GiGuillotine, delay: 1.4 },
  ];

  return (
    <div className={`max-[714px]:mt-[170vw] max-[714px]:w-[80%] max-[570px]:w-[66%] max-[714px]:scale-125 max-[570px]:mt-[190vw] max-[570px]:scale-150  m-auto w-[100%] relative text-center mt-[85.63541666666667vw] bg-transparent ${selectedButton === 1 ? 'mt-[123.111vw]' : ''}`}>
        <TextLanding 
            h3Text={t("content.academyCourse.topic")}
            pText={t("content.academyCourse.p")}
        />

      {/* Dot with delay animation */}
      <motion.div
        className='dot  border-white border-t-0 border-r-0 border-l-0 border-[0.5vw] w-[85%] h-[65vw] absolute top-0 left-[8vw] rounded-[100%]'
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
      ></motion.div>

      {/* Container for circular grid */}
      <div className='w-[100%]   grid grid-cols-2 grid-rows-3 relative gap-[7vw] justify-center items-center mt-[20vw]'>
        {icons.map(({ id, Icon, delay }) => (
          <motion.div
            key={id}
            className={`flex flex-col items-center absolute z-10 shadow-custom-shadow rounded-[100%]
              ${id === 1 ? 'max-[714px]:right-[20vw] max-[714px]:top-[-20vw] max-[570px]:right-[14vw] right-[3vw] top-[0]' : ''}
              ${id === 2 ? 'max-[714px]:right-[20vw] max-[714px]:top-[0] max-[570px]:right-[14vw] right-[17vw] top-[22vw]' : ''}
              ${id === 3 ? 'max-[714px]:right-[45vw] max-[714px]:top-[-20vw] max-[570px]:right-[35vw] right-[43vw] top-[28vw]' : ''}
              ${id === 4 ? 'max-[714px]:left-[20vw] max-[714px]:top-[0vw] max-[570px]:left-[16.5vw] left-[17vw] top-[22vw]' : ''}
              ${id === 5 ? 'max-[714px]:hidden left-[3vw] top-0' : ''}
            `}
            variants={itemVariants}
            initial='hidden'
            whileInView='visible'
            whileHover={{
              scale: 1.2,
              rotate: 360,
              transition: { duration: 0.5 },
            }}
            transition={{ duration: 0.5, delay }}
          >
            <div className='w-[15vw] h-[15vw] flex items-center justify-center bg-white rounded-full shadow-lg'>
              <Icon className='w-[8vw] h-[8vw]' />
            </div>
          </motion.div>
        ))}

        {/* Animated Button */}
        <motion.button
          className={`max-[714px]:top-[18vw]  max-[714px]:left-[35vw] max-[570px]:left-[28vw] /* end responsive */ px-[2vw] py-[1vw] w-fit cursor-pointer z-10 absolute top-[45vw] left-[43.5vw] text-white rounded-[2vw] text-[1.2vw] transition-all duration-300 hover:bg-blue-700 hover:scale-110
            ${selectedButton === 0 ? 'bg-blue-600' : ''} 
            ${selectedButton === 1 ? 'bg-green-600 m-1' : ''} 
            ${selectedButton === 2 ? 'bg-yellow-600' : ''}`}
          whileHover={{ scale: 1.1, backgroundColor: '#2563eb' }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {t("content.academyCourse.button")}
        </motion.button>
      </div>
    </div>
  );
};

export default CursesAcademyLanding;
