import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import TextLanding from '../../../Components/Common/TextInLanding/TextLanding';
import MinimalBlog from './BlogsComponent/MinimalBlog/MinimalBlog';
import Pagination from '../../../Components/Common/Paginate/Paginate';
import { motion } from 'framer-motion'; // Import motion
import Loading from '../../Common/loadingWeb/Loading.jsx';
import { getPodcastListWithPagination } from '../../../Core/Services/Api/PodcastPage/getPodcastListWithPagination.js';
import SearchBox from './SearchBox/SearchBox.jsx';
import SelectOpt2 from './Select/SelectOpt2.jsx';
import convertToJalali from '../../Common/TimeChanger/TimeToShamsi.jsx';
import { getTestList } from '../../../Core/Services/Api/TestPage/getTest.js';

const TestPage = () => {
  const [categoryQuery, setCategoryQuery] = useState("");
  const [queryValue, setQueryValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [filterValue, setFilterValue] = useState(false);
  const [response, setResponse] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const itemsPerPage = 8;
  const dispatch = useDispatch();
  // const podcast = useSelector((state) => state.BlogSlice.BlogList);
  // console.log(podcast);

  const { isLoading, error, data } = useQuery(["getTestAll"], getTestList, {
    onSuccess: (data) => {
      setResponse(data.data.data || []);
      setOriginalData(data.data.data || []);
    },
    keepPreviousData: true,
  });
  console.log(originalData);
  const filterCat = () => {
    console.log(categoryQuery);
    if (categoryQuery == false) {
      setResponse(originalData);
    }
    const filterData = response.filter((el) => {
      return el.Category == categoryQuery;
    });
    setResponse(filterData);
  };
  useEffect(() => {
    filterCat();
  }, [categoryQuery]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQueryValue(value);

    // اگر مقدار ورودی خالی باشد، داده‌های اصلی را بازگردان
    if (value === "") {
      setResponse(originalData); // `originalData` باید شامل داده‌های اصلی (غیرفیلتر شده) باشد
      return;
    }

    // در غیر این صورت، داده‌ها را بر اساس مقدار ورودی فیلتر کن
    const filterData = response?.filter((el) => {
        return el.title.toLowerCase().includes(value.toLowerCase());
    });
    setResponse(filterData);
  };


  const renderCourses = () => {
    if (isLoading) return <Loading />;
    if (error) return <p>خطایی رخ داده است...</p>;

    return response
      .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
      .map((news) => (
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
            cat={news.Category}
            desc={news.miniDesc}
            newsImg={news.imageLink}
            userImg={news.imageLink}
            writer={news.creator}
            level={news.Level}
            time={news.time}
            comment={10}
            like={news.view}
            date={convertToJalali(news.InsertTime)}
            datePass={convertToJalali(news.InsertTime)}
          />
        </motion.div>
      ));
  };
  const dark = useSelector((state) => state.darkMood);
  return (
    <div className="step7 m-auto py-12 w-full bg-transparent relative text-center">
      <div className="w-full max-w-[1200px] mt-[5vw] m-auto px-4">
        <TextLanding h3Text="پادکست" pText="پادکست های علمی ما" />

        <div
          style={{ background: dark.bgHigh, color: dark.textHigh }}
          className="min-h-[55px] p-3 flex justify-center items-center gap-3 px-[8px]  rounded-[10px] shadow-[-5px_5px_5px_0px_#0000001C] flex-wrap"
        >
          <SearchBox
            placeHolder="دنبال چیز خاصی میگردی؟"
            value={`${filterValue ? "" : queryValue}`}
            onChange={handleSearch}
            className="w-[520px]"
          />
          <SelectOpt2
            dataCat={response}
            placeholder="مرتب سازی"
            onChange={(value) => setCategoryQuery(value)}
            FilterValue={filterValue}
          />
          {/* <SelectOpt
            width={"160px"}
            placeholder="ترتیب نمایش"
            isSortSelect={true}
            onChange={(value) => setSorting(value)}
            FilterValue={filterValue}
            className="w-[235px]"
          /> */}
          <div
            style={{
              background: dark.bgLow,
              color: dark.textHigh,
            }}
            className="h-[40px] w-[100px] max-[1312px]:w-full whitespace-nowrap text-center text-[12px] leading-[40px] rounded-[9px] "
          >
            {response.length} آیتم یافت شد
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-[50px] my-[2vw]">
          {renderCourses()}
        </div>

        <Pagination
          pageCount={Math.ceil(response.length / itemsPerPage)}
          handlePageClick={(data) => setCurrentPage(data.selected)}
        />
      </div>
    </div>
  );
};

export default TestPage;
