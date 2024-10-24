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

    id.telegram
      ? formData.append("TelegramLink", id.telegram)
      : "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://t.me/varzesh3&ved=2ahUKEwiJlNeQr6eJAxUm48kDHXXJHpwQFnoECBYQAw&usg=AOvVaw2ymPXxyfd7EBHui8oJjzOX";
    id.linkedin
      ? formData.append("LinkdinProfile", id.linkedin)
      : "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://t.me/varzesh3&ved=2ahUKEwiJlNeQr6eJAxUm48kDHXXJHpwQFnoECBYQAw&usg=AOvVaw2ymPXxyfd7EBHui8oJjzOX";
      
      
    if (id.longitude) {
      formData.append("Longitude", id.longitude);
    }
    if (id.latitude) {
      formData.append("Latitude", id.latitude);
    }  
      
      
      
      console.log(formData);
  const response = await instance.put(url,  formData );

  return response;
};


export const ProfileGet = async () => {
  let url = "/SharePanel/GetProfileInfo";

  const response = await instance.get(url);

  return response;
};

export const setProfilePic = async (id) => {
  let url = "/SharePanel/AddProfileImage";
  const formData = new FormData();
    formData.append("formFile", id);
    
  console.log(formData);
  const response = await instance.post(url, formData);

  return response;
};


export const delProfilePic = async (id) => {
  let url = "/SharePanel/DeleteProfileImage";
  const formData = new FormData();
  formData.append("DeleteEntityId", id);

  console.log(formData);
  const response = await instance.delete(url, { data: formData });

  return response;
};

export const selectCurentProfilePic = async (id) => {
  let url = "/SharePanel/SelectProfileImage";
  const formData = new FormData();
    formData.append("ImageId", id);
    
  console.log(formData);
  const response = await instance.post(url, formData);

  return response;
};


