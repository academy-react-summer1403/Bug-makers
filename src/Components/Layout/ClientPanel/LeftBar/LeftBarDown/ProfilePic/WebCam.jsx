import React, { useState } from "react";
import Webcam from "react-webcam";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  Modal,
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import toast from "react-hot-toast";

const WebcamModal = ({ handleFileChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [cropper, setCropper] = useState(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const handleFileUpload = () => {
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

      if (handleFileChange) {
        console.log(file);
        handleFileChange([file]); // ارسال فایل به تابع props
      }

      setIsOpen(false); // بستن مودال
      resetModal(); // ریست کردن وضعیت
    }
  };

  const handleRetake = () => {
    setCapturedImage(null); // حذف عکس گرفته شده
    setIsCameraActive(true); // فعال کردن دوباره دوربین
  };

  const resetModal = () => {
    setCapturedImage(null);
    setCroppedImage(null);
    setIsCameraActive(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
    resetModal(); // ریست کردن وضعیت هنگام بستن مودال
  };

  return (
    <div>
      <span className="block mb-8 text-center text-[22px] max-md:hidden">
        گرفتن عکس
      </span>

      <Button onPress={() => setIsOpen(true)}>باز کردن دوربین</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={handleModalClose}
        size="5xl"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="mr-8">گرفتن عکس</ModalHeader>
              <ModalBody>
                {isCameraActive ? (
                  <Webcam
                    audio={false}
                    height={720}
                    screenshotFormat="image/png"
                    width={1280}
                    videoConstraints={videoConstraints}
                  >
                    {({ getScreenshot }) => (
                      <Button
                        onClick={() => {
                          const imageSrc = getScreenshot();
                          setCapturedImage(imageSrc); // ذخیره عکس گرفته شده
                          setIsCameraActive(false); // غیرفعال کردن دوربین
                        }}
                      >
                        گرفتن عکس
                      </Button>
                    )}
                  </Webcam>
                ) : capturedImage ? (
                  <div>
                    <Cropper
                      style={{ height: 400, width: "100%" }}
                      initialAspectRatio={1}
                      src={capturedImage}
                      viewMode={1}
                      guides={true}
                      cropBoxResizable={true}
                      cropBoxMovable={true}
                      responsive={true}
                      autoCropArea={1}
                      onInitialized={(instance) => setCropper(instance)}
                    />
                    <div className="flex justify-between mt-4">
                      <Button onPress={handleRetake} color="warning">
                        دوباره
                      </Button>
                      <Button onPress={handleFileUpload} color="primary">
                        تایید
                      </Button>
                    </div>
                  </div>
                ) : null}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  بستن
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default WebcamModal;
