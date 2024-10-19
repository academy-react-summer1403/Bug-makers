import instance from "../../interseptore/Interceptor";
export const getBlogListWithPagination = async (queryValue,categoryQuery,sorting) => {
  let url = `/News?PageNumber=1&RowsOfPage=300&SortingCol=InsertDate&SortType=DESC`;

  if (queryValue) {
    url += `&Query=${queryValue}`;
  }

  // if (teacherId) {
  //   url += `&TeacherId=${teacherId}`;
  // }
  
  if (categoryQuery) {
    url += `&NewsCategoryId=${categoryQuery}`;
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
