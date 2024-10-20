import instance from "../../interseptore/Interceptor";

export const getTeacherList = async () => {
  const response = await instance.get('/Home/GetTeachers');
  console.log(response);
  return response; 
  
};
