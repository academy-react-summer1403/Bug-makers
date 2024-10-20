// components/CourseTable.js
import { Pagination } from "@nextui-org/react";

import { motion } from "framer-motion";

const MotionRow = ({ children }) => {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.tr>
  );
};
const courses = [
  // Array of course objects (static or fetched from an API)
  {
    id: 1,
    name: "React Basics",
    price: "1.800.000 تومان",
    startDate: "25 اردیبهشت 1403",
    endDate: "26 اردیبهشت 1403",
    instructor: "محسن اسفندیاری",
  },
  // Add other course objects here...
];

const Courses = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-2">نام دوره</th>
            <th className="p-2">درباره دوره</th>
            <th className="p-2">اساتید دوره</th>
            <th className="p-2">تاریخ برگزاری دوره</th>
            <th className="p-2">تاریخ پایان دوره</th>
            <th className="p-2">قیمت دوره</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <MotionRow key={course.id}>
              <td className="p-2 text-right">{course.name}</td>
              <td className="p-2 text-right">آموزش صفر تا صد...</td>
              <td className="p-2 text-right">{course.instructor}</td>
              <td className="p-2 text-right">{course.startDate}</td>
              <td className="p-2 text-right">{course.endDate}</td>
              <td className="p-2 text-right">{course.price}</td>
            </MotionRow>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <Pagination total={5} initialPage={1} />
      </div>
    </div>
  );
};

export default Courses;
