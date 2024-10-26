import instance from "../../interseptore/Interceptor";

export const deleteBlogFavorite = async ({id}) => {
  const response = await instance.delete
  ('/News/DeleteFavoriteNews' , {
    data: {
        deleteEntityId : id
    }
  });
  return response; 
};