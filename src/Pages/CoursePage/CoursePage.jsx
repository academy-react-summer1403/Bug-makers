import React, { useState } from 'react';
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
      <div className='w-[76%] mt-[5vw] m-auto'>
        <TextLanding h3Text='دوره های آموزشی' pText='دوره های ما' />

        {/* searchAndFilterSection */}
        <div className='h-[55px] flex justify-center items-center gap-3 bg-white rounded-[10px] shadow-[-5px_5px_5px_0px_#0000001C]'>
          <SearchBox
            placeHolder='دنبال چی میگردی'
            value={`${filterValue ? '' : queryValue}`}
            onChange={handleSearch} 
          />
          <SelectOpt
            placeholder='استاد دوره'
            isTeacherSelect={true} 
            onChange={(value) => setTeacherId(value)}
            FilterValue={filterValue}
          />
          <SelectOpt
            placeholder='دسته‌بندی'
            onChange={(value) => setCategoryQuery(value)} 
            FilterValue={filterValue}
          />
          <DateModal onFilter={filterByDateRange} />

          <SelectOpt
            placeholder="ترتیب نمایش"
            isSortSelect={true}
            onChange={(value) => setSorting(value)} 
            FilterValue={filterValue}
          />

          <PriceFilter onFilter={handlePriceFilter} />

        </div>

        {/* filterActionSection */}
        <div className='relative w-[100%] h-[90px] flex flex-nowrap justify-center items-center'>
          <span className='text-[10px] text-[#978A8A] absolute right-0'>
            تعداد{CourseListItem.length} نتیجه از {data?.totalCount || 0} دوره طبق جستجوی شما برای شما یافت شد
          </span>          
          <span className='w-[106px] h-[20px] rounded-[16px] text-center text-[10px] leading-6 text-[#FE8E8E] cursor-pointer bg-white' onClick={handleRemoveFilter}>
            حذف تمامی فیلتر
          </span>
          
          {/* listStyleToggle */}
          <div className={`w-[87px] h-[44px] rounded-[9px] bg-white flex flex-nowrap justify-center items-center gap-3 absolute left-[0px] bg-[url(../../../../../public/Image/Icon/Subtraction.png)] bg-no-repeat ${listStyle ? 'bg-[76%_100%]' : 'bg-[28%_100%]'}`}>
            <img src='../../../public/Image/Icon/list.png' className='cursor-pointer' onClick={() => setListStyle(true)} />
            <img src='../../../public/Image/Icon/apps.png' className='cursor-pointer' onClick={() => setListStyle(false)} />
          </div>
          
          {/* additionalActionButtons */}
          <div className='w-[87px] h-[44px] rounded-[9px] bg-white flex flex-nowrap justify-center items-center gap-3 absolute left-[100px]'>
            <span className='text-[#808080] text-[15px]'>{data?.totalCount}</span>
            <img src='../../../public/Image/Icon/eye.png' />
          </div>
          <div className='w-[87px] h-[44px] rounded-[9px] bg-white flex flex-nowrap justify-center items-center gap-3 absolute left-[200px]'>
            <span className='text-[#808080] text-[15px]'>وضعیت</span>
            <img src='../../../public/Image/Icon/eye.png' />
          </div>
        </div>

        {/* courseItemsSection */}
        <div className='flex flex-wrap flex-row justify-center gap-[50px] mt-3'>
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
