import instance from "../../interseptore/Interceptor";

export const getMyCoursesComments = async () => {
  let url = `/SharePanel/GetMyCoursesComments`;

  const response = await instance.get(url);
  return response;
};

export const getMyNewsComments = async () => {
  let url = `/SharePanel/GetMyNewsComments`;

  const response = await instance.get(url);
  return response;
};
