import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { setBlogList } from '../../../Redux/Slice/Blog/BlogList.js';
import { getBlogListWithPagination } from '../../../Core/Services/Api/BlogPage/getBlogListWithPagination'; 
import SearchBox from '../../../Components/Common/SearchBox/SearchBox.jsx';
import TextLanding from '../../../Components/Common/TextInLanding/TextLanding';
import MinimalBlog from './BlogsComponent/MinimalBlog/MinimalBlog';
import Pagination from '../../../Components/Common/Paginate/Paginate';
import SelectOpt from '../../../Components/Common/Select/SelectOpt';
import SelectOpt2 from "../../Common/Select/SelectOpt2.jsx";
import BlogDownRight from "./BlogDown.jsx/BlogDownRight/BlogDownRight.jsx";
import BlogDownLeft from "./BlogDown.jsx/BlogDownLeft/BlogDownLeft";
import { motion } from 'framer-motion'; // Import motion
import moment from 'jalali-moment'; 
import Loading from '../../Common/loadingWeb/Loading.jsx';
import Tour from "reactour";
import AppTour from '../../Common/Tuor/Tour.jsx';
const BlogPage = () => {
  const [categoryQuery, setCategoryQuery] = useState('');
  const [queryValue, setQueryValue] = useState(''); 
  const [currentPage, setCurrentPage] = useState(0);
  const [filterValue, setFilterValue] = useState(false);
  const itemsPerPage = 10; 
  const dispatch = useDispatch();
  const CourseListItem = useSelector((state) => state.BlogSlice.BlogList);
  console.log(CourseListItem);
  const { isLoading, error, data } = useQuery(
    ['get', queryValue, categoryQuery], 
    () => getBlogListWithPagination(queryValue, categoryQuery), 
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
    if (isLoading) return <Loading />
    if (error) return <p>خطایی رخ داده است...</p>;

    return CourseListItem.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    ).map((news) => (
      <motion.div 
        key={news.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -20 }} 
        transition={{ duration: 0.5 }} 
      >
        <MinimalBlog
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
      </motion.div>
    ));
  };

const dark = useSelector((state) => state.darkMood);
  return (
    <div className="step6 scroll-smooth m-auto w-full bg-transparent relative text-center">
      <div className="w-full max-w-[1200px] mt-[5vw] m-auto px-4">
        <TextLanding h3Text="مقالات" pText="مقالات آموزشی ما" />
        <div
          style={{ background: dark.bgHigh, color: dark.textHigh }}
          className=" min-h-[55px] p-3 flex justify-center items-center gap-3 px-[8px]  rounded-[10px] shadow-[-5px_5px_5px_0px_#0000001C] flex-wrap"
        >
          <SearchBox
            placeHolder="دنبال چیز خاصی میگردی؟"
            value={`${filterValue ? "" : queryValue}`}
            onChange={handleSearch}
            className="w-[520px]"
          />
          <SelectOpt2
            placeholder="دسته‌بندی"
            onChange={(value) => setCategoryQuery(value)}
            FilterValue={filterValue}
          />
          <SelectOpt
            width={"160px"}
            placeholder="ترتیب نمایش"
            isSortSelect={true}
            onChange={(value) => setSorting(value)}
            FilterValue={filterValue}
            className="w-[235px]"
          />
          <div
            style={{
              background: dark.bgLow,
              color: dark.textHigh,
            }}
            className="h-[40px] w-[100px] max-[1312px]:w-full whitespace-nowrap text-center text-[12px] leading-[40px] rounded-[9px] "
          >
            {CourseListItem.length} آیتم یافت شد
          </div>
        </div>

        <div className=" flex flex-wrap justify-center gap-[50px] mt-[2vw]">
          {renderCourses()}
        </div>

        <Pagination
          pageCount={Math.ceil(CourseListItem.length / itemsPerPage)}
          handlePageClick={(data) => setCurrentPage(data.selected)}
        />

        <div className=" w-full h-max mt-[1.04vw] relative flex flex-col md:flex-row justify-between items-start gap-[2vw]">
          <BlogDownRight title={"بر اساس سلیقه شما"} />
          <BlogDownRight title={"ترند ها"} />
          <BlogDownLeft />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
