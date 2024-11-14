import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import React from "react";
import { Button } from '@nextui-org/react';
import { useSelector } from "react-redux";

const AddCommentForm = ({ onSubmit, userId, newsId, parentId, setRepleyModal }) => {
  const validationSchema = Yup.object({
    Title: Yup.string()
      .min(7, "عنوان باید حداقل 7 حرف باشد")
      .required("عنوان اجباری است"),
    Desc: Yup.string()
      .min(10, "دیدگاه باید حداقل 10 حرف باشد")
      .required("دیدگاه اجباری است"),
  });

  const dark = useSelector((state) => state.darkMood);

  return (
    <Formik
      initialValues={{
        PODId: `${newsId}`,
        Title: "",
        Desc: "",
        UserName: "mehdi",
        File: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/df2abcf3-0c0e-4b0d-bced-86c3a3d6bf8e/dg08eso-d59e1506-e048-4bc8-b2ce-6e21f13a6a2c.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RmMmFiY2YzLTBjMGUtNGIwZC1iY2VkLTg2YzNhM2Q2YmY4ZVwvZGcwOGVzby1kNTllMTUwNi1lMDQ4LTRiYzgtYjJjZS02ZTIxZjEzYTZhMmMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-V3Eho2OHQyZAS19kGBRvLBz6R3GtlUPS4PLzi_X2pw",
        IsAccept: true,
        UserId: `${8888}`,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
        setRepleyModal(false);
      }}
    >
      {({ errors, touched }) => (
        <Form className="w-full h-max px-4 mt-4 mb-4 max-md:p-4">
          <div className="mb-4">
            <Field
              placeholder="عنوان دیدگاه خود را وارد کنید"
              type="text"
              name="Title"
              style={{ background: dark.bgLow, color: dark.textHigh }}
              className={` border outline-none  border-[#C4CDD5] w-full md:w-full h-10  max-md:w-full  max-md:h-[10%]  rounded-md  mb-2 ${
                errors.Title && touched.Title ? "border-red-500" : ""
              }`}
            />
            <ErrorMessage
              name="Title"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <Field
              as="textarea"
              name="Desc"
              placeholder="دیدگاه خود را وارد کنید"
              style={{ background: dark.bgLow, color: dark.textHigh }}
              className={`max-md:max-h-[160px] max-md:h-[160px] max-md:min-h-[160px] max-h-[14vw] outline-none min-h-[14vw] p-2  border border-[#C4CDD5] w-full h-32 rounded-md ${
                errors.Desc && touched.Desc ? "border-red-500" : ""
              }`}
            />
            <ErrorMessage
              name="Desc"
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
