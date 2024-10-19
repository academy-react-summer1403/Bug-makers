
import HorizontalBlog from "./BlogsComponent/horizontalBlog/horizontalBlog";
import VerticalBlog from "./BlogsComponent/verticalBlog/verticalBlog";
import MinimalBlog from "./BlogsComponent/MinimalBlog/MinimalBlog";
import BlogDownLeft from "./BlogDown.jsx/BlogDownLeft/BlogDownLeft";
import BlogDownCenter from "./BlogDown.jsx/BlogDownCenter/BlogDownCenter";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { setBlogList } from '../../../Redux/Slice/Blog/BlogList.js';
import { getBlogListWithPagination } from '../../../Core/Services/Api/BlogPage/getBlogListWithPagination'; 
import SearchBox from '../../../Components/Common/SearchBox/SearchBox.jsx';
import TextLanding from '../../../Components/Common/TextInLanding/TextLanding';
import CourseItem from '../../../Components/Common/CorseItem/CourseItem';
import Pagination from '../../../Components/Common/Paginate/Paginate';
import SelectOpt from '../../../Components/Common/Select/SelectOpt';
import DateModal from '../../../Components/ComponentOnce/Date/Date';
import moment from 'jalali-moment'; 
import PriceFilter from '../../../Components/ComponentOnce/PriceFilter/PriceFilter';
import SelectOpt2 from "../../Common/Select/SelectOpt2.jsx";
import BlogDownRight from "./BlogDown.jsx/BlogDownRight/BlogDownRight.jsx";
import calculateDateDifference from "../../Common/TimeChanger/TimeChanger.jsx";

