import axios from "axios";
import instance from "../../interseptore/Interceptor";

export const getPodcastListWithPagination = async (queryValue) => {
try {
  let url = `https://taharahimycode.liara.run/podcast/getAll`;

  // if (queryValue) {
  //   url += `?query=${queryValue}`;
  // }

  const response = await axios.get(url);
  return response;
} catch (error) {
  console.log(error);
}
};

