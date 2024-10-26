import instance from "../../interseptore/Interceptor";

export const AddBlogFavorite = async ({id}) => {
  const response = await instance.post
  (`/News/AddFavoriteNews?NewsId=${id}`);
  return response; 
};