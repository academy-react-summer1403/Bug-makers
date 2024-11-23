import instance from "../../interseptore/Interceptor";


export const getBlogDetail = async (id) => {
  try {
    let url = `/News/${id}`;

    const response = await instance.get(url);
    return response.detailsNewsDto;
  } catch (error) {
    console.log(error);
  }
};

export const getBlogDetailComment = async (id) => {
  try {
    let url = `/News/${id}`;

    const response = await instance.get(url);
    return response.commentDtos;
  } catch (error) {
    console.log(error);
  }
};

export const postLikeNews = async (id) => {
  try {
    let url = `/News/NewsLike/${id}`;
    console.log(url);

    const response = await instance.post(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postDissLikeNews = async (id) => {
  try {
    let url = `/News/NewsDissLike/${id}`;
    console.log(url);

    const response = await instance.post(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const delLikeNews = async (id) => {
 try {
   let url = "/News/DeleteLikeNews";

   console.log(id);
   const response = await instance.delete(url, {
     data: { deleteEntityId: `${id}` },
   });

   return response;
 } catch (error) {
   console.log(error);
 }
};

