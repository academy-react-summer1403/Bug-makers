import instance from "../../interseptore/Interceptor";

export const deleteBlogFavorite = async (id) => {
  let url = "/News/DeleteFavoriteNews";

  const data = { data: { deleteEntityId: `${id}` } };
  const response = await instance.delete(url, data);

  return response;
};