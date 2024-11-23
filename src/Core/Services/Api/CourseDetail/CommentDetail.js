import instance from "../../interseptore/Interceptor";

export const getRepleyCommentCorse = async (id, NewsId) => {
 try {
   let url = `/Course/GetCourseReplyCommnets/${NewsId}/${id}`;

   const response = await instance.get(url);
   return response;
 } catch (error) {
   console.log(error);
 }
};

export const setCourseComment = async (id) => {
  try {
    let url = `/Course/AddCommentCourse`;

    const data = new FormData();
    data.append("Title", id.Title);
    data.append("Describe", id.Describe);
    data.append("CourseId", id.CourseId);

    const response = await instance.post(url, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const setCourseRepleyComment = async (id) => {
  try {
    let url = `/Course/AddCommentCourse`;
    const data = new FormData();
    data.append("Title", id.Title);
    data.append("Describe", id.Describe);
    data.append("CourseId", id.CourseId);
    data.append("CommentId", id.CommentId);
    const response = await instance.post(url, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const commentLikeCourse = async (id) => {
  try {
    let url = `/Course/AddCourseCommentLike?CourseCommandId=${id}`;
    const response = await instance.post(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const commentDissLikeCourse = async (id) => {
try {
  let url = `/Course/AddCourseCommentDissLike?CourseCommandId=${id}`;
  const response = await instance.post(url);
  return response;
} catch (error) {
  console.log(error);
}
};

export const comentDelLikeCourse = async (id) => {
try {
  let url = `/Course/DeleteCourseCommentLike?CourseCommandId=${id}`;
  const response = await instance.delete(url);

  return response;
} catch (error) {
  console.log(error);
}
};