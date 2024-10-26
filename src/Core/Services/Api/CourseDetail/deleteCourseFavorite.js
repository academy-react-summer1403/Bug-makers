import instance from "../../interseptore/Interceptor";

export const deleteCourseFavorite = async ({ id }) => {
  const formData = new FormData();
  formData.append('CourseFavoriteId', id);

  const response = await instance.delete('/Course/DeleteCourseFavorite', {
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data', 
    },
  });

  return response;
};
