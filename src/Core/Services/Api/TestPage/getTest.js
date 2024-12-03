import axios from "axios";
import instance from "../../interseptore/Interceptor";

export const getTestList = async () => {
  try {
    let url = `https://taharahimycode.liara.run/Exam/exam`;
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};
