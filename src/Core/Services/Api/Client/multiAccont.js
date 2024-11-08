import instance from "../../interseptore/Interceptor";


export const addMultiAcc = async (id) => {
  let url = "https://taharahimycode.liara.run/multiAccount/add";

  const response = await instance.post(url, id);

  return response;
};