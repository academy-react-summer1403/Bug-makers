import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import React from "react";
import { Button } from '@nextui-org/react';
import { useSelector } from "react-redux";

const AddCommentForm = ({ onSubmit, userId, newsId, parentId, setRepleyModal }) => {
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(7, "عنوان باید حداقل 7 حرف باشد")
      .required("عنوان اجباری است"),
    describe: Yup.string()
      .min(10, "دیدگاه باید حداقل 10 حرف باشد")
      .required("دیدگاه اجباری است"),
  });

  const dark = useSelector((state) => state.darkMood);

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
        <Form
          style={{ background: dark.bgHigh, color: dark.textHigh }}
          className="w-full h-max px-4 mt-4 mb-4 max-md:p-4"
        >
          <div className="mb-4">
            <Field
              placeholder="عنوان دیدگاه خود را وارد کنید"
              type="text"
              name="title"
              style={{ background: dark.bgLow, color: dark.textHigh }}
              className={` border outline-none  border-[#C4CDD5] w-full md:w-full h-10  max-md:w-full  max-md:h-[10%]  rounded-md  mb-2 ${
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
              style={{ background: dark.bgLow, color: dark.textHigh }}
              className={`max-md:max-h-[160px] max-md:h-[160px] max-md:min-h-[160px] max-h-[14vw] outline-none min-h-[14vw] p-2  border border-[#C4CDD5] w-full h-32 rounded-md ${
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
            className="mt-2 max-md:w-[30%] max-md:h-[30px] rounded-md bg-[#C4CDD5] cursor-pointer w-full md:w-1/4 h-10 leading-5"
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
