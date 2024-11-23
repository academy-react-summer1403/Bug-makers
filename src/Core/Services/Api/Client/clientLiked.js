import instance from "../../interseptore/Interceptor";

export const getLikedCourse = async () => {
try {
  let url = `/SharePanel/GetMyFavoriteCourses`;

  const response = await instance.get(url);
  return response;
} catch (error) {
  console.log(error);
}
};

export const getLikedNews = async () => {
try{  let url = `/SharePanel/GetMyFavoriteNews`;

  const response = await instance.get(url);
  return response; 
}
  catch (error) {
    console.log(error);
  }
};


export const getCourseServ = async () => {
  try {
    let url = `/SharePanel/GetMyCoursesReserve`;

    const response = await instance.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};



export const getMyCourseListWithPagination = async (query) => {
  try {
    let url = `/SharePanel/GetMyCourses?PageNumber=1&RowsOfPage=10&SortingCol=DESC&SortType=LastUpdate`;
    if (query) {
      url += `&Query=${query}`;
    }
    const response = await instance.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};