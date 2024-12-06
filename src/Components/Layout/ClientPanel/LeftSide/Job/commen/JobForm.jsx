import React, { useState } from "react";
import { Modal, Button, Input, ModalHeader, ModalBody, useDisclosure, ModalContent, ModalFooter, Checkbox } from "@nextui-org/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "moment/locale/fa"; // import locale
import moment from "moment-jalaali"; // import moment-jalaali
import { useSelector } from "react-redux";
import DatePicker from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import toast from "react-hot-toast";
import { createJob } from "../../../../../../Core/Services/Api/Client/Job";
import { useQueryClient } from "react-query";


const JobSchema = Yup.object().shape({
  jobTitle: Yup.string().required("وارد کردن عنوان شغل الزامی است"),
  aboutJob: Yup.string().required("وارد کردن توضیحات درباره شغل الزامی است"),
  companyWebSite: Yup.string()
    // .url("آدرس وبسایت نامعتبر است")
    .required("وارد کردن آدرس وبسایت الزامی است"),
  companyLinkdin: Yup.string()
    // .url("آدرس لینکدین نامعتبر است")
    .required("وارد کردن آدرس لینکدین الزامی است"),
  workStartDate: Yup.date().optional("وارد کردن تاریخ شروع کار الزامی است"),
  workEndDate: Yup.date().optional("وارد کردن تاریخ پایان کار الزامی است"),
  inWork: Yup.boolean(),
  companyName: Yup.string().required("وارد کردن نام شرکت الزامی است"),
});

