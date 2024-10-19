import React, { useState } from 'react';
import TextLanding from '../../Common/TextInLanding/TextLanding';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const BlogLanding = () => {
    const { selectedButton } = useSelector((state) => state.themeColor);
    const [countStart, setCountStart] = useState(false); 

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        // wrapper 
        <motion.div 
            className={`m-auto w-[100%] mt-[37.786458333333332vw] bg-transparent z-10 relative text-center 
                ${selectedButton === 1 || selectedButton === 2 ? 'mt-[70vw]' : ''}`}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: 0.2 }}    
        >
            <TextLanding 
                h3Text='اخبار و مقالات'
                pText='مطالب روز حوزه تکنولوژی'
            />
            <div className='w-[100%] h-[32.552083333333336vw] mt-[5vw] flex flex-row justify-center items-center'>
                <div className='max-[500px]:w-[100%] max-[500px]:ml-[8vw] max-[500px]:h-[40vw] w-[26%] mr-[10vw] rounded-lg h-[100%] relative bg-transparent  flex flex-col justify-end'>
                    <img src='/Image/Icon/newsLanding.png' className='max-[500px]:h-[30vw] absolute top-0 right-[0.9vw] w-[100%] h-[22.229166666666668vw] rounded-2xl' alt='news' />
                    <div className='max-[500px]:ml-[5vw] text-[#fff] text-[0.6510416666666666vw] rounded-lg p-[1vw] bg-slate-600 absolute left-[1.2vw] bottom-[9.5vw] '>تکنولوژی</div>
                    <div className='text-[#959595] text-[0.6510416666666666vw] absolute right-[1.2vw] bottom-[9.5vw]'>1/4/2024</div>
                    <p className='max-[500px]:top-[32vw] max-[750px]:text-[2vw] text-[#787878] w-[100%] break-words text-[1.171875vw] absolute text-right mr-[1vw] top-[24vw]'>رفتارهای یاد خواهید گرفت</p>
                    <span className='absolute left-[5vw] text-[12px] text-[#787878] bottom-[0.5vw]'>نام نویسنده</span>
                    <div className='max-[500px]:ml-[5vw] bg-white rounded-[100%] absolute left-[2vw] w-[2.734375vw] h-[2.734375vw]'></div>
                </div>
                <div className='max-[500px]:hidden h-[100%] w-[60vw] LeftSide'>
                    <div className='flex flex-col W'>
                        {[1, 2, 3].map((item) => (
                            <div key={item} className='flex flex-row justify-start items-center p-[1vw] relative bg-transparent'>
                                <div className='w-[10.416666666666666vw] h-[8.138020833333334vw] shadow-black shadow-sm bg-white rounded-lg'></div>
                                <div className='w-[60%] text-right mr-[1vw] h-[100%]'>
                                    <span className='text-[#7B7B7B] text-[1vw] bg-gray-200 rounded-full px-[0.5vw] py-[0.2vw]'>
                                        تکنولوژی
                                    </span>
                                    <h3 className='text-[1.2vw] font-semibold text-[#777777] mt-[0.5vw] max-w-[21.158854166666668vw] break-words'>
                                        عنوان خبر یا مقاله لورم ایپسوم متن ساختگی با تولید سادگی ...
                                    </h3>
                                    <div className='LeftSide bg-white rounded-[100%] h-[2.734375vw] w-[2.734375vw]'></div>
                                    <p className='text-gray-500 text-[0.9vw] absolute bottom-[1.5vw] right-[15.6vw]'>نام نویسنده</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Count Up & Button */}
            <div className='flex justify-center items-center mt-[7vw]'>
                <span className='text-[1.0416666666666667vw] mx-2'> بیش از خبر</span>

                <motion.h2 
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5, delay: 0.2 }}
                    onViewportEnter={() => setCountStart(true)}
                    className='text-[3vw] font-bold'
                >
                    {countStart && <CountUp end={130} duration={3} />}
                </motion.h2>

                <span className='text-[1.0416666666666667vw] '>خبر، مقاله و نکته آموزشی دیگر</span>
            </div>
            <button         
                className={`p-[0.5vw] text-[1.2vw] rounded-3xl text-white 
                    ${selectedButton === 0 ? 'bg-blue-600' : ''} 
                    ${selectedButton === 1 ? 'bg-green-600 m-1' : ''} 
                    ${selectedButton === 2 ? 'bg-yellow-600' : ''}`}
            >
                مشاهده مقالات بیشتر 
            </button>
        </motion.div>
    );
}

export default BlogLanding;
