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
            <th className="py-3 px-6 text-right">نام دوره</th>
            <th className="py-3 px-6 text-right">درباره دوره</th>
            <th className="py-3 px-6 text-right">استاد دوره</th>
            <th className="py-3 px-6 text-right">تاریخ برگزاری</th>
            <th className="py-3 px-6 text-right">قیمت دوره</th>
            <th className="py-3 px-4 text-center"></th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {courses.map((course, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-right whitespace-nowrap">
                {course.name}
              </td>
              <td className="py-3 px-6 text-right whitespace-nowrap overflow-hidden text-ellipsis ...">
                {course.about}
              </td>
              <td className="py-3 px-6 text-right whitespace-nowrap">
                <Tooltip className="text-gray-700" content={`استاد: ${course.teacher}`}>
                  {course.teacher}
                </Tooltip>
              </td>
              <td className="py-3 px-6 text-right whitespace-nowrap">
                {course.date}
              </td>
              <td className="py-3 px-6 text-right whitespace-nowrap">
                {course.price}
              </td>
              <td>
                <svg
                className="cursor-pointer"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z"
                    stroke="#787878"
                    stroke-width="1.5"
                  />
                  <path
                    d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z"
                    stroke="#787878"
                    stroke-width="1.5"
                  />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
