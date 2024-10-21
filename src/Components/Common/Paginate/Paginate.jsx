import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, handlePageClick }) => {

  return (
    <ReactPaginate
      previousLabel={false}
      nextLabel={false}
      breakLabel={'...'}
      pageCount={pageCount} // تعداد کل صفحات
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick} // فانکشن برای هندل کردن تغییر صفحه
      containerClassName={'flex justify-center items-center mt-4 space-x-2 flex-row-reverse'} // Container with flex-row-reverse
      activeClassName={'bg-[#91ACCF] text-[#f3f3f3]'} // استایل صفحه فعال
      pageClassName={'rounded-[8px] border border-gray-300 text-black leading-10 w-[40px] h-[40px] hover:bg-blue-100 cursor-pointer'} // استایل صفحات
      breakClassName={'text-gray-700 px-3 py-1'} // استایل سه نقطه
      pageLinkClassName={'w-full h-full flex justify-center items-center'} // این قسمت کل دایو را کلیک‌پذیر می‌کند
      onClick={() => window.scrollTo({top: 0 , behavior:'smooth' })}
    />
  );
};

export default Pagination;
