import instance from "../../interseptore/Interceptor";

export const getLikeCount = async (courseId) => {
  try {
    const response = await instance.post(
      `/Course/AddCourseLike?CourseId=${courseId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
  };
  