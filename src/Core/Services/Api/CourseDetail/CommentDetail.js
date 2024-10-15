import instance from "../../interseptore/Interceptor";

export const getRepleyComment = async (id, NewsId) => {
  let url = `/Course/GetCourseReplyCommnets/${NewsId}/${id}`;
  console.log(url);

  const response = await instance.get(url);
  return response;
};

export const setNewComment = async (id) => {
  let url = `/News/CreateNewsComment`;
  console.log(id)

  const response = await instance.post(url,id);
  return response
};

export const commentLikeCourse = async (id) => {
  let url = `/Course/AddCourseCommentLike?CourseCommandId=${id}`;
  console.log(url)

  const response = await instance.post(url);
  return response; 
};

export const commentDissLikeCourse = async (id) => {
  let url = `/Course/AddCourseCommentDissLike?CourseCommandId=${id}`;
  console.log(url)

  const response = await instance.post(url);
  return response
};

export const comentDelLikeCourse = async (id) => {
  let url = `/Course/DeleteCourseCommentLike?CourseCommandId=${id}`;
  
  console.log(id)
  const response = await instance.delete(url);
  
  return response
};