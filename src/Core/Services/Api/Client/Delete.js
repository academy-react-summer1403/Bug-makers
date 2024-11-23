import instance from "../../interseptore/Interceptor";

export const delCourseServ = async (id) => {
try {
  let url = "/CourseReserve";
  const response = await instance.delete(url, { data: { id: id } });
  return response;
} catch (error) {
  console.log(error);
}
};

export const delBlogFav = async (id) => {
 try {
   let url = "/News/DeleteFavoriteNews";
   const data = { data: { deleteEntityId: `${id}` } };
   const response = await instance.delete(url, data);
   return response;
 } catch (error) {
   console.log(error);
 }
};

export const delCourseFav = async (id) => {
  try {
    let url = "/Course/DeleteCourseFavorite";
    const formData = new FormData();
    formData.append("CourseFavoriteId", id);
    const response = await instance.delete(url, { data: formData });
    return response;
  } catch (error) {
    console.log(error);
  }
};