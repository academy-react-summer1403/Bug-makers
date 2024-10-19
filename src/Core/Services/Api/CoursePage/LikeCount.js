import instance from "../../Interceptor/Interceptor";

export const getLikeCount = async (courseId) => {
  const response = await instance.post(`/Course/AddCourseLike?CourseId=${courseId}`);
  return response.data; 
  };
  