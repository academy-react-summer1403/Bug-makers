import instance from "../../interseptore/Interceptor";

export const getLikedCourse = async () => {
  let url = `/SharePanel/GetMyFavoriteCourses`;



  const response = await instance.get(url);
  return response; 
};
