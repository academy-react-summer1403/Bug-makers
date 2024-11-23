import instance from "../../interseptore/Interceptor";

export const getTournoment = async () => {
try {
  let url = "/Tournament/GetTournament";
  const response = await instance.get(url);
  return response;
} catch (error) {
  console.log(error);
}
};