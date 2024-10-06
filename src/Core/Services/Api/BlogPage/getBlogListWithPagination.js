import instance from "../../interseptore/Interceptor";
export const getBlogListWithPagination = async (query,NewsCategoryId,sorting) => {
  let url = `/News?PageNumber=1&RowsOfPage=300&SortingCol=InsertDate&SortType=DESC&Query=&NewsCategoryId=`;

  if (query) {
    url += `&Query=${query}`;
  }

  // if (teacherId) {
  //   url += `&TeacherId=${teacherId}`;
  // }
  if (NewsCategoryId) {
    url += `&NewsCat=${NewsCategoryId}`;
  }
  // if (categoryQuery) {
  //   url += `&TechCount=1&ListTech=${categoryQuery}`;
  // }

  // if (startDate) {
  //   url += `&StartDate=${startDate}`;
  // }
  // if (endDate) {
  //   url += `&EndDate=${endDate}`;
  // }
  // if (minCost) {
  //   url += `&CostDown=${minCost}`;
  // }
  // if (maxCost) {
  //   url += `&CostUp=${maxCost}`;
  // }

  const response = await instance.get(url);
  return response.news; 
};
