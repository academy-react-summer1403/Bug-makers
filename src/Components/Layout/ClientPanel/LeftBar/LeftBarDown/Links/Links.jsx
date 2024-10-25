import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Input } from "@nextui-org/react";
import { ProfileStep1 } from "../../../../../../Core/Services/Api/Client/Profile";
import { useSelector } from "react-redux";




// useEffect(()=>{
//   const getProfile=async ()=>{
//     const res = await ProfileGet();
//     console.log(res)
//   }
//     getProfile()
// },[])

const Links = () => {
  // Validation schema
  const validationSchema = Yup.object().shape({
    telegram: Yup.string()
      // .url("لینک تلگرام معتبر وارد کنید")
      .required("لطفا لینک تلگرام خود را وارد کنید"),
    linkedin: Yup.string()
      // .url("لینک لینکدین معتبر وارد کنید")
      .required("لطفا لینک لینکدین خود را وارد کنید"),
  });

  const CourseListItem = useSelector(
    (state) => state.ClientInfoSlice.ClientInfo

  );


  // const [lat,setLat]=useState()
  const onSubmit = async (val) => {

    const date = "2004-07-17T00:00:00";
    
    // if(CourseListItem.latitude !=null){
    //   const lat = CourseListItem.latitude
    // }
    let data = {
      firstName: `${CourseListItem.fName}`,
      lastName: `${CourseListItem.lName}`,
      about: `${CourseListItem.userAbout}`,
      nationalCode: `${CourseListItem.nationalCode}`,
      phone: `${CourseListItem.phoneNumber}`,
      birthDate: date,
      gender: CourseListItem.gender,
      email: `${CourseListItem.email}`,
      address: `${CourseListItem.homeAdderess}`,
      latitude: CourseListItem.latitude,
      longitude: CourseListItem.longitude,
      linkedin: val.linkedin,
      telegram: val.telegram,
    };
    console.log(CourseListItem);
    console.log(data);
    const res = ProfileStep1(data);
  };

  return (
    <Formik
      initialValues={{
        
        linkedin: "",
        telegram: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="w-[50%] h-full p-[2vw] flex flex-col gap-y-[1vw]">
          <div className="flex flex-col gap-y-[0.5vw]">
            <label>تلگرام</label>
            <Field name="telegram">
              {({ field }) => (
                <Input
                  {...field}
                  clearable
                  bordered
                  fullWidth
                  placeholder="لینک تلگرام خود را وارد کنید"
                  color={
                    errors.telegram && touched.telegram ? "error" : "default"
                  }
                />
              )}
            </Field>
            <ErrorMessage
              className="text-red-500 text-[0.7vw]"
              name="telegram"
              component="div"
            />
          </div>

          <div className="flex flex-col gap-y-[0.5vw]">
            <label>لینکدین</label>
            <Field name="linkedin">
              {({ field }) => (
                <Input
                  {...field}
                  clearable
                  bordered
                  fullWidth
                  placeholder="لینک لینکدین خود را وارد کنید"
                  color={
                    errors.linkedin && touched.linkedin ? "error" : "default"
                  }
                />
              )}
            </Field>
            <ErrorMessage
              className="text-red-500 text-[0.7vw]"
              name="linkedin"
              component="div"
            />
          </div>

          <Button
            radius="full"
            className="w-[20%] h-[2.5vw] bg-[#E1C461]"
            type="submit"
            color="warning"
          >
            اعمال تغییرات
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Links;
