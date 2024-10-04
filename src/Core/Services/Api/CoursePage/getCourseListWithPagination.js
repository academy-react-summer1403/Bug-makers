import instance from '../../Interceptor/Interceptor';

export const getCourseListWithPagination = async (query, teacherId, categoryQuery) => {
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

  const response = await instance.get(url);
  return response.data;
};
