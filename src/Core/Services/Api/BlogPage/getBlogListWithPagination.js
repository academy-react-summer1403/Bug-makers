import instance from "../../interseptore/Interceptor";
export const getBlogListWithPagination = async (queryValue,categoryQuery,sorting) => {
try {
  let url = `/News?PageNumber=1&RowsOfPage=300&SortingCol=InsertDate&SortType=DESC`;

  if (queryValue) {
    url += `&Query=${queryValue}`;
  }
  if (categoryQuery) {
    url += `&NewsCategoryId=${categoryQuery}`;
  }
  const response = await instance.get(url);
  return response.news;
} catch (error) {
  console.log(error);
}
};

