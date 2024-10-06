
import instance from '../../interseptore/Interceptor';

export const GetListNewsCategory = async () => {
  const response = await instance.get('/News/GetListNewsCategory');
  return response.data; 
  console.log(response.data);
};
