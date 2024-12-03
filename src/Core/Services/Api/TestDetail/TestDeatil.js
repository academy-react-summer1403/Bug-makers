import axios from "axios";

export const getTestById = async (id) => {
  try {
    let url = `https://taharahimycode.liara.run/Exam/exam/${id}`;
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const postTestAnswer = async (data) => {
  try {
    let url = `https://taharahimycode.liara.run/Exam/add`;
    const response = await axios.post(url,data);
    return response;
  } catch (error) {
    console.log(error);
  }
};