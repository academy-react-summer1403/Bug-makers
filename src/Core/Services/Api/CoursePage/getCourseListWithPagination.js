import instance from "../../interseptore/Interceptor";

export const getCourseListWithPagination = async (query, teacherId, categoryQuery, startDate, endDate , sorting , minCost , maxCost) => {
try {
  let url = `/Home/GetCoursesWithPagination?PageNumber=1&RowsOfPage=300&SortingCol=${
    sorting ? sorting : "Active"
  }&SortType=DESC`;

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
  if (minCost) {
    url += `&CostDown=${minCost}`;
  }
  if (maxCost) {
    url += `&CostUp=${maxCost}`;
  }

  const response = await instance.get(url);
  return response;
} catch (error) {
  console.log(error);
}
};
