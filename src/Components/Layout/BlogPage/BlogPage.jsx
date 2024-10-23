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
  const [categoryQuery, setCategoryQuery] = useState('');
  const [teacherId, setTeacherId] = useState(null);
  const [queryValue, setQueryValue] = useState(''); 
  const [currentPage, setCurrentPage] = useState(0);
  const [listStyle, setListStyle] = useState(false);
  const [filterValue, setFilterValue] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sorting, setSorting] = useState('');
  const [minCost, setMinCost] = useState(null);
  const [maxCost, setMaxCost] = useState(null);

  const itemsPerPage = 10; 
  const dispatch = useDispatch();
  const CourseListItem = useSelector((state) => state.BlogSlice.BlogList);
  
  const { isLoading, error, data } = useQuery(
    ['get', queryValue, categoryQuery, sorting], 
    () => getBlogListWithPagination(queryValue, categoryQuery, sorting), 
    {
      onSuccess: (data) => {
        dispatch(setBlogList(data || data));
      },
      keepPreviousData: true, 
    }
  );

  const handleSearch = (e) => {
    setQueryValue(e.target.value); 
  };

  const handleRemoveFilter = () => {
    setQueryValue('');
    setTeacherId(null);  
    setCategoryQuery(''); 
    setFilterValue(true);
    setTimeout(() => {
      setFilterValue(false);
    }, 100); 
  };

  const convertToJalali = (miladiDate) => {
    return moment(miladiDate, "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD");
  };

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
      <div className='w-full max-w-[1200px] mt-[5vw] m-auto px-4'>
        <TextLanding h3Text='مقالات' pText='مقالات آموزشی ما' />

        <div className='min-h-[55px] p-3 flex justify-center items-center gap-3 px-[8px] bg-white rounded-[10px] shadow-[-5px_5px_5px_0px_#0000001C] flex-wrap'>
          <SearchBox
            placeHolder='دنبال چیز خاصی میگردی؟'
            value={`${filterValue ? '' : queryValue}`}
            onChange={handleSearch} 
          />
          <SelectOpt2
            placeholder='دسته‌بندی'
            onChange={(value) => setCategoryQuery(value)} 
            FilterValue={filterValue}
          />
          <SelectOpt
            width={"160px"}
            placeholder="ترتیب نمایش"
            isSortSelect={true}
            onChange={(value) => setSorting(value)} 
            FilterValue={filterValue}
          />
          <div className="h-[40px]  text-center leading-[40px] rounded-[9px] ">
            {CourseListItem.length} آیتم یافت شد
          </div>
        </div>

        <div className='flex flex-wrap justify-center gap-[50px] mt-[2vw]'>
          {renderCourses()}
        </div>

        <Pagination
          pageCount={Math.ceil(CourseListItem.length / itemsPerPage)}
          handlePageClick={(data) => setCurrentPage(data.selected)}
        />

<div className="w-full h-max mt-[1.04vw] relative flex flex-col md:flex-row justify-between items-start gap-[2vw]">
    <BlogDownRight className="w-full md:w-1/3" title={"بر اساس سلیقه شما"} />
    <BlogDownRight className="w-full md:w-1/3" title={"ترند ها"} />
    <BlogDownLeft className="w-full md:w-1/3" />
</div>

      </div>
    </div>
  );
};

export default BlogPage;
