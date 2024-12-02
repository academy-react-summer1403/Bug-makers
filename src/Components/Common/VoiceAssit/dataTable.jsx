import React from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";

const DataTableVoice = () => {
  const data = [
    { id: 1, name: "خانه", tour: "home" },
    { id: 2, name: "صفحه دوره ها", tour: "open course" },
    { id: 3, name: "صفحه مقالات", tour: "open blog" },
    { id: 4, name: "صفحه پادکست ها", tour: "open podcast" },
    { id: 5, name: "تغییر زبان به انگلیسی", tour: "change english" },
    { id: 6, name: "تغییر زبان به فارسی", tour: "change persian" },
    { id: 7, name: "تغییر زبان به ترکی", tour: "change turkish" },
    { id: 8, name: "تغییر زبان به انگلیسی", tour: "change english" },
    { id: 9, name: "تغییر تم به آبی", tour: "change to blue" },
    { id: 10, name: "تغییر تم به سبز", tour: "change to green" },
    { id: 11, name: "تغییر تم به زرد", tour: "change to yellow" },
    { id: 12, name: "تغییر تم به قرمز", tour: "change to red" },
    { id: 13, name: "تغییر تم به دارک", tour: "dark mode" },
    { id: 14, name: "تغییر تم به لایت", tour: "light mode" },
    { id: 15, name: "ساخت عکس", tour: "generate image" },
  ];

  // تعریف ستون‌ها
  const columns = [
    {
      name: "گفتار",
      selector: (row) => row.name,
    },
    {
      name: "دستورات",
      selector: (row) => row.tour,
    },
  ];
const dark = useSelector((state) => state.darkMood);
  return (
    <div className="mt-2 ">
      <DataTable
        title="تمام دستورات صوتی"
        columns={columns}
        data={data}
        pagination // فعال کردن صفحه‌بندی
        paginationPerPage={10} // تعداد سطرهای هر صفحه
        striped // اضافه کردن طرح راه راه
        highlightOnHover // روشن کردن حالت برجسته‌سازی هنگام هوور
        theme={dark.bgHigh == "#ffffff" ? "light" : "dark"}
      />
    </div>
  );
};

export default DataTableVoice;
