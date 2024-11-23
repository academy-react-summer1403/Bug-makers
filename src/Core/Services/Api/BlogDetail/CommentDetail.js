import instance from "../../interseptore/Interceptor";

export const getRepleyComment = async (id) => {
  try {
    let url = `/News/GetRepliesComments?Id=${id}`;
    const response = await instance.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const setNewComment = async (id) => {
  try {
    let url;
    id.parentId
      ? (url = `/News/CreateNewsReplyComment`)
      : (url = `/News/CreateNewsComment`);
    const response = await instance.post(url, id);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const commentLikeNews = async (id) => {
  try {
    let url = `/News/CommentLike/${id}?LikeType=true`;
    const response = await instance.post(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const commentDissLikeNews = async (id) => {
  try {
    let url = `/News/CommentLike/${id}?LikeType=false`;
    const response = await instance.post(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const comentDelLikeCourse = async (id) => {
  try {
    let url = `/News/DeleteCommentLikeNews`;
    const response = await instance.delete(url, { data: id });
    return response;
  } catch (error) {
    console.log(error);
  }
};