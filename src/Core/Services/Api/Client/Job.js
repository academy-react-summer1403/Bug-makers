import instance from "../../interseptore/Interceptor";

export const getJobList = async () => {
  try {
    let url = `/SharePanel/GetMyJobHistories`;

    const response = await instance.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createJob = async (data) => {
  try {
    let url = `/SharePanel/CreateJobHistory`;

    const response = await instance.post(url,data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateJob = async (data) => {
  try {
    let url = `/SharePanel/UpdateJobHistory`;

    const response = await instance.post(url,data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteJob = async (id) => {
  try {
    let url = `/SharePanel/DeleteJobHistory?HistoryId=${id}`;
    const response = await instance.delete(url);

    return response;
  } catch (error) {
    console.log(error);
  }
};

