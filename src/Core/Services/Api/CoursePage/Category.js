import instance from '../../Interceptor/Interceptor';

export const getCategoryList = async () => {
  const response = await instance.get('/Home/GetTechnologies');
  return response.data;
};
