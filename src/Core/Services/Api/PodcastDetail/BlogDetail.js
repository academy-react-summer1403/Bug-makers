import axios from "axios";
import instance from "../../interseptore/Interceptor";


export const getPodcastDetail = async (id) => {
  let url = `https://taharahimycode.liara.run/podcast/getById/${id}?accId=2`;

  const response = await axios.get(url);
  return response; 
};

export const getBlogDetailComment  = async (id) => {
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
  let url = "/News/DeleteLikeNews";

  console.log(id);
  const response = await instance.delete(url, { data: { deleteEntityId: `${id}` } });

  return response;
};

