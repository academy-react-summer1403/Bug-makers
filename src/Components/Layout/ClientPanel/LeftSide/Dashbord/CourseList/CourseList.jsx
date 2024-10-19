import React from "react";
import { Tooltip } from "@nextui-org/react";

const CourseTable = () => {
  // لیست دوره‌های نمونه
  const courses = [
    {
      name: "دوره طراحی وب",
      about: "دوره جامع طراحی سایت با HTML, CSS, JavaScript",
      teacher: "علی محمدی",
      date: "1403/03/15",
      price: "200,000 تومان",
    },
    {
      name: "دوره برنامه‌نویسی جاوا",
      about: "دوره تخصصی جاوا و مفاهیم شیء گرایی",
      teacher: "محمد رضایی",
      date: "1403/04/20",
      price: "300,000 تومان",
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">جدیدترین دوره‌ها</h2>
        <a href="#" className="text-yellow-500 hover:underline">
          مشاهده همه
        </a>
      </div>
      <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
            <th className="py-3 px-6 text-center">نام دوره</th>
            <th className="py-3 px-6 text-center">درباره دوره</th>
            <th className="py-3 px-6 text-center">استاد دوره</th>
            <th className="py-3 px-6 text-center">تاریخ برگزاری</th>
            <th className="py-3 px-6 text-center">قیمت دوره</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {courses.map((course, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-center whitespace-nowrap">
                {course.name}
              </td>
              <td className="py-3 px-6 text-center whitespace-nowrap">
                {course.about}
              </td>
              <td className="py-3 px-6 text-center whitespace-nowrap">
                <Tooltip content={`استاد: ${course.teacher}`}>
                  {course.teacher}
                </Tooltip>
              </td>
              <td className="py-3 px-6 text-center whitespace-nowrap">
                {course.date}
              </td>
              <td className="py-3 px-6 text-center whitespace-nowrap">
                {course.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
