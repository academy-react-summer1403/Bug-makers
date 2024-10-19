import { IoDocumentOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { CgWorkAlt } from "react-icons/cg";
import { RiComputerLine } from "react-icons/ri";
import { motion } from 'framer-motion';
import { useState } from "react";
import TextLanding from "../../Common/TextInLanding/TextLanding";

const StoreService = () => {
  const [boxItem, setboxItem] = useState(
    [
      { title: 'آزمون', icon: <IoDocumentOutline className='w-[4.557291666666667vw] h-[4.557291666666667vw] absolute left-0 top-[-2.6041666666666665vw] opacity-60'/>, key: 1 },
      { title: 'مشاوره', icon: <IoChatbubbleEllipsesOutline className='w-[4.557291666666667vw] h-[4.557291666666667vw] absolute left-0 top-[-2.6041666666666665vw] opacity-60'/>, key: 2 },
      { title: 'فرصت های شغلی', icon: <CgWorkAlt className='w-[4.557291666666667vw] h-[4.557291666666667vw] absolute left-0 top-[-2.6041666666666665vw] opacity-60'/>, key: 3 },
      { title: 'دوره های تخصصی', icon: <RiComputerLine className='w-[4.557291666666667vw] h-[4.557291666666667vw] absolute left-0 top-[-2.6041666666666665vw] opacity-60'/>, key: 4 },
    ]
  );

  // Animation settings
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },  
    visible: { opacity: 1, y: 0 } 
  };

  return (
    <div className=' m-auto w-[100%] mt-[22.786458333333332vw] bg-transparent z-10 relative text-center'>
      
      <TextLanding 
        h3Text='خدمات پژوهشگاه'
        pText='همه آنچه برای طی کردن مسیر پیشرفت نیاز دارید'
      />

      {/* Service Items */}
      <div className='boxItem grid grid-cols-2 gap-[4vw] mt-[3.2552083333333335vw] justify-center items-center text-right text-[1.6276041666666667vw] indent-[1vw] leading-[4vw]'>
        
        {boxItem.map(({ title, icon, key }, index) => (
          <motion.div
            key={key}
            className={`w-[19.53125vw] h-[4.557291666666667vw] rounded-[10px] border border-[#F5F5F4] bg-custom-grading-storeService shadow-[0px_4px_10px_0px_#000] relative
              ${key === 1 ? 'mr-[26vw]' : ''}
              ${key === 2 ? 'mr-[0]' : ''}
              ${key === 3 ? 'mr-[36vw]' : ''}
              ${key === 4 ? 'mr-[10vw]' : ''}
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
