import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import React from "react";

const AddCommentForm = ({ onSubmit, newsId, parentId, onSubmit2, setRepleyModal }) => {
  // Define validation schema using Yup
  const validationSchema = Yup.object({
    Title: Yup.string()
      .min(7, "عنوان باید حداقل 7 حرف باشد")
      .required("عنوان اجباری است"),
    Describe: Yup.string()
      .min(10, "دیدگاه باید حداقل 10 حرف باشد")
      .required("دیدگاه اجباری است"),
  });

  return (
    <Formik
      initialValues={{
        Title: "",
        Describe: "",
        CourseId: `${newsId}`,
        ...(parentId && { CommentId: `${parentId}` }), // Add CommentId if parentId is present
      }}
      validationSchema={validationSchema} // Attach validation schema
      onSubmit={(values, { resetForm }) => {
        parentId ? onSubmit(values) : onSubmit2(values);
        resetForm(); // Reset the form fields
        setRepleyModal(false); // Close the modal
      }}
    >
      {({ errors, touched }) => (
        <Form className="w-full h-max px-[2vw] mt-[1vw] mb-[2vw]">
          <div className="mb-[1vw]">
            <Field
              placeholder="عنوان دیدگاه خود را وارد کنید"
              type="text"
              name="Title"
              className={`bg-white border-[0.1vw] text-gray-600 border-[#C4CDD5] w-1/2 h-[2vw] rounded-[0.57vw] mb-[1vw] ${
                errors.Title && touched.Title ? "border-red-500" : ""
              }`}
            />
            <ErrorMessage
              name="Title"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-[1vw]">
            <Field
              as="textarea"
              name="Describe"
              placeholder="دیدگاه خود را وارد کنید"
              className={`max-h-[14vw] min-h-[14vw] p-[0.5vw] bg-white border-[0.15vw] text-gray-600 border-[#C4CDD5] w-full h-[9.58vw] rounded-[0.57vw] ${
                errors.Describe && touched.Describe ? "border-red-500" : ""
              }`}
            />
            <ErrorMessage
              name="Describe"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <button
            className="mt-[0.7vw] rounded-[0.42vw] bg-[#C4CDD5] cursor-pointer w-[6.61vw] h-[1.82vw] leading-[0.8vw]"
            type="submit"
          >
            ثبت نظر
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddCommentForm;
