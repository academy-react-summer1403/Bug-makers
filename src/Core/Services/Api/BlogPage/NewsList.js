
import instance from '../../interseptore/Interceptor';

export const GetListNewsCategory = async () => {
  try {
    const response = await instance.get("/News/GetListNewsCategory");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const GetListNews = async () => {
  try {
    const response = await instance.get(
      "/News?PageNumber=1&RowsOfPage=10&SortingCol=InsertDate&SortType=DESC"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

