import instance from "../../interseptore/Interceptor";

export const delCourseServ = async (id) => {
  let url = "/CourseReserve";

  console.log(id);
  const response = await instance.delete(url, {data:{ "id": id }});

  return response;
};

export const delBlogFav = async (id) => {
  let url = "/News/DeleteFavoriteNews";

  const data = { data: { deleteEntityId: `${id}` } };
  const response = await instance.delete(url, data);

  return response;
};

export const delCourseFav = async (id) => {
  let url = "/Course/DeleteCourseFavorite";
  const formData = new FormData();
  formData.append("CourseFavoriteId", id);

  console.log(formData);
  const response = await instance.delete(url, { data: formData });

  return response;
};