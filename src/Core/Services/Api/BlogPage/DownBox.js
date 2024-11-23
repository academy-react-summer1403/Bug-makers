import instance from "../../interseptore/Interceptor";
export const getBlogList = async (sorting) => {
try {
  let url = `/News?PageNumber=1&RowsOfPage=7&SortingCol=Desc&SortType=DESC&Query=&NewsCategoryId=`;
  const response = await instance.get(url);
  return response.news;
} catch (error) {
  console.log(error);
}
};
