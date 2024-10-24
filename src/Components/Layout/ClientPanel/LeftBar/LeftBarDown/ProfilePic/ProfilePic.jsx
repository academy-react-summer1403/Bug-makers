import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { delProfilePic } from "../../../../../../Core/Services/Api/Client/Profile";

const ProfilePic = () => {
  const CourseListItem = useSelector(
    (state) => state.ClientInfoSlice.ClientInfo
  );


  // State to hold images
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectPic, setSelectPic] = useState(0);
  const [mainImageId, setMainImageId] = useState(null); // State for main image

  // Formik setup
  const formik = useFormik({
    initialValues: {
      files: [],
    },
    onSubmit: (values) => {
      console.log("Uploaded images: ", values.files);
    },
  });

  // useEffect to update images when CourseListItem changes
  useEffect(() => {
    if (CourseListItem.userImage) {
      console.log(CourseListItem.userImage);
      const initialImages = CourseListItem.userImage.map((img) => ({
        id: img.id,
        inserDate: img.inserDate,
        pictureName: img.pictureName,
        puctureAddress: img.puctureAddress,
      }));
      console.log(initialImages);
      setImages(initialImages); // Update the images state
      
    }
  }, [CourseListItem.userImage]); // Dependency array to run effect when userImage changes

  console.log(images);
  const handleImageClick = (id) => {
    setSelectedImage(id);
  };

  const handleImageDelete = (id) => {
    const res = delProfilePic(id)
    setImages(images.filter((image) => image.id !== id));
    if (selectedImage === id) {
      setSelectedImage(null);
    }
    if (mainImageId === id) {
      setMainImageId(null); // Reset main image if deleted
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newImages = Array.from(files).map((file, index) => ({
      id: images.length + index + 1,
      pictureAddress: URL.createObjectURL(file),
    }));

    setImages([...images, ...newImages]);
    formik.setFieldValue("files", [...formik.values.files, ...files]);
  };

  const handleSetMainImage = (id) => {
    setMainImageId(id); // Set main image
    setSelectPic(0); // Close the selection menu
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-wrap w-[100%] h-[24vw]  p-[1.5vw] gap-[1vw] overflow-auto cursor-pointer">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative rounded-[1vw] h-[45%] w-[10vw]"
          >
            <div className="duration-300 rounded-full size-[1.5vw] bg-white absolute top-[0.2vw] right-[0.2vw] flex items-center justify-center cursor-pointer">
              <svg
                onClick={() => {
                  setSelectPic(image.id);
                }}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.25 3.75C11.25 3.05964 10.6903 2.5 10 2.5C9.30967 2.5 8.75 3.05964 8.75 3.75C8.75 4.44036 9.30967 5 10 5C10.6903 5 11.25 4.44036 11.25 3.75Z"
                  stroke="black"
                  strokeWidth="1.5"
                />
                <path
                  d="M11.25 10C11.25 9.30967 10.6903 8.75 10 8.75C9.30967 8.75 8.75 9.30967 8.75 10C8.75 10.6903 9.30967 11.25 10 11.25C10.6903 11.25 11.25 10.6903 11.25 10Z"
                  stroke="black"
                  strokeWidth="1.5"
                />
                <path
                  d="M11.25 16.25C11.25 15.5597 10.6903 15 10 15C9.30967 15 8.75 15.5597 8.75 16.25C8.75 16.9403 9.30967 17.5 10 17.5C10.6903 17.5 11.25 16.9403 11.25 16.25Z"
                  stroke="black"
                  strokeWidth="1.5"
                />
              </svg>
              <div
                className={`duration-300 absolute z-30 top-[0vw] right-[0vw] w-[8vw] h-[5vw] bg-white rounded-[0.5vw] p-[0.5vw] flex-col justify-between ${
                  selectPic === image.id ? "flex" : "hidden"
                }`}
              >
                <div
                  onClick={() => handleSetMainImage(image.id)} // Set main image
                  className="w-full h-[40%] flex justify-between items-center text-[0.7vw] font-[600]"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                      stroke="#17C964"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 12.5L10.5 15L16 9"
                      stroke="#17C964"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>انتخاب عکس اصلی</span>
                </div>
                <hr />
                <div
                  onClick={() => {
                    handleImageDelete(image.id);
                    setSelectPic(0);
                  }}
                  className="w-full h-[40%] flex justify-start gap-x-[0.5vw] items-center text-[0.7vw] font-[600] text-[#FF5454]"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                      stroke="#FF5454"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28334 9.80562 2.34016 9.71803 2.40391C9.32729 2.69601 9.10104 3.16443 8.64918 4.10283L7.94434 5.5"
                      stroke="#FF5454"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span>حذف عکس</span>
                </div>
              </div>
            </div>
            <img
              className={`rounded-[1vw] h-full w-full object-cover ${
                selectedImage === image.id ? "border-2 border-[#FF5454]" : ""
              } ${mainImageId === image.id ? "border-2 border-green-500" : ""}`}
              src={image.puctureAddress}
              alt={`${image.puctureAddress}`}
              onClick={() => handleImageClick(image.id)}
            />
          </div>
        ))}
        <div className="w-[15%] h-[45%] flex flex-col gap-y-[0.5vw] justify-center items-center border-[0.1vw] border-[#E1C461] rounded-[0.5vw]">
          <label htmlFor=" file-upload">
            <Button auto className="bg-[#E7E7E7] hover:bg-gray-300" size="lg">
              اضافه کردن عکس
            </Button>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            multiple
            id="file-upload"
            className="hidden"
          />
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29.3327 8.99996C29.8849 8.99996 30.3327 8.55224 30.3327 7.99996C30.3327 7.44768 29.8849 6.99996 29.3327 6.99996V8.99996ZM18.666 6.99996C18.1137 6.99996 17.666 7.44768 17.666 7.99996C17.666 8.55224 18.1137 8.99996 18.666 8.99996V6.99996ZM24.9993 2.66663C24.9993 2.11435 24.5516 1.66663 23.9993 1.66663C23.4471 1.66663 22.9993 2.11435 22.9993 2.66663H24.9993ZM22.9993 13.3333C22.9993 13.8856 23.4471 14.3333 23.9993 14.3333C24.5516 14.3333 24.9993 13.8856 24.9993 13.3333H22.9993ZM29.3327 6.99996H23.9993V8.99996H29.3327V6.99996ZM23.9993 6.99996H18.666V8.99996H23.9993V6.99996ZM22.9993 2.66663V7.99996H24.9993V2.66663H22.9993ZM22.9993 7.99996V13.3333H24.9993V7.99996H22.9993Z"
              fill="#E1C461"
            />
            <path
              d="M15.3327 4C9.36156 4 6.376 4 4.521 5.85499C2.66602 7.70999 2.66602 10.6955 2.66602 16.6667C2.66602 22.6377 2.66602 25.6233 4.521 27.4784C6.376 29.3333 9.36156 29.3333 15.3327 29.3333C21.3037 29.3333 24.2894 29.3333 26.1444 27.4784C27.9994 25.6233 27.9993 22.6377 27.9993 16.6667V16"
              stroke="#E1C461"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M2.66602 18.8473C3.49138 18.7274 4.3258 18.6682 5.16163 18.6703C8.69755 18.5955 12.1469 19.6973 14.8941 21.779C17.442 23.7095 19.2323 26.3666 19.9993 29.3334"
              stroke="#E1C461"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <path
              d="M28 22.5283C26.4328 21.7345 24.8117 21.3317 23.1816 21.3335C20.7127 21.3237 18.2687 22.2311 16 24"
              stroke="#E1C461"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
          </svg>
          <Button auto className="bg-[#E7E7E7] hover:bg-gray-300" size="sm">
            تایید کردن عکس
          </Button>
          <span className="text-[0.7vw] text-gray-500">
            اندازه فریم ( 236*236 )
          </span>
        </div>
      </div>
    </form>
  );
};

export default ProfilePic;
