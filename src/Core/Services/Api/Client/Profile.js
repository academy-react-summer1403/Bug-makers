import toast from "react-hot-toast";
import ShamsiToISO from "../../../../Components/Common/TimeChanger/ShamsiToIso";
import instance from "../../interseptore/Interceptor";

export const ProfileStep1 = async (id) => {
try {
  let url = "/SharePanel/UpdateProfileInfo";
  const formData = new FormData();
  formData.append("FName", id.firstName);
  formData.append("LName", id.lastName);
  formData.append("UserAbout", id.about);
  formData.append("NationalCode", id.nationalCode);
  // formData.append("CourseFavoriteId", id.phone);
  console.log(id.birthDate);
  formData.append("BirthDay", id.birthDate);
  formData.append("Gender", id.gender);
  // formData.append("CourseFavoriteId", id.email);
  formData.append("HomeAdderess", id.address);
  if (id.telegram != null) {
    formData.append("TelegramLink", id.telegram);
  }
  if (id.linkedin != null) {
    formData.append("LinkdinProfile", id.linkedin);
  }
  if (id.receiveMessageEvent != null) {
    formData.append("ReceiveMessageEvent", id.receiveMessageEvent);
  }
  if (id.longitude) {
    formData.append("Longitude", id.longitude);
  }
  if (id.latitude) {
    formData.append("Latitude", id.latitude);
  }
  console.log(formData);
  const response = await instance.put(url, formData);
  toast.success("عملیات موفقییت امیز بود 🫡")
  return response;
} catch (error) {
  console.log(error);
}
};


export const ProfileGet = async () => {
  try {
    let url = "/SharePanel/GetProfileInfo";
    const response = await instance.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const setProfilePic = async (id) => {
  try {
    let url = "/SharePanel/AddProfileImage";
    const formData = new FormData();
    formData.append("formFile", id);

    const response = await instance.post(url, formData);
    return response;
  } catch (error) {
    console.log(error);
  }
};


export const delProfilePic = async (id) => {
try {
  let url = "/SharePanel/DeleteProfileImage";
  const formData = new FormData();
  formData.append("DeleteEntityId", id);
  const response = await instance.delete(url, { data: formData });
  toast.success("عملیات موفقیت امیز بود 🫡")
  return response;
} catch (error) {
  console.log(error);
}
};

export const selectCurentProfilePic = async (id) => {
try {
  let url = "/SharePanel/SelectProfileImage";
  const formData = new FormData();
  formData.append("ImageId", id);
  const response = await instance.post(url, formData);

  return response;
} catch (error) {
  console.log(error);
}
};

export const updatePassword = async (id) => {
try {
  let url = "/SharePanel/ChangePassword";
  const response = await instance.post(url, id);
  return response;
} catch (error) {
  console.log(error);
}
};

export const setPayment = async (id) => {
try {
  let url = "/CoursePayment/StudentAddPeyment";
  const formData = new FormData();
  formData.append("CourseId", id.courseId);
  formData.append("Paid", id.price);
  formData.append("PeymentDate", id.PeymentDate);
  formData.append("PaymentInvoiceNumber", id.PaymentInvoiceNumber);
  const response = await instance.post(url, formData);
  toast.success("ممنون ازت حالا بریم مرحله بعد 😎")
  return response;
} catch (error) {
  console.log(error);
}
};


export const setPaymentStep2 = async (id) => {
  try {
    let url = "/CoursePayment/StudentAddPeymentImage";
    console.log(id);
    const response = await instance.post(url, id);
    toast.success("ممنون از اینکه پرداخت رو تکمیل کردی ❤️")
    return response;
  } catch (error) {
    console.log(error);
  }
};



export const setSqurity = async (id) => {
try {
  let url = "/SharePanel/EditSecurity";
  const data = {
    twoStepAuth: id.twoStepAuth,
    recoveryEmail: `${id.recoveryEmail}`,
    baseUrl: "http://localhost:5173/acceptGmail",
  };
  const response = await instance.put(url, data);
  toast.success("تغیراتت ثبت شد 😊")
  return response;
} catch (error) {
  console.log(error);
}
};

export const getSqurity = async () => {
  try {
    let url = "/SharePanel/GetSecurityInfo";
    const response = await instance.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const gmailVerifiy = async (id) => {
  try {
    let url = `/SharePanel/ChangeRecovery/:${id}`;
    console.log(url);
    const response = await instance.get(url);

    return response;
  } catch (error) {
    console.log(error);
  }
};