import instance from "../../interseptore/Interceptor";

export const AddCourseFavorite = async ({id}) => {
try {
  const response = await instance.post("/Course/AddCourseFavorite", {
    courseId: id,
  });
  return response;
} catch (error) {
  console.log(error);
}
};