const JobForm = () => {
    const dark = useSelector((state) => state.darkMood);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [selectedDate1, setSelectedDate1] = useState(null);
    const [selectedDate2, setSelectedDate2] = useState(null);
    const queryClient = useQueryClient();
    const convertTimestampToMiladi = (timestamp) => {
      // تبدیل timestamp به تاریخ میلادی
      const miladiDate = new Date(timestamp).toISOString().split("T")[0]; // تاریخ به فرمت YYYY-MM-DD
      return miladiDate;
    };
    const onSubmit = async (values) => {
      const data = {
        jobTitle: `${values.jobTitle}`,
        aboutJob: `${values.aboutJob}`,
        companyWebSite: `${values.companyWebSite}`,
        companyLinkdin: `${values.companyLinkdin}`,
        workStartDate: `${convertTimestampToMiladi(selectedDate1)}`,
        workEndDate: `${convertTimestampToMiladi(selectedDate2)}`,
        inWork: values.inWork,
        companyName: `${values.companyName}`,
      };
      try {
        await createJob(data);
        queryClient.invalidateQueries("getJobList");
        toast.success("اطلاعات با موفقیت ذخیره شد!");
        onClose()

      } catch (error) {
        toast.error("خطا در ذخیره اطلاعات!");
      }
    };


  return (
    <div>
      <Button onPress={onOpen}>ثبت مورد جدید</Button>
      <Modal
        style={{ background: dark.bgHigh, color: dark.textHigh }}
        size="4xl"
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "blur",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-3">
                سابقه شغلی
              </ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={{
                    jobTitle: "",
                    aboutJob: "",
                    companyWebSite: "",
                    companyLinkdin: "",
                    workStartDate: "",
                    workEndDate: "",
                    inWork: false,
                    companyName: "",
                  }}
                  validationSchema={JobSchema}
                  onSubmit={(values) => {
                    onSubmit(values);
                    // console.log(values);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="grid grid-cols-8 gap-8">
                      <div className="col-span-4">
                        <Field name="jobTitle">
                          {({ field }) => (
                            <Input
                              {...field}
                              clearable
                              bordered
                              className={dark.input}
                              fullWidth
                              label="عنوان شغل"
                              //   placeholder="عنوان شغل"
                              size="lg"
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          className="text-red-500 text-[12px] mt-2"
                          name="jobTitle"
                          component="div"
                        />
                      </div>

                      <div className="col-span-4">
                        <Field name="aboutJob">
                          {({ field }) => (
                            <Input
                              {...field}
                              clearable
                              bordered
                              className={dark.input}
                              fullWidth
                              label="توضیحات شغل"
                              //   placeholder="توضیحات شغل"
                              size="lg"
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          className="text-red-500  text-[12px] mt-2"
                          name="aboutJob"
                          component="div"
                        />
                      </div>

                      <div className="col-span-4">
                        <Field name="companyWebSite">
                          {({ field }) => (
                            <Input
                              {...field}
                              clearable
                              bordered
                              fullWidth
                              className={dark.input}
                              label="وبسایت شرکت"
                              //   placeholder="وبسایت شرکت"
                              size="lg"
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          className="text-red-500 text-[12px] mt-2"
                          name="companyWebSite"
                          component="div"
                        />
                      </div>

                      <div className="col-span-4">
                        <Field name="companyLinkdin">
                          {({ field }) => (
                            <Input
                              {...field}
                              clearable
                              bordered
                              fullWidth
                              className={dark.input}
                              label="لینکدین شرکت"
                              //   placeholder="لینکدین شرکت"
                              size="lg"
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          className="text-red-500 text-[12px] mt-2"
                          name="companyLinkdin"
                          component="div"
                        />
                      </div>

                      <div className="col-span-3">
                        <Field name="workStartDate">
                          {({ field }) => (
                            <DatePicker
                              value={selectedDate1}
                              onChange={setSelectedDate1}
                              calendar={persian}
                              fullWidth
                              className={
                                dark.selectedButton === 2
                                  ? "yellow"
                                  : dark.selectedButton === 1
                                  ? "green"
                                  : dark.selectedButton === 3
                                  ? "red"
                                  : null
                              }
                              style={{
                                background: dark.bgHigh,
                                color: dark.textHigh,
                              }}
                              locale={persian_fa}
                              render={(value, openCalendar) => (
                                <Input
                                  readOnly
                                  value={value} // نمایش تاریخ انتخاب شده
                                  onClick={openCalendar} // باز کردن تقویم
                                  className={dark.input}
                                  fullWidth
                                  clearable
                                  bordered
                                  label="تاریخ شروع کار"
                                  size="lg"
                                />
                              )}
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          className="text-red-500 text-[12px] mt-2"
                          name="workStartDate"
                          component="div"
                        />
                      </div>

                      <div className="col-span-3">
                        <Field name="workEndDate">
                          {({ field }) => (
                            <DatePicker
                              value={selectedDate2}
                              onChange={setSelectedDate2}
                              calendar={persian}
                              fullWidth
                              className={
                                dark.selectedButton === 2
                                  ? "yellow"
                                  : dark.selectedButton === 1
                                  ? "green"
                                  : dark.selectedButton === 3
                                  ? "red"
                                  : null
                              }
                              style={{
                                background: dark.bgHigh,
                                color: dark.textHigh,
                              }}
                              locale={persian_fa}
                              render={(value, openCalendar) => (
                                <Input
                                  readOnly
                                  value={value} // نمایش تاریخ انتخاب شده
                                  onClick={openCalendar} // باز کردن تقویم
                                  className={dark.input}
                                  clearable
                                  bordered
                                  fullWidth
                                  label="تاریخ پایان کار"
                                  //   placeholder="YYYY-MM-DD"
                                  size="lg"
                                />
                              )}
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          className="text-red-500 text-[12px] mt-2"
                          name="workEndDate"
                          component="div"
                        />
                      </div>
                      <div className="col-span-2  flex items-center">
                        <Field name="inWork" type="checkbox">
                          {({ field }) => (
                            <Checkbox
                              {...field}
                              className={dark.input}
                              checked={field.value}
                              size="sm"
                            >
                              در حال کار
                            </Checkbox>
                          )}
                        </Field>
                        <ErrorMessage
                          className="text-red-500 text-[12px] mt-2"
                          name="inWork"
                          component="div"
                        />
                      </div>
                      <div className="col-span-8">
                        <Field name="companyName">
                          {({ field }) => (
                            <Input
                              className={dark.input}
                              {...field}
                              clearable
                              bordered
                              fullWidth
                              label="نام شرکت"
                              //   placeholder="نام شرکت"
                              size="lg"
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          className="text-red-500 text-[12px] mt-2"
                          name="companyName"
                          component="div"
                        />
                      </div>

                      <div className="col-span-8">
                        <Button
                          className={dark.input}
                          type="submit"
                          disabled={isSubmitting}
                          shadow
                          auto
                          fullWidth
                        >
                          ارسال
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  بستن
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default JobForm;
