import instance from '../../interseptore/Interceptor';

export const getCategoryList2 = async () => {
  const response = await instance.get('/News/GetListNewsCategory');
  return response;
};
