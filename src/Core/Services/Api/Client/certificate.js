import axios from "axios";
import { getItem } from "../../common/storage.services";
const userId = getItem("userId")

export const getUserTest = async () => {
  try {

    let url = `https://taharahimycode.liara.run/Exam/userByUserId/${userId}`;
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

