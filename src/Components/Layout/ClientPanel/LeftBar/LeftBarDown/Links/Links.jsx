import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Input } from "@nextui-org/react";
import { ProfileStep1 } from "../../../../../../Core/Services/Api/Client/Profile";
import { useSelector } from "react-redux";

const Links = () => {
  // Validation schema
  const validationSchema = Yup.object({
    telegram: Yup.string()
      .url("لینک تلگرام معتبر وارد کنید")
      .required("لطفا لینک تلگرام خود را وارد کنید"),
    linkedin: Yup.string()
      .url("لینک لینکدین معتبر وارد کنید")
      .required("لطفا لینک لینکدین خود را وارد کنید"),
  });

  const CourseListItem = useSelector(
    (state) => state.ClientInfoSlice.ClientInfo
  );

  const onSubmit = async (val) => {
    const date = "2004-07-17T00:00:00";

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

    const res = await ProfileStep1(data);
  };

  const dark = useSelector((state) => state.darkMood);

  return (
    <Formik
      initialValues={{
        linkedin: CourseListItem.linkdinProfile || "",
        telegram: CourseListItem.telegramLink || "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form
          style={{ background: dark.bgHigh, color: dark.textHigh }}
          className="w-[50%] max-md:w-full h-full p-[2vw] flex flex-col gap-y-[1vw] max-md:gap-y-[20px]"
        >
          <div className="flex flex-col gap-y-[0.5vw] ">
            <label>تلگرام</label>
            <Field name="telegram">
              {({ field }) => (
                <Input
                  {...field}
                  fullWidth
                  placeholder="لینک تلگرام خود را وارد کنید"
                  className={` ${dark.input}`}
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
                  fullWidth
                  placeholder="لینک لینکدین خود را وارد کنید"
                  className={`${dark.input}`}
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
            radius="md"
            className={`w-[30%] h-[14%] max-h-14  text-white max-md:h-[10%]
              ${dark.selectedButton === 0 ? "bg-blue-600" : ""}
              ${dark.selectedButton === 1 ? "bg-green-600" : ""}
              ${dark.selectedButton === 2 ? "bg-yellow-600" : ""}
              ${dark.selectedButton === 3 ? "bg-red-600" : ""}
              `}
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
