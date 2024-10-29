import instance from "../../interseptore/Interceptor";

export const getSearch = async (query, teacherId, categoryQuery, startDate, endDate , sorting , minCost , maxCost) => {
  let url = `/Home/GetCoursesWithPagination?Query=${query}`;

  const response = await instance.get(url);
  return response; 
};


export const getSearchBlog = async (query, teacherId, categoryQuery, startDate, endDate , sorting , minCost , maxCost) => {
  let url = `/News?Query=${query}`;

  const response = await instance.get(url);
  return response; 
};
