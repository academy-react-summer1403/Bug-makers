import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, Button, Progress, Textarea } from "@nextui-org/react";

import Gauge from "./ComplitingCircle";
import { ProfileStep1 } from "../../../../../../Core/Services/Api/Client/Profile";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import DatePicker from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import convertToJalali from "../../../../../Common/TimeChanger/TimeToShamsi";

const PersonalInfo = () => {
  
  const dark = useSelector((state) => state.darkMood);

  
const CourseListItem = useSelector((state) => state.ClientInfoSlice.ClientInfo);


const validationSchema = Yup.object({
  firstName: Yup.string().required("نام را وارد کنید"),
  lastName: Yup.string().required("نام خانوادگی را وارد کنید"),
  about: Yup.string(),
  nationalCode: Yup.string().required("کد ملی را وارد کنید"),
  email: Yup.string()
    .email("ایمیل معتبر وارد کنید")
    .required("ایمیل را وارد کنید"),
  address: Yup.string(),
});
  const [step, setStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);


  const convertTimestampToMiladi = (timestamp) => {
    // تبدیل timestamp به تاریخ میلادی
    const miladiDate = new Date(timestamp).toISOString().split("T")[0]; // تاریخ به فرمت YYYY-MM-DD
    return miladiDate;
  };


  const onSubmit = async (values) => {
        const data = {
          firstName: `${values.firstName}`,
          lastName: `${values.lastName}`,
          about: `${values.about}`,
          nationalCode: `${values.nationalCode}`,
          phone: `${CourseListItem.phoneNumber}`,
          birthDate: convertTimestampToMiladi(selectedDate),
          gender: values.gender,
          email: `${CourseListItem.email}`,
          address: `${values.address}`,
          linkedin: CourseListItem.linkdinProfile,
          telegram: CourseListItem.telegramLink,
          latitude: CourseListItem.latitude,
          longitude: CourseListItem.longitude,
        };
    try {
      await ProfileStep1(data);
      toast.success("اطلاعات با موفقیت ذخیره شد!");
    } catch (error) {
      toast.error("خطا در ذخیره اطلاعات!");
    }
  };

  return (
    <div
      style={{ background: dark.bgHigh, color: dark.textHigh }}
      className="flex justify-center overflow-hidden w-[100%] h-full max-md:overflow-auto"
    >
      <div className=" p-6 rounded-lg shadow-lg flex space-x-6 w-full h-full max-md:flex-col-reverse ">
        {/* فرم اطلاعات حساب */}
        <Formik
          initialValues={{
            firstName: `${CourseListItem.fName}`,
            lastName: `${CourseListItem.lName}`,
            about: `${CourseListItem.userAbout}`,
            nationalCode: `${CourseListItem.nationalCode}`,
            phone: `${CourseListItem.phoneNumber}`,
            birthDate: CourseListItem.birthDay,
            gender: true,
            email: `${CourseListItem.email}`,
            address: `${CourseListItem.homeAdderess}`,
            linkedin: CourseListItem.linkdinProfile,
            telegram: CourseListItem.telegramLink,
            latitude: CourseListItem.latitude,
            longitude: CourseListItem.longitude,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit(values);
            // console.log(values);
          }}
        >
          {({ handleSubmit }) => (
            <Form
              onSubmit={handleSubmit}
              className="overflow-auto w-[65%] pl-[4vw] grid grid-cols-2 gap-4 max-lg:w-[90%] max-md:w-[100%] max-md:grid-cols-1 max-md:pb-[100px]"
            >
              {/* فیلدهای فرم */}
              <div className="max-md:col-span-2">
                <label className="block mb-[0.5vw] mr-[0.3vw]">نام</label>
                <Field name="firstName">
                  {({ field }) => (
                    <Input
                      defaultValue={CourseListItem.fName}
                      className={dark.input}
                      placeholder="نام خود را وارد کنید"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div
                className="max-md:col-span-2"
                onChange={() => {
                  setStep(10);
                }}
              >
                <label className="block mb-[0.5vw] mr-[0.3vw]">
                  نام خانوادگی
                </label>
                <Field name="lastName">
                  {({ field }) => (
                    <Input
                      className={dark.input}
                      defaultValue={CourseListItem.lName}
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
                  setStep(20);
                }}
                className="col-span-2"
              >
                <label className="block mb-[0.5vw] mr-[0.3vw]">درباره من</label>
                <Field name="about">
                  {({ field }) => (
                    <Textarea
                      className={dark.input}
                      defaultValue={CourseListItem.userAbout}
                      placeholder="چند جمله درباره خود وارد کنید"
                    />
                  )}
                </Field>
              </div>

              <div className="max-md:col-span-2">
                <label className="block mb-[0.5vw] mr-[0.3vw]">کد ملی</label>
                <Field name="nationalCode">
                  {({ field }) => (
                    <Input
                      className={dark.input}
                      defaultValue={CourseListItem.nationalCode}
                      placeholder="کد ملی خود را وارد کنید"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="nationalCode"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div
                className="max-md:col-span-2"
                onChange={() => {
                  setStep(30);
                }}
              >
                <label className="block mb-[0.5vw] mr-[0.3vw]">
                  شماره همراه
                </label>
                <Field name="phone">
                  {({ field }) => (
                    <Input
                      className={dark.input}
                      isDisabled
                      defaultValue={CourseListItem.phoneNumber}
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
                  {({ field }) => (
                    <DatePicker
                      value={selectedDate}
                      onChange={setSelectedDate}
                      defaultValue={convertToJalali(CourseListItem.birthDay)}
                      calendar={persian}
                      fullWidth
                      className={
                        dark.selectedButton === 2
                          ? "yellow"
                          : dark.selectedButton === 1
                          ? "green"
                          : dark.selectedButton === 3
                          ? "red"
                          : null
                      }
                      style={{ background: dark.bgHigh, color: dark.textHigh }}
                      locale={persian_fa}
                      render={(value, openCalendar) => (
                        <Input
                          readOnly
                          defaultValue={convertToJalali(
                            CourseListItem.birthDay
                          )}
                          placeholder="تاریخ تولد خود را وارد کنید"
                          value={value} // نمایش تاریخ انتخاب شده
                          onClick={openCalendar} // باز کردن تقویم
                          className={dark.input}
                          fullWidth
                        />
                      )}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="birthDate"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div
                onChange={() => {
                  setStep(40);
                }}
                className="flex items-center gap-x-[1vw]"
              >
                <label>جنسیت :</label>
                <label className="flex gap-x-[0.5vw]">
                  <Field
                    type="radio"
                    name="gender"
                    value="true"
                    defaultValue={CourseListItem.gender == true ? true : false}
                  />
                  مرد
                </label>
                <label className="flex gap-x-[0.5vw]">
                  <Field
                    type="radio"
                    name="gender"
                    value="false"
                    defaultValue={
                      CourseListItem.gender == false ? false : true
                    }
                  />
                  زن
                </label>
              </div>

              <div className="max-md:col-span-2">
                <label className="block mb-[0.5vw] mr-[0.3vw]">ایمیل</label>
                <Field name="email">
                  {({ field }) => (
                    <Input
                      className={dark.input}
                      isDisabled
                      defaultValue={CourseListItem.email}
                      placeholder="ایمیل خود را وارد کنید"
                    />
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
                  setStep(50);
                }}
                className="col-span-2"
              >
                <label className="block mb-[0.5vw] mr-[0.3vw]">
                  آدرس سکونت
                </label>
                <Field name="address">
                  {({ field }) => (
                    <Textarea
                      className={dark.input}
                      defaultValue={CourseListItem.homeAdderess}
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
              <div className="col-span-2 flex justify-end mt-4 ">
                <Button
                  className={`text-white ${
                    dark.selectedButton === 0 ? "bg-blue-600" : ""
                  } 
                  ${dark.selectedButton === 1 ? "bg-green-600" : ""} 
                  ${dark.selectedButton === 2 ? "bg-yellow-600" : ""}
                  ${dark.selectedButton === 3 ? "bg-red-600" : ""}
                  `}
                  type="submit"
                  color=""
                  auto
                >
                  اعمال تغییرات
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        {/* وضعیت حساب */}
        <div className="flex items-start justify-end w-1/2 max-md:w-full max-md:justify-center max-md:hidden">
          <div className="w-[50%] mt-[4vw] ml-[4vw] max-md:w-[70%] max-md:m-0 max-md:mb-[20px]">
            <Gauge value={CourseListItem.profileCompletionPercentage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
