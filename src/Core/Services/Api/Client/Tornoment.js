import instance from "../../interseptore/Interceptor";

export const getTournoment = async () => {
  let url = "/Tournament/GetTournament";

  const response = await instance.get(url);

  return response;
};