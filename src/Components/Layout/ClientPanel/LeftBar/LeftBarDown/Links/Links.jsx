import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Input } from "@nextui-org/react";
import { ProfileGet, ProfileStep2 } from "../../../../../../Core/Services/Api/Client/Profile";


// Validation schema
const validationSchema = Yup.object().shape({
  telegram: Yup.string()
    // .url("لینک تلگرام معتبر وارد کنید")
    .required("لطفا لینک تلگرام خود را وارد کنید"),
  linkedin: Yup.string()
    // .url("لینک لینکدین معتبر وارد کنید")
    .required("لطفا لینک لینکدین خود را وارد کنید"),
});

const onSubmit = async (val) => {
  console.log(val);
  const res = ProfileStep2(val);
};


// useEffect(()=>{
//   const getProfile=async ()=>{
//     const res = await ProfileGet();
//     console.log(res)
//   }
//     getProfile()
// },[])

const Links = () => {
  return (
    <Formik
      initialValues={{ telegram: "", linkedin: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values)
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
            <ErrorMessage className="text-red-500 text-[0.7vw]" name="telegram" component="div" />
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
