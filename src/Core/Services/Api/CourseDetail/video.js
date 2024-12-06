import instance from "../../interseptore/Interceptor";

export const getCourseVideo = async () => {
try {
  const response = await instance.get("https://6751b883d1983b9597b40062.mockapi.io/courseVideo/courseVideo");
  return response;
} catch (error) {
  console.log(error);
}
};