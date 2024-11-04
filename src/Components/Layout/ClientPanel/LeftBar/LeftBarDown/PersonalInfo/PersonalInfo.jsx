import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, Button, Progress, Textarea } from "@nextui-org/react";

import Gauge from "./ComplitingCircle";
import { ProfileStep1 } from "../../../../../../Core/Services/Api/Client/Profile";
import { useSelector } from "react-redux";

const PersonalInfo = () => {
  const [step, setStep] = useState(0);
  const [input,setInput]=useState("")
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
  const onSubmit =async (val)=>{
    console.log(val)
    const res = ProfileStep1(val)
  }
const dark = useSelector((state) => state.darkMood);

  

  return (
    <div
      style={{ background: dark.bgHigh, color: dark.textHigh }}
      className="flex justify-center overflow-hidden w-[100%] h-full max-md:overflow-auto"
    >
      <div className=" p-6 rounded-lg shadow-lg flex space-x-6 w-full h-full max-md:flex-col-reverse ">
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
            onSubmit(values);
            // console.log(values);
            // alert("اطلاعات با موفقیت ذخیره شد!");
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
                      className={dark.input}
                      {...field}
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
                  setStep(20);
                }}
                className="col-span-2"
              >
                <label className="block mb-[0.5vw] mr-[0.3vw]">درباره من</label>
                <Field name="about">
                  {({ field }) => (
                    <Textarea
                      className={dark.input}
                      {...field}
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
                      {...field}
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
                  {({ field }) => (
                    <Input className={dark.input} {...field} type="date" />
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
                  <Field type="radio" name="gender" value="true" />
                  مرد
                </label>
                <label className="flex gap-x-[0.5vw]">
                  <Field type="radio" name="gender" value="false" />
                  زن
                </label>
              </div>

              <div className="max-md:col-span-2">
                <label className="block mb-[0.5vw] mr-[0.3vw]">ایمیل</label>
                <Field name="email">
                  {({ field }) => (
                    <Input
                      className={dark.input}
                      {...field}
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
              <div className="col-span-2 flex justify-end mt-4 ">
                <Button
                  className={`text-white ${
                    dark.selectedButton === 0 ? "bg-blue-600" : ""
                  } 
                  ${dark.selectedButton === 1 ? "bg-green-600" : ""} 
                  ${dark.selectedButton === 2 ? "bg-yellow-600" : ""}`}
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
            <Gauge value={step} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;

// import React, { useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { Input, Button, Textarea } from "@nextui-org/react";
// import { DatePicker } from "zaman";
// import persian from "react-date-object/calendars/persian"; // وارد کردن تقویم شمسی
// import persian_fa from "react-date-object/locales/persian_fa"; // وارد کردن زبان فارسی برای تقویم
// import "react-multi-date-picker/styles/colors/purple.css"; // استایل پیش‌فرض تقویم
// import Gauge from "./ComplitingCircle";
// import { ProfileStep1 } from "../../../../../../Core/Services/Api/Client/Profile";

// const PersonalInfo = () => {
//   const [step, setStep] = useState(0);
//   const [birthday, setBirthday] = useState(null);
//   const validationSchema = Yup.object({
//     firstName: Yup.string().required("نام را وارد کنید"),
//     lastName: Yup.string().required("نام خانوادگی را وارد کنید"),
//     about: Yup.string(),
//     nationalCode: Yup.string().required("کد ملی را وارد کنید"),
//     phone: Yup.string().required("شماره همراه را وارد کنید"),
//     birthDate: Yup.string().required("تاریخ تولد را وارد کنید"),
//     email: Yup.string()
//       .email("ایمیل معتبر وارد کنید")
//       .required("ایمیل را وارد کنید"),
//     address: Yup.string(),
//   });

//   const onSubmit = async (val) => {
//     val["birthDate"]=birthday;
//     console.log(birthday);
//     console.log(val);
//     const res = ProfileStep1(val);
//   };

//   return (
//     <div className="flex justify-center overflow-hidden h-full">
//       <div className="bg-white p-6 rounded-lg shadow-lg flex space-x-6 w-full h-full">
//         <div className="mb-[0.5vw]">
//           <DatePicker
//             // value={values.birthDate} // مقدار فعلی تاریخ
//             calendar={persian} // استفاده از تقویم شمسی
//             locale={persian_fa} // تنظیم زبان فارسی
//             // onsubmit={(el) => console.log(el)}
//             // setFieldValue(
//             //   "birthDate",
//             //   date?.format?.("YYYY/MM/DD")
//             // )
//             onChange={(el) => console.log(el)}

//             // render={(value, openCalendar) => {
//             //   return (
//             //     <Input
//             //       value={value}
//             //       onClick={openCalendar}
//             //       placeholder="تاریخ تولد را انتخاب کنید"
//             //     />
//             //   );
//             // }}
//           />
//         </div>
//         <Formik
//           initialValues={{
//             firstName: "",
//             lastName: "",
//             about: "",
//             nationalCode: "",
//             phone: "",
//             birthDate: null,
//             gender: null,
//             email: "",
//             address: "",
//           }}
//           validationSchema={validationSchema}
//           onSubmit={(values) => {
//             onSubmit(values);
//             // console.log(values);
//             // alert("اطلاعات با موفقیت ذخیره شد!");
//           }}
//         >
//           {({ handleSubmit, setFieldValue, values }) => (
//             <Form
//               onSubmit={handleSubmit}
//               className="overflow-auto w-[65%] pl-[4vw] grid grid-cols-2 gap-4"
//             >
//               <div>
//                 <label className="block mb-[0.5vw] mr-[0.3vw]">نام</label>
//                 <Field name="firstName">
//                   {({ field }) => (
//                     <Input {...field} placeholder="نام خود را وارد کنید" />
//                   )}
//                 </Field>
//                 <ErrorMessage
//                   name="firstName"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>

//               <div
//                 onChange={() => {
//                   setStep(1);
//                 }}
//               >
//                 <label className="block mb-[0.5vw] mr-[0.3vw]">
//                   نام خانوادگی
//                 </label>
//                 <Field name="lastName">
//                   {({ field }) => (
//                     <Input
//                       {...field}
//                       placeholder="نام خانوادگی خود را وارد کنید"
//                     />
//                   )}
//                 </Field>
//                 <ErrorMessage
//                   name="lastName"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>

//               <div
//                 onChange={() => {
//                   setStep(2);
//                 }}
//                 className="col-span-2"
//               >
//                 <label className="block mb-[0.5vw] mr-[0.3vw]">درباره من</label>
//                 <Field name="about">
//                   {({ field }) => (
//                     <Textarea
//                       {...field}
//                       placeholder="چند جمله درباره خود وارد کنید"
//                     />
//                   )}
//                 </Field>
//               </div>

//               <div>
//                 <label className="block mb-[0.5vw] mr-[0.3vw]">کد ملی</label>
//                 <Field name="nationalCode">
//                   {({ field }) => (
//                     <Input {...field} placeholder="کد ملی خود را وارد کنید" />
//                   )}
//                 </Field>
//                 <ErrorMessage
//                   name="nationalCode"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>

//               <div
//                 onChange={() => {
//                   setStep(3);
//                 }}
//               >
//                 <label className="block mb-[0.5vw] mr-[0.3vw]">
//                   شماره همراه
//                 </label>
//                 <Field name="phone">
//                   {({ field }) => (
//                     <Input
//                       {...field}
//                       placeholder="شماره همراه خود را وارد کنید"
//                     />
//                   )}
//                 </Field>
//                 <ErrorMessage
//                   name="phone"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>

//               {/* تاریخ تولد */}
//               <div>
//                 <label className=" block mb-[0.5vw] mr-[0.3vw]">
//                   تاریخ تولد
//                 </label>
//                 <DatePicker className="bg-white" onChange={(e)=>{setBirthday(e.value)}}/>
//                 {
                
//                 /* <Field name="birthDate">
//                   {() => (
//                     <div className="mb-[0.5vw]">
//                       <DatePicker
//                         value={values.birthDate} // مقدار فعلی تاریخ
//                         calendar={persian} // استفاده از تقویم شمسی
//                         locale={persian_fa} // تنظیم زبان فارسی
                       
//                         onsubmit={el=>console.log(el)}
//                           // setFieldValue(
//                           //   "birthDate",
//                           //   date?.format?.("YYYY/MM/DD")
//                           // )
                        
//                         render={(value, openCalendar) => {
//                           return (
//                             <Input
//                               value={value}
//                               onClick={openCalendar}
//                               placeholder="تاریخ تولد را انتخاب کنید"
//                             />
//                           );
//                         }}
//                       />
//                     </div>
//                   )}
//                 </Field> */}
//                 <ErrorMessage
//                   name="birthDate"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>

//               <div
//                 onChange={() => {
//                   setStep(4);
//                 }}
//                 className="flex items-center gap-x-[1vw]"
//               >
//                 <label>جنسیت :</label>
//                 <label className="flex gap-x-[0.5vw]">
//                   <Field type="radio" name="gender" value="true" />
//                   مرد
//                 </label>
//                 <label className="flex gap-x-[0.5vw]">
//                   <Field type="radio" name="gender" value="false" />
//                   زن
//                 </label>
//               </div>

//               <div>
//                 <label className="block mb-[0.5vw] mr-[0.3vw]">ایمیل</label>
//                 <Field name="email">
//                   {({ field }) => (
//                     <Input {...field} placeholder="ایمیل خود را وارد کنید" />
//                   )}
//                 </Field>
//                 <ErrorMessage
//                   name="email"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>

//               <div
//                 onChange={() => {
//                   setStep(5);
//                 }}
//                 className="col-span-2"
//               >
//                 <label className="block mb-[0.5vw] mr-[0.3vw]">
//                   آدرس سکونت
//                 </label>
//                 <Field name="address">
//                   {({ field }) => (
//                     <Textarea
//                       {...field}
//                       placeholder="آدرس سکونت خود را وارد کنید"
//                     />
//                   )}
//                 </Field>
//                 <ErrorMessage
//                   name="address"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>

//               <div className="col-span-2 flex justify-end mt-4">
//                 <Button type="submit" color="warning" auto>
//                   اعمال تغییرات
//                 </Button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//         <div className="flex items-start justify-end w-1/2">
//           <div className="w-[40%] mt-[4vw] ml-[4vw]">
//             <Gauge value={step} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PersonalInfo;
