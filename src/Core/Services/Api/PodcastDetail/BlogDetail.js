import axios from "axios";
import instance from "../../interseptore/Interceptor";


export const getPodcastDetail = async (id, accId) => {
  let url = `https://taharahimycode.liara.run/podcast/getById/${id}/${accId}`;

  const response = await axios.get(url);
  return response;
};

export const getPodcastComment = async (id) => {
  let url = `https://taharahimycode.liara.run/podcast/comment/ByPOD/${id}`;

  const response = await axios.get(url);
  return response;
};

export const postLikePodcast = async (id, accId) => {
  let url = `https://taharahimycode.liara.run/podcast/like/AddLike/${id}/${accId}`;
  console.log(url);

  const response = await axios.post(url);
  return response;
};

export const postDissLikePodcast = async (id, accId) => {
  let url = `https://taharahimycode.liara.run/podcast/like/AddDissLike/${id}/${accId}`;
  console.log(url);

  const response = await axios.post(url);
  return response;
};

export const delLikePodcast = async (id) => {
  let url = "https://taharahimycode.liara.run/podcast/like/deleteMany";

  console.log(id);
  const response = await axios.delete(url, {
    data: {
      ids: [id],
    },
  });

  return response;
};

