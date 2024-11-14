import axios from "axios";
import instance from "../../interseptore/Interceptor";

export const getRepleyComment = async (id) => {
  let url = `/News/GetRepliesComments?Id=${id}`;
  console.log(url)

  const response = await instance.get(url);
  return response
};

export const setPodcastComment = async (id) => {
  let url = `https://taharahimycode.liara.run/podcast/comment/create`;
  console.log(id);

  const response = await axios.post(url, id);
  return response;
};

export const commentLikeNews = async (id) => {
  let url = `/News/CommentLike/${id}?LikeType=true`;
  console.log(url)

  const response = await instance.post(url);
  return response; 
};

export const commentDissLikeNews = async (id) => {
  let url = `/News/CommentLike/${id}?LikeType=false`;
  console.log(url)

  const response = await instance.post(url);
  return response
};

export const comentDelLikeCourse = async (id) => {
  let url = `/News/DeleteCommentLikeNews`;

  console.log(id);
  const response = await instance.delete(url,{data:id});

  return response;
};