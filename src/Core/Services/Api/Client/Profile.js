import ShamsiToISO from "../../../../Components/Common/TimeChanger/ShamsiToIso";
import instance from "../../interseptore/Interceptor";

export const ProfileStep1 = async (id) => {
  let url = "/SharePanel/UpdateProfileInfo";
  const formData = new FormData();
    formData.append("FName",id.firstName );
    formData.append("LName", id.lastName);
    formData.append("UserAbout", id.about);
    formData.append("NationalCode", id.nationalCode);
    // formData.append("CourseFavoriteId", id.phone);
    console.log(id.birthDate);
    formData.append("BirthDay", id.birthDate);
    formData.append("Gender", id.gender);
    // formData.append("CourseFavoriteId", id.email);
    formData.append("HomeAdderess", id.address);
  console.log(formData);
  const response = await instance.put(url,  formData );

  return response;
};

export const ProfileStep2 = async (id) => {
  let url = "/SharePanel/UpdateProfileInfo";
  const formData = new FormData();
    formData.append("TelegramLink", id.telegram);
    formData.append("LinkdinProfile", id.linkedin);
    
  console.log(formData);
  const response = await instance.put(url,  formData );

  return response;
};

export const ProfileGet = async () => {
  let url = "/SharePanel/GetProfileInfo";

  const response = await instance.get(url);

  return response;
};
