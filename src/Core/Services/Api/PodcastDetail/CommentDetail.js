import instance from "../../interseptore/Interceptor";

export const getRepleyComment = async (id) => {
  let url = `/News/GetRepliesComments?Id=${id}`;
  console.log(url)

  const response = await instance.get(url);
  return response
};

export const setNewComment = async (id) => {
  let url;
  id.parentId
    ? (url = `/News/CreateNewsReplyComment`)
    : (url = `/News/CreateNewsComment`);
  console.log(id)

  const response = await instance.post(url,id);
  return response
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