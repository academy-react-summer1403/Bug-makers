import axios from "axios";

export const CreateImg = async (imgData) => {
  try {
    const response = await axios.post('https://api.segmind.com/v1/sdxl1.0-txt2img', imgData,{
    responseType: "arraybuffer", 
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "SG_e223471534b9e8bd"
      }
    });
    const imageBlob = new Blob([response.data], { type: "image/jpeg" });
  const fileAi = new File([imageBlob] , 'image.jpg' ,{type : "image/jpeg"})

    return fileAi;
  } catch (error) {
    console.error("Error creating image:", error);
    throw error; 
  }
};
