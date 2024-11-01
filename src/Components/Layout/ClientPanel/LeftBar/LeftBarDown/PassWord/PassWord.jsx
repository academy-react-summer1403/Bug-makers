import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Button, Input } from "@nextui-org/react";
import { ProfileStep1, updatePassword } from "../../../../../../Core/Services/Api/Client/Profile";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const PassWord = () => {
  const validation = yup.object().shape({
    oldPassword: yup.string().required("این فیلد اجباریست"),
    newPassword: yup.string().required("این فیلد اجباریست"),
    newPassword2: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "رمزها باید مطابقت داشته باشند")
      .required("این فیلد اجباریست"),
  });

  const CourseListItem = useSelector(
    (state) => state.ClientInfoSlice.ClientInfo
  );

  const onSubmit = async (val) => {
    // let data = {
    //   firstName: `${CourseListItem.fName}`,
    //   lastName: `${CourseListItem.lName}`,
    //   about: `${CourseListItem.userAbout}`,
    //   nationalCode: `${CourseListItem.nationalCode}`,
    //   phone: `${CourseListItem.phoneNumber}`,
    //   birthDate: CourseListItem.birthDay,
    //   gender: CourseListItem.gender,
    //   email: `${CourseListItem.email}`,
    //   address: `${CourseListItem.homeAdderess}`,
    //   latitude: CourseListItem.latitude,
    //   longitude: CourseListItem.longitude,
    //   linkedin: `${CourseListItem.linkdinProfile}`,
    //   telegram: `${CourseListItem.telegramLink}`,
    //   receiveMessageEvent:val
    // };
    console.log(CourseListItem);
    console.log(val);
    const res = await updatePassword(val);
    if (res.StatusCode == 400) {
      toast.error(
        "لطفا رمز عبور فعلی مربوطه به کاربر خود را به درستی وارد نمایید."
      );
    } else {
      toast(res.message);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        oldPassword: "",
        newPassword: "",
      }}
      validationSchema={validation}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="w-[50%] max-md:w-full h-full p-[2vw] flex flex-col items-start gap-y-[1vw] max-md:gap-y-[20px] overflow-auto">
          <div className="flex  flex-col max-md:items-center w-full items-start justify-start h-full gap-y-2">
            <span className="text-[#8E8E8E] text-[1vw] max-md:text-[16px]">
              تغییر رمز عبور
            </span>
            <Field name="oldPassword">
              {({ field }) => (
                <Input
                  className="max-h-[20%] mt-[2%]"
                  {...field}
                  label="رمز قدیمی"
                  img="../../../../../public/images/Login/lock.png"
                  onBlur={(e) => setFieldValue("newPassword", e.target.value)}
                />
              )}
            </Field>
            <ErrorMessage
              name="oldPassword"
              component={"span"}
              className="text-red-600 text-[80%] my-[0px]"
            />
            <Field name="newPassword">
              {({ field }) => (
                <Input
                  className="max-h-[20%] mt-[2%]"
                  {...field}
                  label="رمز جدید"
                  img="../../../../../public/images/Login/lock.png"
                  onBlur={(e) => setFieldValue("newPassword", e.target.value)}
                />
              )}
            </Field>
            <ErrorMessage
              name="newPassword"
              component={"p"}
              className="text-red-600 text-[80%]"
            />
            <Field name="newPassword2">
              {({ field }) => (
                <Input
                  className="max-h-[20%] mt-[2%]"
                  {...field}
                  label="تکرار رمز جدید"
                  img="../../../../../public/images/Login/lock.png"
                  onBlur={(e) => {
                    setFieldValue("newPassword2", e.target.value);
                    if (values.newPassword !== e.target.value) {
                      toast.error("رمزها باید مطابقت داشته باشند");
                    }
                  }}
                />
              )}
            </Field>
            <ErrorMessage
              name="newPassword2"
              component="div"
              className="text-red-500 text-[80%]"
            />
            <button
              type="submit"
              className="min-h-[50px] max-md:text-[16px] mt-[2%] text-white bg-[#E1C461] rounded-[0.6vw] max-md:rounded-xl w-[30%] max-md:w-full h-[12%] text-[0.83vw] leading-[1.46vw] p-0 m-0"
            >
              تایید رمز جدید
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PassWord;
