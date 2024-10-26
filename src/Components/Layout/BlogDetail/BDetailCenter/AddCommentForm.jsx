import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import React from "react";
import { Button } from '@nextui-org/react';

const AddCommentForm = ({ onSubmit, userId, newsId, parentId, setRepleyModal }) => {
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(7, "عنوان باید حداقل 7 حرف باشد")
      .required("عنوان اجباری است"),
    describe: Yup.string()
      .min(10, "دیدگاه باید حداقل 10 حرف باشد")
      .required("دیدگاه اجباری است"),
  });

  return (
    <Formik
      initialValues={
      parentId
        ? {
            title: "",
            describe: "",
            newsId: `${newsId}`,
            userIpAddress: "1.1.1.1",
            userId: `${userId}`,
            parentId: parentId,
          }
        : {
            title: "",
            describe: "",
            newsId: `${newsId}`,
            userIpAddress: "1.1.1.1",
            userId: `${userId}`,
          }
    }
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm(); 
        setRepleyModal(false); 
      }}
    >
      {({ errors, touched }) => (
        <Form className="w-full h-max px-4 mt-4 mb-4">
          <div className="mb-4">
            <Field
              placeholder="عنوان دیدگاه خود را وارد کنید"
              type="text"
              name="title"
              className={`bg-white border text-gray-600 border-[#C4CDD5] w-full md:w-full h-10 rounded-md mb-2 ${
                errors.title && touched.title ? "border-red-500" : ""
              }`}
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <Field
              as="textarea"
              name="describe"
              placeholder="دیدگاه خود را وارد کنید"
              className={`max-h-[14vw] min-h-[14vw] p-2 bg-white border text-gray-600 border-[#C4CDD5] w-full h-32 rounded-md ${
                errors.describe && touched.describe ? "border-red-500" : ""
              }`}
            />
            <ErrorMessage
              name="describe"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <Button
            className="mt-2 rounded-md bg-[#C4CDD5] cursor-pointer w-full md:w-1/4 h-10 leading-5"
            type="submit"
          >
            ثبت نظر
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddCommentForm;
