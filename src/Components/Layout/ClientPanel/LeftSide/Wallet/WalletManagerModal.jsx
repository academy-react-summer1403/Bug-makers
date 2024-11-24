import React, { useEffect, useState } from "react";
import {
  Modal,
  Input,
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { Formik, Form, Field } from "formik";
import { useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { CreateWallet, getAllWallet } from "../../../../../Core/Services/Api/Client/wallet";
import { getItem } from "../../../../../Core/Services/common/storage.services";

const WalletManagerModal = ({
  isOpen,
  onOpenChange,
  setWallets,
  activeWallet,
  setActiveWallet,
  fetchWalletById,
}) => {
  const queryClient = useQueryClient();

  const dark = useSelector((state) => state.darkMood);
  const userId = getItem("userId");

  const [response, setResponse] = useState([]);

  const GetWall = async () => {
    const res = await getAllWallet();
    res
      ? setResponse(res.data.data.filter((el) => el.UserId == userId))
      : "درحال بارگذاری";
    console.log(res.data.data[7].UserId);
    console.log(`${userId}`);
  };

  useEffect(() => {
    GetWall();
  }, []);

  const handleCreateWallet = async (values, { resetForm }) => {
    const newWallet = {
      UserId: userId,
      UserName: values.name,
      Password: values.password,
    };

    const res = await CreateWallet(newWallet);
    console.log(res);
    resetForm();
    GetWall();
    onOpenChange(false); // بستن مودال
  };

  return (
    <Modal
      style={{ background: dark.bgHigh, color: dark.textHigh }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              مدیریت کیف‌پول‌ها
            </ModalHeader>
            <ModalBody>
              {/* وضعیت لودینگ */}

              <>
                <h3 className="text-lg font-semibold mb-4">
                  کیف‌پول‌های موجود:
                </h3>
                <ul className="max-h-[200px] overflow-auto mb-6">
                  {response.map((wallet) => (
                    <li
                      key={wallet.id}
                      className={`p-2 flex justify-between rounded-md cursor-pointer ${
                        activeWallet?.id === wallet.id
                          ? `${dark.selectedButton === 0 ? "bg-blue-600" : ""} 
                                ${
                                  dark.selectedButton === 1
                                    ? "bg-green-600"
                                    : ""
                                } 
                                ${
                                  dark.selectedButton === 2
                                    ? "bg-yellow-600"
                                    : ""
                                } 
                                ${
                                  dark.selectedButton === 3 ? "bg-red-600" : ""
                                }`
                          : ""
                      }`}
                      onClick={() => {
                        setActiveWallet(wallet);
                        fetchWalletById(wallet.id);
                      }}
                    >
                      <span>{wallet.UserName}</span>
                      <span>{wallet.Cost} تومان</span>
                    </li>
                  ))}
                </ul>
              </>

              {/* فرم ایجاد کیف‌پول جدید */}
              <h3 className="text-lg font-semibold mb-4">
                ایجاد کیف‌پول جدید:
              </h3>
              <Formik
                initialValues={{ name: "", password: "" }}
                onSubmit={handleCreateWallet}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Field
                      className={dark.input}
                      as={Input}
                      name="name"
                      label="نام کیف‌پول"
                      placeholder="نام کیف‌پول را وارد کنید"
                      fullWidth
                      required
                    />
                    <Field
                      className={dark.input}
                      as={Input}
                      type="password"
                      name="password"
                      label="رمز عبور"
                      placeholder="رمز عبور را وارد کنید"
                      fullWidth
                      required
                    />
                    <Button
                      type="submit"
                      className={`text-white ${
                        dark.selectedButton === 0 ? "bg-blue-600" : ""
                      } 
                      ${dark.selectedButton === 1 ? "bg-green-600" : ""} 
                      ${dark.selectedButton === 2 ? "bg-yellow-600" : ""} 
                      ${dark.selectedButton === 3 ? "bg-red-600" : ""}`}
                    >
                      ایجاد کیف‌پول
                    </Button>
                  </Form>
                )}
              </Formik>
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
  );
};

export default WalletManagerModal;
