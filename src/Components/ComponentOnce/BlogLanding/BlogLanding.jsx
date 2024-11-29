import React, { useEffect, useState } from 'react';
import TextLanding from '../../Common/TextInLanding/TextLanding';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { GetListNews, GetListNewsCategory } from '../../../Core/Services/Api/BlogPage/NewsList';
import { setDefaultLocale } from 'react-datepicker';
import { getBlogListWithPagination } from '../../../Core/Services/Api/BlogPage/getBlogListWithPagination';
import convertToJalali from '../../Common/TimeChanger/TimeToShamsi';
import { useNavigate } from 'react-router-dom';

const BlogLanding = () => {
    const { selectedButton } = useSelector((state) => state.themeColor);
    const [countStart, setCountStart] = useState(false); 
    const navigate = useNavigate()
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };
    const handleNavigate = () => {
      navigate("BlogPage");
      window.scrollTo({ top: 0});
    };

      const { isLoading, error, data } = useQuery(
        ["get"],
        () => getBlogListWithPagination(),
      );
    console.log(data);

    if (isLoading){return <div> در حال بارگذاری </div>}
    if(error){return <div>مشکلی وجود دارد </div>}
      return (
        // wrapper
        <motion.div
          className={` m-auto w-[100%] mt-[37.786458333333332vw] bg-transparent z-10 relative text-center 
                ${
                  selectedButton === 1 || selectedButton === 2
                    ? "mt-[70vw]"
                    : ""
                }`}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TextLanding
            h3Text="اخبار و مقالات"
            pText="مطالب روز حوزه تکنولوژی"
          />
          <div className="max-custom3:mt-[12vw] max-md:h-[200px]  max-[714px]:scale-125 max-[570px]:w-[80%] max-custom3:mr-[10vw]  w-[100%] h-[32.552083333333336vw] mt-[5vw] flex flex-row justify-center items-center">
            <div className="max-custom3:w-[100%] max-custom3:ml-[8vw] w-[26%] mx-[40px] mr-[10vw] rounded-lg h-[100%] relative bg-transparent  flex flex-col justify-end">
              <img
                src={data[1]?.currentImageAddressTumb}
                className="max-custom3:h-[30vw] absolute top-0 right-[0.9vw] w-[100%] h-[22.229166666666668vw] rounded-2xl"
                alt="news"
              />
              <div className="max-custom3:ml-[5vw] text-[#fff] text-[0.6510416666666666vw] rounded-lg px-[1.2vw] py-[0.1vw] bg-[#7B7B7B] absolute right-[1.2vw] max-md:bottom-[80px] max-md:text-[10px] bottom-[9vw] ">
                {data[1]?.newsCatregoryName}
              </div>
              <div className="text-[#959595] text-[0.6510416666666666vw] absolute left-[1.2vw] max-md:bottom-[70px] bottom-[9vw] max-md:text-[10px]">
                {convertToJalali(data[1]?.insertDate)}
              </div>
              <p className="max-custom3:top-[32vw] max-[750px]:text-[2vw]  text-[#787878] w-[100%] break-words text-[1.171875vw] absolute text-right mr-[1vw] top-[24vw] max-md:mt-[20px]">
                {data[1]?.miniDescribe}
              </p>
              <span className="max-custom3:ml-[2vw] absolute left-[5.5vw] text-[0.98125vw] text-[#636363] bottom-[0.7vw] max-md:text-[10px] max-md:bottom-[50px]">
                {data[1]?.addUserFullName}
              </span>
              <div className="max-custom3:ml-[2vw] overflow-hidden bg-white rounded-[100%] absolute left-[2vw] w-[2.734375vw] h-[2.734375vw] max-md:hidden ">
                <img
                  className="h-full w-full"
                  src={data[1]?.addUserProfileImage}
                  alt=""
                />
              </div>
            </div>
            <div className="max-custom3:hidden h-[100%] w-[60vw] LeftSide">
              <div className="flex flex-col W">
                {[data[5], data[15], data[16]].map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-row justify-start items-center p-[1vw] relative bg-transparent"
                  >
                    <div className="w-[10.416666666666666vw] border-2 border-[#F2F2F1] overflow-hidden h-[8.138020833333334vw] shadow-black shadow-sm bg-white rounded-lg">
                      <img
                        src={item.currentImageAddressTumb}
                        className="w-full h-full"
                        alt=""
                      />
                    </div>
                    <div className="w-[60%] text-right mr-[1vw] h-[100%]">
                      <span className="text-[#FFF] text-[0.6510416666666666vw]  bg-[#7B7B7B] rounded-full px-[1.2vw] py-[0.1vw]">
                        {item.newsCatregoryName}
                      </span>
                      <h3 className="text-[0.9114583333333334vw] overflow-hidden text-ellipsis ... text-[#777777] mt-[0.5vw] max-w-[21.158854166666668vw] break-words">
                        {item.miniDescribe}
                      </h3>
                      <div className="LeftSide bg-white rounded-[100%] h-[2.734375vw] overflow-hidden w-[2.734375vw] mt-[0.5vw]">
                        <img
                          src={item.addUserProfileImage}
                          className="w-full h-full"
                          alt=""
                        />
                      </div>
                      <p className="text-gray-500 text-[0.9vw] absolute bottom-[1.5vw] right-[15.6vw]">
                        {item.addUserFullName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Count Up & Button */}
          <div className="max-[714px]:mt-[12vw] flex justify-center items-center mt-[7vw]">
            <span className="text-[1.0416666666666667vw] max-md:text-[12px] mx-2">
              {" "}
              بیش از خبر
            </span>

            <motion.h2
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.2 }}
              onViewportEnter={() => setCountStart(true)}
              className="text-[3vw] font-bold"
            >
              {countStart && <CountUp end={data?.length} duration={1} />}
            </motion.h2>

            <span className="text-[1.0416666666666667vw] max-md:text-[12px]">
              خبر، مقاله و نکته آموزشی دیگر
            </span>
          </div>
          <button
            onClick={() => {
              handleNavigate();
            }}
            className={` p-[0.5vw] text-[1.2vw] rounded-3xl text-white  max-md:text-[14px] px-2 max-md:mt-[10px]
                    ${selectedButton === 0 ? "bg-blue-600" : ""} 
                    ${selectedButton === 1 ? "bg-green-600 m-1" : ""} 
                    ${selectedButton === 2 ? "bg-yellow-600" : ""}`}
          >
            مشاهده مقالات بیشتر
          </button>
        </motion.div>
      );
}

export default BlogLanding;
