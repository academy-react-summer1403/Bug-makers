import instance from "../../interseptore/Interceptor";

export const getMyCoursesComments = async () => {
try {
  let url = `/SharePanel/GetMyCoursesComments`;

  const response = await instance.get(url);
  return response;
} catch (error) {
  console.log(error);
}
};

export const getMyNewsComments = async () => {
  try {
    let url = `/SharePanel/GetMyNewsComments`;

    const response = await instance.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};
