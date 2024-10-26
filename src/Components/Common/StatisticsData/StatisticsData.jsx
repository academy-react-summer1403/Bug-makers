import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useQuery } from 'react-query';
import { getCourseListWithPagination } from '../../../Core/Services/Api/CoursePage/getCourseListWithPagination';
import { getTeacherList } from '../../../Core/Services/Api/CoursePage/TeacherList';
import TextLanding from '../TextInLanding/TextLanding';

const StatisticsData = () => {
  const [startCount, setStartCount] = useState(false);

  // Fetch courses
  const { data: courseData, isLoading: isCoursesLoading } = useQuery(
    'courses',
    () => getCourseListWithPagination(null, null, null, null, null, 'DESC', null, null)
  );

  // Fetch teachers
  const { data: teacherData, isLoading: isTeachersLoading } = useQuery(
    'teachers',
    getTeacherList
  );

  const handleInView = () => {
    setStartCount(true);
  };

  // Define the statistics based on fetched data
  const statistics = [
    { id: 1, label: 'دانشجو', end: 1200, delay: 0 },  // Assuming a static value for students
    { id: 2, label: 'دوره آموزشی', end: courseData?.totalCount || 0, delay: 0.3 },
    { id: 3, label: 'استاد', end: teacherData?.length || 0, delay: 0.6 },
  ];

  if (isCoursesLoading || isTeachersLoading) {
    return <p>در حال بارگذاری...</p>;
  }

  return (
    <div className=' max-[714px]:w-[80%] max-[570px]:w-[66%] max-[714px]:scale-125  max-[570px]:mt-[65vw] max-[570px]:scale-150 m-auto w-[100%] relative text-center mt-[56.63541666666667vw] bg-transparent'>
      <TextLanding
        h3Text='آکادمی بحر العلوم از دید آمار'
        pText='اطلاعات دوره ها'
      />

      {/* Wrapper */}
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
