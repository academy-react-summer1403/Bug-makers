import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button } from "@nextui-org/react";
import { useSelector } from "react-redux";

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
        img
      }));
      console.log(initialImages);
      setImages(initialImages); // Update the images state
      console.log("thissss" + images);
    }
  }, [CourseListItem.userImage]); // Dependency array to run effect when userImage changes

  const handleImageClick = (id) => {
    setSelectedImage(id);
  };

  const handleImageDelete = (id) => {
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
            key={image.img.id}
            className="relative rounded-[1vw] h-[45%] w-[10vw]"
          >
            <div className="duration-300 rounded-full size-[1.5vw] bg-white absolute top-[0.2vw] right-[0.2vw] flex items-center justify-center cursor-pointer">
              <svg
                onClick={() => {
                  setSelectPic(image.img.id);
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
                  selectPic === image.img.id ? "flex" : "hidden"
                }`}
              >
                <div
                  onClick={() => handleSetMainImage(image.img.id)} // Set main image
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
                    handleImageDelete(image.img.id);
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
                selectedImage === image.img.id
                  ? "border-2 border-[#FF5454]"
                  : ""
              } ${
                mainImageId === image.img.id ? "border-2 border-green-500" : ""
              }`}
              src={image.img.pictureAddress}
              alt="Profile"
              onClick={() => handleImageClick(image[0].id)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-start mb-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          multiple
          id="file-upload"
          className="hidden"
        />
        <label htmlFor="file-upload">
          <Button auto className="bg-[#E7E7E7] hover:bg-gray-300" size="lg">
            Upload Images
          </Button>
        </label>
      </div>
      <Button type="submit" auto className="bg-[#E7E7E7] hover:bg-gray-300">
        Submit
      </Button>
    </form>
  );
};

export default ProfilePic;
