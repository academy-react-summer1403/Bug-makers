import instance from '../../Interceptor/Interceptor';

export const getTeacherList = async () => {
  const response = await instance.get('/Home/GetTeachers');
  return response.data; 
  console.log(response.data);
};
