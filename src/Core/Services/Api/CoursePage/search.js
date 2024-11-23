import instance from "../../interseptore/Interceptor";

export const getSearch = async (query, teacherId, categoryQuery, startDate, endDate , sorting , minCost , maxCost) => {
  try {
    let url = `/Home/GetCoursesWithPagination?Query=${query}`;

    const response = await instance.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};


export const getSearchBlog = async (query, teacherId, categoryQuery, startDate, endDate , sorting , minCost , maxCost) => {
  try {
    let url = `/News?Query=${query}`;

    const response = await instance.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};
