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

export const postLikeNews = async (id) => {
  let url = `/News/NewsLike/${id}`;
  console.log(url)

  const response = await instance.post(url);
  return response; 
};

export const postDissLikeNews = async (id) => {
  let url = `/News/NewsDissLike/${id}`;
  console.log(url)

  const response = await instance.post(url);
  return response
};

export const delLikeNews = async (id) => {
  let url = "/Course/DeleteCourseLike";
  const formData = new FormData()
  formData.append('CourseLikeId', id);
  
  console.log(i)
  const response = await instance.delete(url,i);
  
  return response
};
