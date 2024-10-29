import { IoDocumentOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { CgWorkAlt } from "react-icons/cg";
import { RiComputerLine } from "react-icons/ri";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import TextLanding from "../../Common/TextInLanding/TextLanding";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const StoreService = () => {
  const [boxItem, setboxItem] = useState([]);
    // translate 
    const { t , i18n } = useTranslation()
    const direction =  i18n.dir();

  useEffect(() => {
    setboxItem(
      [
        { title: t("content.storeServices.test"), icon: <img src="../../../../public/images/icon/test.svg" className='w-[4.557291666666667vw] h-[4.557291666666667vw] absolute left-0 top-[-2.6041666666666665vw] opacity-60'/>, key: 1 },
        { title: t("content.storeServices.help"), icon: <img src="../../../../public/images/icon/moshavere.svg"  className='w-[4.557291666666667vw] h-[4.557291666666667vw] absolute left-0 top-[-2.6041666666666665vw]  '/>, key: 2 },
        { title: t("content.storeServices.job"), icon: <img src="../../../../public/images/icon/jobs.svg" className='w-[4.557291666666667vw] h-[4.557291666666667vw] absolute left-0 top-[-2.6041666666666665vw] opacity-60'/>, key: 3 },
        { title: t("content.storeServices.course"), icon: <img src="../../../../public/images/icon/course.svg" className='w-[4.557291666666667vw] h-[4.557291666666667vw] absolute left-0 top-[-2.6041666666666665vw] opacity-60'/>, key: 4 },
      ]
    )
  }, [boxItem])

  // Animation settings
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },  
    visible: { opacity: 1, y: 0 } 
  };


  
  return (
    <div dir="rtl" className=' max-[714px]:w-[66%] max-[570px]:w-[50%]  max-[714px]:scale-150 max-[570px]:scale-[200%] max-[570px]:mt-[39vw]  max-[714px]:mt-[30vw] m-auto w-[100%] mt-[5.786458333333332vw] bg-transparent z-10 relative text-center'>
      
      <TextLanding 
        h3Text={t("content.storeServices.topic")}
        pText={t("content.storeServices.p")}
      />

      {/* Service Items */}
      <div className=' boxItem grid max-[616px]:flex max-[616px]:flex-wrap max-[616px]:flex-col grid-cols-2 gap-[4vw] mt-[3.2552083333333335vw] justify-center items-center text-right text-[1.6276041666666667vw] indent-[1vw] leading-[4vw]'>
        
        {boxItem.map(({ title, icon, key }, index) => (
          <motion.div
            key={key}
            className={`w-[19.53125vw] h-[4.557291666666667vw] rounded-[10px] border border-[#F5F5F4] bg-custom-grading-storeService shadow-[0px_4px_10px_0px_#000] relative
              ${key === 1  ? 'max-[616px]:mr-0 max-[714px]:mr-[7vw] mr-[26vw] ' : ''}
              ${key === 2 ? 'max-[616px]:mr-[0] max-[714px]:mr-[-2vw] mr-[0]' : ''}
              ${key === 3 ? 'max-[616px]:mr-[0] max-[714px]:mr-[15vw] max-[714px]:mt-0 mr-[40vw] mt-[5.5vw]' : ''}
              ${key === 4 ? 'max-[616px]:mr-[0] max-[714px]:mr-[5vw] max-[714px]:mt-0 mr-[14vw] mt-[5vw]' : ''}
              `}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {title}
            {icon}
            <div className='absolute left-0 top-[-40px] opacity-60 w-[4.557291666666667vw] h-[4.557291666666667vw]'></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoreService;
