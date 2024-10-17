import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, Button, Progress, Textarea } from "@nextui-org/react";

import Gauge from "./ComplitingCircle";

const PersonalInfo = () => {

    const [step,setStep]=useState(0)
  // اسکیمای اعتبارسنجی با Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required("نام را وارد کنید"),
    lastName: Yup.string().required("نام خانوادگی را وارد کنید"),
    about: Yup.string(),
    nationalCode: Yup.string().required("کد ملی را وارد کنید"),
    phone: Yup.string().required("شماره همراه را وارد کنید"),
    birthDate: Yup.date().required("تاریخ تولد را وارد کنید"),
    email: Yup.string()
      .email("ایمیل معتبر وارد کنید")
      .required("ایمیل را وارد کنید"),
    address: Yup.string(),
  });

  return (
    <div className="flex justify-center overflow-hidden h-full">
      <div className="bg-white p-6 rounded-lg shadow-lg flex space-x-6 w-full h-full">
        {/* فرم اطلاعات حساب */}
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            about: "",
            nationalCode: "",
            phone: "",
            birthDate: "",
            gender: "",
            email: "",
            address: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            alert("اطلاعات با موفقیت ذخیره شد!");
          }}
        >
          {({ handleSubmit }) => (
            <Form
              onSubmit={handleSubmit}
              className="overflow-auto w-[65%] pl-[4vw] grid grid-cols-2 gap-4"
            >
              {/* فیلدهای فرم */}
              <div>
                <label className="block mb-[0.5vw] mr-[0.3vw]">نام</label>
                <Field name="firstName">
                  {({ field }) => (
                    <Input {...field} placeholder="نام خود را وارد کنید" />
                  )}
                </Field>
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div
                onChange={() => {
                  setStep(1);
                }}
              >
                <label className="block mb-[0.5vw] mr-[0.3vw]">
                  نام خانوادگی
                </label>
                <Field name="lastName">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder="نام خانوادگی خود را وارد کنید"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div
                onChange={() => {
                  setStep(2);
                }}
                className="col-span-2"
              >
                <label className="block mb-[0.5vw] mr-[0.3vw]">درباره من</label>
                <Field name="about">
                  {({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="چند جمله درباره خود وارد کنید"
                    />
                  )}
                </Field>
              </div>

              <div>
                <label className="block mb-[0.5vw] mr-[0.3vw]">کد ملی</label>
                <Field name="nationalCode">
                  {({ field }) => (
                    <Input {...field} placeholder="کد ملی خود را وارد کنید" />
                  )}
                </Field>
                <ErrorMessage
                  name="nationalCode"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div
                onChange={() => {
                  setStep(3);
                }}
              >
                <label className="block mb-[0.5vw] mr-[0.3vw]">
                  شماره همراه
                </label>
                <Field name="phone">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder="شماره همراه خود را وارد کنید"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block mb-[0.5vw] mr-[0.3vw]">
                  تاریخ تولد
                </label>
                <Field name="birthDate">
                  {({ field }) => <Input {...field} type="date" />}
                </Field>
                <ErrorMessage
                  name="birthDate"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div
                onChange={() => {
                  setStep(4);
                }}
                className="flex items-center gap-x-[1vw]"
              >
                <label>جنسیت :</label>
                <label className="flex gap-x-[0.5vw]">
                  <Field type="radio" name="gender" value="male" />
                  مرد
                </label>
                <label className="flex gap-x-[0.5vw]">
                  <Field type="radio" name="gender" value="female" />
                  زن
                </label>
              </div>

              <div>
                <label className="block mb-[0.5vw] mr-[0.3vw]">ایمیل</label>
                <Field name="email">
                  {({ field }) => (
                    <Input {...field} placeholder="ایمیل خود را وارد کنید" />
                  )}
                </Field>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div
                onChange={() => {
                  setStep(5);
                }}
                className="col-span-2"
              >
                <label className="block mb-[0.5vw] mr-[0.3vw]">
                  آدرس سکونت
                </label>
                <Field name="address">
                  {({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="آدرس سکونت خود را وارد کنید"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* دکمه ثبت تغییرات */}
              <div className="col-span-2 flex justify-end mt-4">
                <Button type="submit" color="warning" auto>
                  اعمال تغییرات
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        {/* وضعیت حساب */}
        <div className="flex items-start justify-end w-1/2">
          <Gauge value={step} />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
