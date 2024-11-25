import instance from "../../interseptore/Interceptor";

export const getUserNotif = async () => {
  try {
    let url = `/Notification/UserNotificationList`;

    const response = await instance.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getNotifMessageList = async () => {
  try {
    let url = `/Notification/NotificationMessageList`;

    const response = await instance.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postReedNotif = async (id) => {
  try {
    let url = `/Notification/UserNotificationRead`;

    const response = await instance.post(url, { entityId : id});
    return response;
  } catch (error) {
    console.log(error);
  }
};