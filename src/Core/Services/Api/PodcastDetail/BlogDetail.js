import axios from "axios";
import instance from "../../interseptore/Interceptor";


export const getPodcastDetail = async (id, accId) => {
  try {
    let url = `https://taharahimycode.liara.run/podcast/getById/${id}/${accId}`;

    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getPodcastComment = async (id) => {
  try {
    let url = `https://taharahimycode.liara.run/podcast/comment/ByPOD/${id}`;

    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postLikePodcast = async (id, accId) => {
  try {
    let url = `https://taharahimycode.liara.run/podcast/like/AddLike/${id}/${accId}`;
    const response = await axios.post(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postDissLikePodcast = async (id, accId) => {
  try {
    let url = `https://taharahimycode.liara.run/podcast/like/AddDissLike/${id}/${accId}`;
    const response = await axios.post(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const delLikePodcast = async (id) => {
  try {
    let url = "https://taharahimycode.liara.run/podcast/like/deleteMany";
    const response = await axios.delete(url, {
      data: {
        ids: [id],
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

