import instance from "../../interseptore/Interceptor";


export const addMultiAcc = async (id) => {
  try {
    let url = "https://taharahimycode.liara.run/multiAccount/add";
    const response = await instance.post(url, id);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getMultiAcc = async (id) => {
  try {
    let url = "https://taharahimycode.liara.run/multiAccount/all";

    const set = { accId: `${id}` };
    console.log(set);
    const response = await instance.get(url);

    return response;
  } catch (error) {
    console.log(error);
  }
};