import React, { useState } from "react";
import {
  Modal,
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const FileCropModal = ({ formik }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cropper, setCropper] = useState(null);

  const handleInputChange = (event) => {
    const files = event.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result); // تصویر به صورت base64
        setIsOpen(true); // باز کردن مودال کراپ
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleCrop = () => {
    if (cropper) {
      const croppedDataUrl = cropper.getCroppedCanvas().toDataURL();
      const byteString = atob(croppedDataUrl.split(",")[1]);
      const mimeString = croppedDataUrl
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const file = new File([blob], "cropped-image.png", { type: mimeString });

      // آپدیت مقدار فایل در formik
      formik.setFieldValue("files", [file]);
      setIsOpen(false); // بستن مودال
      setSelectedImage(null); // ریست کردن انتخاب تصویر
    }
  };

  return (
    <>
      {/* ورودی فایل */}
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        style={{ display: "none" }}
        id="file-input"
      />
      <label htmlFor="file-input">
        <Button as="span">انتخاب فایل</Button>
      </label>

      {/* مودال کراپ */}
      <Modal
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(false)}
        size="3xl"
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader>برش تصویر</ModalHeader>
          <ModalBody>
            {selectedImage && (
              <Cropper
                style={{ height: 400, width: "100%" }}
                initialAspectRatio={1}
                src={selectedImage}
                viewMode={1}
                guides={true}
                cropBoxResizable={true}
                cropBoxMovable={true}
                responsive={true}
                autoCropArea={1}
                onInitialized={(instance) => setCropper(instance)}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setIsOpen(false)}
            >
              لغو
            </Button>
            <Button color="primary" onPress={handleCrop}>
              تایید
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FileCropModal;
