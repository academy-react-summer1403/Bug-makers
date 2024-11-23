import instance from "../../interseptore/Interceptor";

export const deleteBlogFavorite = async (id) => {
 try {
   let url = "/News/DeleteFavoriteNews";

   const data = { data: { deleteEntityId: `${id}` } };
   const response = await instance.delete(url, data);

   return response;
 } catch (error) {
   console.log(error);
 }
};