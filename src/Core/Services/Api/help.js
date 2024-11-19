import axios from "axios";


export const postHelpPm = async (id) => {
  let url = `https://taharahimycode.liara.run/help/TextHelpCreate/${id.id}/${id.message}`;
  console.log(url);
  console.log(id)


  const response = await axios.post(url);
  return response;
};

export const getHelpPm = async (id) => {
  let url = `https://taharahimycode.liara.run/help/HelpById/${id}`;

  const response = await axios.get(url);
  return response.data.data;
};

export const postHelpPmInChat = async (id) => {
  let url = `https://taharahimycode.liara.run/Text`;
  console.log(id);
  const data = {
    ReciveId: id.ReciveId,
    yourId: id.SenderId,
    text: `${id.text}`,
    GroupId: `${id.GroupId}`,
  };
  console.log(data);


  const response = await axios.post(url, data);
  return response;
};