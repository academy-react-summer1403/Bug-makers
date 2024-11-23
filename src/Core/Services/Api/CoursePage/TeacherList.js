import instance from "../../interseptore/Interceptor";

export const getTeacherList = async () => {
  try {
    const response = await instance.get("/Home/GetTeachers");
    return response;
  } catch (error) {
    console.log(error);
  }
  
};