const BlogPage = () => {
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


  const itemsPerPage = 10; 
  const dispatch = useDispatch();

  // getCourseListFromRedux
  const CourseListItem = useSelector((state) => state.BlogSlice.BlogList);
  // fetchCoursesWithFilters
  const { isLoading, error, data } = useQuery(
    ['get', queryValue,categoryQuery,sorting ], 
    () => getBlogListWithPagination(queryValue, categoryQuery, sorting ), 
    {
      onSuccess: (data) => {

        dispatch(setBlogList(data || data));
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
    // setMinCost(null)
    // setMaxCost(null)
    setTimeout(() => {
      setFilterValue(false);
    }, 100); 
  };

//   const filterByDateRange = (startDate, endDate) => {
//     setStartDate(startDate);
//     setEndDate(endDate);
//   };
  
//   // Converting Date 
//   const convertToJalali = (miladiDate) => {
//     return moment(miladiDate, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD');
//   };
  

//   const handlePriceFilter = (min, max) => {
//     setMinCost(min);
//     setMaxCost(max);
//   };


  const convertToJalali = (miladiDate) => {
    return moment(miladiDate, "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD");
  };
  // const [difference, setDifference] = useState(null);

  // useEffect(() => {
  //   // تاریخ مثال: '1402/07/01' (تاریخ شمسی ورودی)
    
  //   const diff = calculateDateDifference();

  //   setDifference(diff);
  // }, []);

  // renderCourseItems
  const renderCourses = () => {
    if (isLoading) return <p>در حال بارگذاری...</p>;
    if (error) return <p>خطایی رخ داده است...</p>;

    return CourseListItem.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    ).map((news) => (
      <MinimalBlog
        key={news.id}
        id={news.id}
        title={news.title}
        cat={news.newsCatregoryName}
        desc={news.miniDescribe}
        newsImg={news.currentImageAddressTumb}
        userImg={news.addUserProfileImage}
        writer={news.addUserFullName}
        comment={news.currentView}
        like={news.currentLikeCount}
        date={convertToJalali(news.updateDate)}
        datePass={convertToJalali(news.updateDate)}
      />
    ));
  };

  return (
    <div className='m-auto w-full bg-transparent relative text-center'>
      <div className='w-[76%] mt-[5vw] m-auto'>
        <TextLanding h3Text='دوره های آموزشی' pText='دوره های ما' />

        {/* searchAndFilterSection */}
        <div className='h-[55px] flex justify-center items-center gap-3 px-[8px] bg-white rounded-[10px] shadow-[-5px_5px_5px_0px_#0000001C] max-md:h-[110px] flex-wrap '>
          <SearchBox
            width={"520px"}
            placeHolder='دنبال چیز خاصی میگردی؟'
            value={`${filterValue ? '' : queryValue}`}
            onChange={handleSearch} 
          />
          <SelectOpt2
            width={"235px"}
            placeholder='دسته‌بندی'
            onChange={(value) => setCategoryQuery(value)} 
            FilterValue={filterValue}
          />
          {/* <DateModal onFilter={filterByDateRange} /> */}

          <SelectOpt
          
          width={"160px"}
            placeholder="ترتیب نمایش"
            isSortSelect={true}
            onChange={(value) => setSorting(value)} 
            FilterValue={filterValue}
          />
          <div className="h-[40px] flex-grow-[0.5] text-center leading-[40px] rounded-[9px] bg-red-500">
            {CourseListItem.length}
          </div>

          {/* <PriceFilter onFilter={handlePriceFilter} /> */}

        </div>

        {/* filterActionSection */}
        {/* <div className='relative w-[100%] h-[90px] flex flex-nowrap justify-center items-center'>
          <span className='text-[10px] text-[#978A8A] absolute right-0'>
            تعداد{CourseListItem.length} نتیجه از {data?.totalCount || 0} دوره طبق جستجوی شما برای شما یافت شد
          </span>          
          <span className='w-[106px] h-[20px] rounded-[16px] text-center text-[10px] leading-6 text-[#FE8E8E] cursor-pointer bg-white' onClick={handleRemoveFilter}>
            حذف تمامی فیلتر
          </span>
          
          {/* listStyleToggle */}
          {/* <div className={`w-[87px] h-[44px] rounded-[9px] bg-white flex flex-nowrap justify-center items-center gap-3 absolute left-[0px] bg-[url(../../../../../public/Image/Icon/Subtraction.png)] bg-no-repeat ${listStyle ? 'bg-[76%_100%]' : 'bg-[28%_100%]'}`}>
            <img src='../../../public/Image/Icon/list.png' className='cursor-pointer' onClick={() => setListStyle(true)} />
            <img src='../../../public/Image/Icon/apps.png' className='cursor-pointer' onClick={() => setListStyle(false)} />
          </div>
           */}
          {/* additionalActionButtons */}
          {/* <div className='w-[87px] h-[44px] rounded-[9px] bg-white flex flex-nowrap justify-center items-center gap-3 absolute left-[100px]'>
            <span className='text-[#808080] text-[15px]'>وضعیت</span>
            <img src='../../../public/Image/Icon/eye.png' />
          </div>
          <div className='w-[87px] h-[44px] rounded-[9px] bg-white flex flex-nowrap justify-center items-center gap-3 absolute left-[200px]'>
            <span className='text-[#808080] text-[15px]'>وضعیت</span>
            <img src='../../../public/Image/Icon/eye.png' />
          </div> */}
        {/* </div> } */}

        {/* courseItemsSection */}
        <div className='flex flex-wrap flex-row justify-center gap-[50px] mt-[2vw]'>
          {renderCourses()}
        </div>

        {/* paginationSection */}
        <Pagination
          pageCount={Math.ceil(CourseListItem.length / itemsPerPage)}
          handlePageClick={(data) => setCurrentPage(data.selected)}
        />

        <div className="w-full h-max  mt-[1.04vw] border-[0.05vw] relative flex justify-between items-center max-md:flex-col gap-y-[2vw]">
            <BlogDownRight className="mt-[50vw]" title={"بر اساس سلیقه شما"}/>
            <BlogDownRight title={"ترند ها"}/>

            <BlogDownLeft/>
            
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
