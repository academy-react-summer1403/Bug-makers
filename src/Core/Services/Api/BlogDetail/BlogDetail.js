import instance from "../../interseptore/Interceptor";


export const getBlogDetail = async (id) => {
  let url = `/News/${id}`;

  const response = await instance.get(url);
  return response.detailsNewsDto; 
};

export const getBlogDetailComment = async (id) => {
  let url = `/News/${id}`;

  const response = await instance.get(url);
  return response.commentDtos; 
};