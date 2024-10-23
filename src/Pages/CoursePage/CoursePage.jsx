import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { setCourseList } from '../../Redux/Slice/Course/CourseList';
import { getCourseListWithPagination } from '../../Core/Services/Api/CoursePage/getCourseListWithPagination'; 
import SearchBox from '../../Components/Common/SearchBox/SearchBox';
import TextLanding from '../../Components/Common/TextInLanding/TextLanding';
import CourseItem from '../../Components/Common/CorseItem/CourseItem';
import Pagination from '../../Components/Common/Paginate/Paginate';
import SelectOpt from '../../Components/Common/Select/SelectOpt';
import DateModal from '../../Components/ComponentOnce/Date/Date';
import moment from 'jalali-moment'; 
import PriceFilter from '../../Components/ComponentOnce/PriceFilter/PriceFilter';

const CoursePage = () => {
  // stateForCategoryFilter
  const [categoryQuery, setCategoryQuery] = useState('');
  
  // stateForTeacherFilter
  const [teacherId, setTeacherId] = useState(null);
  
  // stateForSearchQuery
  const [queryValue, setQueryValue] = useState(''); 
  
  // stateForCurrentPage
  const [currentPage, setCurrentPage] = useState(0);
  
  // stateForListStyle
  const [listStyle, setListStyle] = useState(false);

  // state value
  const [filterValue, setFilterValue] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [sorting, setSorting] = useState('')

  const [minCost, setMinCost] = useState(null);
  const [maxCost, setMaxCost] = useState(null);


  const itemsPerPage = 8; 
  const dispatch = useDispatch();

  // getCourseListFromRedux
  const CourseListItem = useSelector((state) => state.CourseSlice.CourseList);

  // fetchCoursesWithFilters
  const { isLoading, error, data } = useQuery(
    ['getCourse', queryValue, teacherId, categoryQuery, startDate, endDate , sorting , minCost , maxCost], 
    () => getCourseListWithPagination(queryValue, teacherId, categoryQuery, startDate, endDate , sorting , minCost , maxCost), 
    {
      onSuccess: (data) => {
        dispatch(setCourseList(data.courseFilterDtos || data));
      },
      keepPreviousData: true, 
    }
  );
  
  
  

  // handleSearchQueryChange
  const handleSearch = (e) => {
    setQueryValue(e.target.value); 
  };

  // handleRemoveFilters
  const handleRemoveFilter = () => {
    setQueryValue('');
    setTeacherId(null);  
    setCategoryQuery(''); 
    setSorting('Active')
    setStartDate(''); 
    setEndDate('');
    
    setFilterValue(true);
    setMinCost(null)
    setMaxCost(null)
    setTimeout(() => {
      setFilterValue(false);
    }, 100); 
  };

  const filterByDateRange = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };
  
  // Converting Date 
  const convertToJalali = (miladiDate) => {
    return moment(miladiDate, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD');
  };
  

  const handlePriceFilter = (min, max) => {
    setMinCost(min);
    setMaxCost(max);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 952) {
        setListStyle(false);
      } else {
        setListStyle(null);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  // renderCourseItems
  const renderCourses = () => {
    if (isLoading) return <p>در حال بارگذاری...</p>;
    if (error) return <p>خطایی رخ داده است...</p>;

    return CourseListItem
      .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
      .map((course) => (
        <CourseItem
          key={course.courseId}
          courseId={course.courseId}
          title={course.title}
          img={course.tumbImageAddress}
          technologyList={course.technologyList}
          description={course.describe}
          teacherName={course.teacherName}
          likeCount={course.likeCount}
          commandCount={course.commandCount}
          courseRate={course.courseRate}
          statusName={course.statusName}
          price={course.cost}
          currentRegistrants={course.currentRegistrants}
          date={convertToJalali(course.lastUpdate)}
          listStyle={listStyle}
        />
      ));
  };

  return (
<div className='m-auto w-full bg-transparent relative text-center'>
  <div className='w-[90%] lg:w-[76%] mt-[5vw] m-auto'>
    <TextLanding h3Text='دوره های آموزشی' pText='دوره های ما' />

    {/* searchAndFilterSection */}
    <div className='h-[380px] relative lg:h-[55px] flex flex-col lg:flex-row justify-center items-center gap-3 bg-white rounded-[10px] shadow-[-5px_5px_5px_0px_#0000001C] p-3'>
      <SearchBox
        width={"100%"} 
        lgWidth={"160px"} 
        placeHolder='دنبال چی میگردی'
        value={`${filterValue ? '' : queryValue}`}
        onChange={handleSearch} 
      />
      <SelectOpt
        width={"100%"}
        lgWidth={"160px"}
        placeholder='استاد دوره'
        isTeacherSelect={true} 
        onChange={(value) => setTeacherId(value)}
        FilterValue={filterValue}
      />
      <SelectOpt
        width={"100%"}
        lgWidth={"160px"}
        placeholder='دسته‌بندی'
        onChange={(value) => setCategoryQuery(value)} 
        FilterValue={filterValue}
      />
      <DateModal onFilter={filterByDateRange} />
      <SelectOpt
        width={"100%"}
        lgWidth={"160px"}
        placeholder="ترتیب نمایش"
        isSortSelect={true}
        onChange={(value) => setSorting(value)} 
        FilterValue={filterValue}
      />
      <PriceFilter
        width={"100%"}
        lgWidth={"160px"}
        onFilter={handlePriceFilter} />
      <span className='block lg:hidden text-[10px] text-[#978A8A] absolute bottom-2 right-4'>
        تعداد {CourseListItem.length} نتیجه از {data?.totalCount || 0} دوره طبق جستجوی شما یافت شد
      </span>
      <span className='block lg:hidden w-[106px] h-[20px] rounded-[16px] text-center text-[10px] bottom-2 m-auto relative  text-[#FE8E8E] cursor-pointer bg-white  ' onClick={handleRemoveFilter}>
        حذف تمامی فیلتر
      </span>
    </div>

    {/* filterActionSection */}
    <div className='relative w-full h-auto lg:h-[90px] flex flex-wrap lg:flex-nowrap gap-3 justify-end items-center mt-5'>
      <span className='hidden lg:block text-[10px] text-[#978A8A] absolute right-0'>
        تعداد {CourseListItem.length} نتیجه از {data?.totalCount || 0} دوره طبق جستجوی شما یافت شد
      </span>
      <span className=' hidden lg:block w-[106px] h-[20px] rounded-[16px] text-center text-[10px] leading-6 m-auto relative top-10 text-[#FE8E8E] cursor-pointer bg-white lg:mt-0 ' onClick={handleRemoveFilter}>
        حذف تمامی فیلتر
      </span>

      {/* listStyleToggle */}
      <div className={` w-fit p-2 h-[44px] rounded-[9px] bg-white flex justify-center items-center gap-3 lg:absolute left-0 ${listStyle ? 'bg-[76%_100%]' : 'bg-[28%_100%]'}`}>
        <img src='../../../public/images/icon/list.png' className='cursor-pointer  max-custom:hidden ' onClick={() => setListStyle(true)} />
        <img src='../../../public/images/icon/apps.png' className='cursor-pointer' onClick={() => setListStyle(false)} />
      </div>

      {/* additionalActionButtons */}
      <div className='w-[87px] h-[44px] rounded-[9px] bg-white flex justify-center items-center gap-3 lg:absolute left-[100px]'>
        <span className='text-[#808080] text-[15px]'>{data?.totalCount}</span>
        <img src='../../../public/images/icon/eye.png' />
      </div>
      <div className='w-[87px] h-[44px] rounded-[9px] bg-white flex justify-center items-center gap-3 lg:absolute left-[200px]'>
        <span className='text-[#808080] text-[15px]'>وضعیت</span>
        <img src='../../../public/images/icon/eye.png' />
      </div>
    </div>

    {/* courseItemsSection */}
    <div className='flex flex-wrap justify-center gap-[30px] lg:gap-[50px] mt-3'>
      {renderCourses()}
    </div>

    {/* paginationSection */}
    <Pagination
      pageCount={Math.ceil(CourseListItem.length / itemsPerPage)}
      handlePageClick={(data) => setCurrentPage(data.selected)}
    />
  </div>
</div>

  );
};

export default CoursePage;
