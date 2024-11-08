import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, Input, Spacer } from "@nextui-org/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setPaymentStep2 } from "../../../../../../Core/Services/Api/Client/Profile";

const PaymentSecoundTab = () => {
  const navigate = useNavigate()
const {id} =useParams()
    const CoursePaymentItem = useSelector((state) => state.payment.paymentList);
    console.log(CoursePaymentItem);
  // تابعی برای ارسال فرم به API
  const handleSubmit = async (values) => {
    console.log(values.file[0]);
    const formData = new FormData();
    formData.append("Image", values.file[0]);
    formData.append("PaymentId", id);
    console.log(formData)
    const res = await setPaymentStep2(formData);
    console.log(res)
    setTimeout(() => {
      navigate("../../Dashbord");
    }, 2000);
  };
const dark = useSelector((state) => state.darkMood);
  return (
    <Formik initialValues={{ file: [] }} onSubmit={handleSubmit}>
      {({ setFieldValue, isSubmitting }) => (
        <Form
          style={{ background: dark.bgHigh, color: dark.textHigh }}
          className="p-[2%]"
        >
          <Field name="file">
            {({ field }) => (
              <Input
                
                type="file"
                onChange={(event) => {
                  setFieldValue("file", event.target.files);
                }}
                label="عکس فاکتور"
                className={`w-1/5 max-md:w-full ${dark.bgHigh == "#ffffff" ? "" : "dark"}`}
                
              />
            )}
          </Field>
          <Spacer y={1} />
          <Button
            type="submit"
            className={dark.bgHigh == "#ffffff" ? "" : "dark"}
            disabled={isSubmitting}
          >
            {isSubmitting ? "درحال بارگذاری..." : "بارگذاری"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PaymentSecoundTab;
