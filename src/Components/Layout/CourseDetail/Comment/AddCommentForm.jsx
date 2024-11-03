import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import React from "react";
import { useSelector } from "react-redux";

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
const dark = useSelector((state) => state.darkMood);
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
        <Form className="w-full h-max px-[2vw] max-md:p-4 mt-[1vw] mb-[2vw] ">
          <div className="mb-[1vw]">
            <Field
              placeholder="عنوان دیدگاه خود را وارد کنید"
              type="text"
              name="Title"
              style={{ background: dark.bgHigh, color: dark.textLow }}
              className={` border-[0.1vw]   border-[#C4CDD5] w-1/2 max-md:w-full  max-md:h-[10%]  rounded-md h-[2vw]mb-[1vw] ${
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
              style={{ background: dark.bgHigh, color: dark.textLow }}
              className={`max-h-[14vw] max-md:max-h-[160px] max-md:h-[160px] max-md:min-h-[160px] min-h-[14vw] p-[0.5vw]  border-[0.15vw]  border-[#C4CDD5] w-full h-[9.58vw] rounded-md ${
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
            style={{ background: dark.bgHigh, color: dark.textLow }}
            className="mt-[0.7vw] rounded-md  cursor-pointer w-[6.61vw] max-md:w-[30%] max-md:h-[30px] h-[1.82vw] leading-[0.8vw]"
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
