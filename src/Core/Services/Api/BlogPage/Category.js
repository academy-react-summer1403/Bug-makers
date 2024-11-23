import instance from '../../interseptore/Interceptor';

export const getCategoryList2 = async () => {
  try {
    const response = await instance.get("/News/GetListNewsCategory");
    return response;
  } catch (error) {
    console.log(error);
  }
};
