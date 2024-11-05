import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, Input, Spacer } from "@nextui-org/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PaymentSecoundTab = () => {
const {id} =useParams()
    const CoursePaymentItem = useSelector((state) => state.payment.paymentList);
    console.log(CoursePaymentItem);
  // تابعی برای ارسال فرم به API
  const handleSubmit = async (values) => {
    
    const formData = new FormData();
    formData.append("Image", values.file);
    formData.append("PaymentId", id);

    const res = await setPaymentStep2(formData);
  };
const dark = useSelector((state) => state.darkMood);
  return (
    <Formik initialValues={{ file: null }} onSubmit={handleSubmit}>
      {({ setFieldValue, isSubmitting }) => (
        <Form
          style={{ background: dark.bgHigh, color: dark.textHigh }}
          className="p-[2%]"
        >
          <Field name="file">
            {({ field }) => (
              <Input
                {...field}
                type="file"
                onChange={(event) => {
                  setFieldValue("file", event.currentTarget.files[0]);
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
            {isSubmitting ? "Uploading..." : "Upload File"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PaymentSecoundTab;
