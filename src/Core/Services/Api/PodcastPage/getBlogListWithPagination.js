import axios from "axios";
import instance from "../../interseptore/Interceptor";

export const getPodcastListWithPagination = async (queryValue) => {
  let url = `https://taharahimicode.liara.run/podcast/getAll`;

  // if (queryValue) {
  //   url += `&query=${queryValue}`;
  // }

  const response = await axios.get(url);
  return response.news; 
};

