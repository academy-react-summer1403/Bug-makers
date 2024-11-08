import instance from "../../interseptore/Interceptor";

export const getPayment = async () => {
  let url = "/CoursePayment/StudentUserPayList";

  const response = await instance.get(url);

  return response;
};
