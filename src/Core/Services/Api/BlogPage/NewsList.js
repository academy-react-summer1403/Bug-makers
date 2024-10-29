
import instance from '../../interseptore/Interceptor';

export const GetListNewsCategory = async () => {
  const response = await instance.get('/News/GetListNewsCategory');
  return response.data; 
};

export const GetListNews = async () => {
  const response = await instance.get('/News?PageNumber=1&RowsOfPage=10&SortingCol=InsertDate&SortType=DESC');
  return response.data; 
};

