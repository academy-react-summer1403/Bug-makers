import axios from "axios";

export const setPodcastComment = async (id) => {
  try {
    let url = `https://taharahimycode.liara.run/podcast/comment/create`;
    const response = await axios.post(url, id);
    return response;
  } catch (error) {
    console.log(error);
  }
};