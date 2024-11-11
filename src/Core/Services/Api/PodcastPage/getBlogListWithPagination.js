import instance from "../../interseptore/Interceptor";
export const getPodcastListWithPagination = async (queryValue) => {
  let url = `https://taharahimicode.liara.run/api/podcast/getAll/1/10`;

  if (queryValue) {
    url += `/${queryValue}`;
  }
  else if(!queryValue) {
    url += `/20%`;
  }

  // if (teacherId) {
  //   url += `&TeacherId=${teacherId}`;
  // }
  
  // if (categoryQuery) {
  //   url += `&NewsCategoryId=${categoryQuery}`;
  // }
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

