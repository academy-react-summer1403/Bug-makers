import instance from "../../interseptore/Interceptor";

export const getPayment = async () => {
  try {
    let url = "/CoursePayment/StudentUserPayList";
    const response = await instance.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};
