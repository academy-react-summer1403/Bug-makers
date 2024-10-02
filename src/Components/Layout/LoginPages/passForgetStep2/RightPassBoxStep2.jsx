import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import InputModel from "../forAll/InputModel.jsx";
import * as yup from "yup";
import { ForgetPassStep3, ForgetPassStep2 } from "../../../../Core/Services/Api/auth.js";
import { useNavigate, useParams } from "react-router-dom";

const RightPassBoxStep2 = () => {
    const navigate = useNavigate();
    const { verify } = useParams();
    const [id, setId] = useState();
    const [initialValues, setInitialValues] = useState({ userId: "", newPassword: "", resetValue: "" });
    const [resetVal, setResetVal] = useState("");

    const validation = yup.object().shape({
        newPassword: yup.string().required("این فیلد اجباریست"),
        newPassword2: yup.string().oneOf([yup.ref('newPassword'), null], 'رمزها باید مطابقت داشته باشند').required("این فیلد اجباریست")
    });

    useEffect(() => {
        const handleStep2 = async () => {
            const response = await ForgetPassStep2(verify);
            setId(response.id);
            setResetVal(response.message);
        };

        handleStep2();
    }, [verify]);

    useEffect(() => {
        if (id) {
            setInitialValues({ userId: id, newPassword: "", resetValue: `${resetVal}` });
        }
    }, [id]);

    const onSubmit = async (values, actions) => {
        values.userId = id;
        const jsonString = JSON.stringify(values);
        const response = await ForgetPassStep3(JSON.parse(jsonString));
        console.log(values);
        if (response) {
            alert("رمز شما با موفقیت تغییر کرد");
            navigate("/");
        } else {
            alert("رمز شما تایید نشد دوباره امتحان کنید");
        }
        actions.resetForm({
            values: {
                userId: id,
                newPassword: "",
                resetValue: `${resetVal}`
            }
        });
    };

    return (
        <div className="w-1/2 max-sm:w-[100%]">
            <div className="mx-[6.51vw] py-[4.163vw] h-full">
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validation}
                    onSubmit={onSubmit}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <div className="flex justify-center flex-col items-center">
                                <span className="text-[#8E8E8E] text-[1vw]">رمز عبور جدید</span>
                                <hr className="w-full mt-[0.94vw]" />
                                <Field name="newPassword">
                                    {({ field }) => (
                                        <InputModel
                                            {...field}
                                            placeholder="رمز جدید خود را وارد کنید"
                                            label="رمز جدید"
                                            img="../../../../../public/images/Login/lock.png"
                                            onBlur={(e) => setFieldValue('newPassword', e.target.value)}
                                        />
                                    )}
                                </Field>
                                <Field name="newPassword2">
                                    {({ field }) => (
                                        <InputModel
                                            {...field}
                                            placeholder="رمز خود را تکرار کنید"
                                            label="تکرار رمز جدید"
                                            img="../../../../../public/images/Login/lock.png"
                                            onBlur={(e) => {
                                                setFieldValue('newPassword2', e.target.value);
                                                if (values.newPassword !== e.target.value) {
                                                    alert("رمزها باید مطابقت داشته باشند");
                                                }
                                            }}
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="resetValue" component="div" className="text-red-500" />
                                <button type="submit" className="mt-[2vw] text-white bg-green-500 rounded-[0.563vw] w-full h-[2.25vw] text-[0.83vw] leading-[1.46vw] p-0 m-0">تایید رمز جدید</button>
                                <div className="mt-[0.615vw] text-[0.833vw] h-[1.575vw] w-full flex justify-evenly items-center">
                                    <span onClick={() => navigate("/sign/login")} className="cursor-pointer hover:text-blue-400">ورود به حساب کاربری</span>
                                    <div className="h-3/4 border-[0.104vw] w-0"></div>
                                    <span onClick={() => navigate("/sign/rigester/step1")} className="cursor-pointer hover:text-blue-400">هم اکنون ثبت نام کنید</span>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default RightPassBoxStep2;
