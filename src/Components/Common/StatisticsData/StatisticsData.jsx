import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import TextLanding from '../TextInLanding/TextLanding';

    const statistics = [
  { id: 1, label: 'دانشجو', end: 1200, delay: 0 },
  { id: 2, label: 'دوره آموزشی', end: 78, delay: 0.3 },
  { id: 3, label: 'استاد', end: 12, delay: 0.6 },
    ];

  const StatisticsData = () => {
  const [startCount, setStartCount] = useState(false);

  const handleInView = () => {
    setStartCount(true);
  };

  return (
    <div className='m-auto w-[100%] relative text-center mt-[56.63541666666667vw] bg-transparent'>
      <TextLanding
        h3Text='آکادمی بحر العلوم از دید آمار'
        pText='اطلاعات دوره ها'
      />

      {/* wrapper  */}
      <div className='flex  mt-[20vw] justify-center gap-[15vw] '>
        {statistics.map((stat) => (
          <motion.div
            key={stat.id}
            className='text-center'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: stat.delay }}
            onViewportEnter={handleInView}
          >
            <motion.h1
              className='block text-[3.5625vw]'
              whileHover={{ scale: 1.2 }}
            >
              {startCount && <CountUp end={stat.end} duration={2} />}
            </motion.h1>
            <p className="text-[1.5vw]">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsData;
