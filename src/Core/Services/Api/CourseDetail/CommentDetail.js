import instance from "../../interseptore/Interceptor";

export const getRepleyCommentCorse = async (id, NewsId) => {
  let url = `/Course/GetCourseReplyCommnets/${NewsId}/${id}`;
  console.log(url);

  const response = await instance.get(url);
  return response;
};

export const setCourseComment = async (id) => {
  let url = `/Course/AddCommentCourse`;

  const data = new FormData()
  data.append("Title", id.Title)
  data.append("Describe",id.Describe);
  data.append("CourseId", id.CourseId);

  console.log(data)
  const response = await instance.post(url,data);
  return response
};
export const setCourseRepleyComment = async (id) => {
  let url = `/Course/AddCommentCourse`;
  const data = new FormData()
  data.append("Title", id.Title)
  data.append("Describe",id.Describe);
  data.append("CourseId", id.CourseId);
  data.append("CommentId", id.CommentId);
  console.log(data)

  const response = await instance.post(url, data);
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