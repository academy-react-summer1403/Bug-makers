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