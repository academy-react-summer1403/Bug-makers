import instance from "../../interseptore/Interceptor";

export const getCategoryList = async () => {
try {
  const response = await instance.get("/Home/GetTechnologies");
  return response;
} catch (error) {
  console.log(error);
}
  
};