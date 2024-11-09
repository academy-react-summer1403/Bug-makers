import toast from "react-hot-toast";
import instance from "../../interseptore/Interceptor";

export const AddBlogFavorite = async ({ id }) => {
  try {
    const response = await instance.post(`/News/AddFavoriteNews?NewsId=${id}`);
    // toast.success("znvjlaefvkfs");
    return response;
  } catch (error) {
    console.log(error);
  }
};
