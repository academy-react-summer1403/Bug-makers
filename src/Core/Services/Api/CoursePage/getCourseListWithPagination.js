import instance from "../../Interceptor/Interceptor";
export const getCourseListWithPagination = async (query, teacherId, categoryQuery, startDate, endDate) => {
  let url = `/Home/GetCoursesWithPagination?PageNumber=1&RowsOfPage=300&SortingCol=Active&SortType=DESC`;

  if (query) {
    url += `&Query=${query}`;
  }

  if (teacherId) {
    url += `&TeacherId=${teacherId}`;
  }

  if (categoryQuery) {
    url += `&TechCount=1&ListTech=${categoryQuery}`;
  }

  if (startDate) {
    url += `&StartDate=${startDate}`;
  }
  if (endDate) {
    url += `&EndDate=${endDate}`;
  }

  const response = await instance.get(url);
  return response.data; 
};
