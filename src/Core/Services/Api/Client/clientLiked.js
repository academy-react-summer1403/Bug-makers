import instance from "../../interseptore/Interceptor";

export const getLikedCourse = async () => {
  let url = `/SharePanel/GetMyFavoriteCourses`;

  const response = await instance.get(url);
  return response; 
};

export const getLikedNews = async () => {
  let url = `/SharePanel/GetMyFavoriteNews`;

  const response = await instance.get(url);
  return response; 
};

export const getCourseServ = async () => {
  let url = `/SharePanel/GetMyCoursesReserve`;

  const response = await instance.get(url);
  return response; 
};



export const getMyCourseListWithPagination = async (
  query,
  
) => {
  let url = `/SharePanel/GetMyCourses?PageNumber=1&RowsOfPage=10&SortingCol=DESC&SortType=LastUpdate`;

  if (query) {
    url += `&Query=${query}`;
  }


  const response = await instance.get(url);
  return response;
};