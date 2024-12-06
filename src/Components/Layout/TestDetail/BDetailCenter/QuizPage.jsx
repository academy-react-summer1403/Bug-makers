import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import * as Yup from "yup";
import { postTestAnswer } from "../../../../Core/Services/Api/TestDetail/TestDeatil";
import { getItem } from "../../../../Core/Services/common/storage.services";
import toast from "react-hot-toast";
import Certificate from "../../../Common/Certificate/Certificate";
import convertToJalali from "../../../Common/TimeChanger/TimeToShamsi";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";

const QuizPage = ({ data, response ,id}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [timeLeft, setTimeLeft] = useState(response?.time * 60); // زمان به ثانیه (5 دقیقه)
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [persent,setPersent]=useState()

  // کاهش تایمر
  useEffect(() => {
    if (timeLeft > 0 && isTestStarted && !isQuizOver) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsQuizOver(true); // آزمون تمام شده
    }
  }, [timeLeft, isTestStarted, isQuizOver]);

  // فرمت زمان
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // اعتبارسنجی فرم
  const validationSchema = Yup.object(
    data.reduce((schema, question) => {
      schema[`q${question.id}`] = Yup.string().required(
        "لطفاً یک گزینه را انتخاب کنید"
      );
      return schema;
    }, {})
  );

  const userId = getItem("userId");
  const handleSubmit = async (values) => {
    console.log(id)
    // تبدیل پاسخ‌ها به فرمت مورد نظر
    const formattedResponse = {
      UserId: `${userId}`,
      Time: response?.time, // زمان سپری‌شده به دقیقه
      examId: `${id}`,
      tests: Object.entries(values).map(([key, value]) => ({
        id: key.slice(1), // حذف 'q' از کلید برای گرفتن id تست
        option: value,
      })),
    };

    console.log("پاسخ‌های ارسال شده:", formattedResponse);

    // ارسال به تابع postTestAnswer
    const res = await postTestAnswer(formattedResponse);
    setPersent(res.data.data.Percent)
    toast.success(`${res.data.data.Percent}%`);
    
    setIsQuizOver(true);
  };

  const handleRetry = () => {
    setIsQuizOver(false);
    setTimeLeft(response?.time*60);
    setIsTestStarted(false);
  };
  const today = new Date();
  const isoDate = today.toISOString();
  const CourseListItem = useSelector(
    (state) => state.ClientInfoSlice.ClientInfo
  );

 const dark = useSelector((state) => state.darkMood);
  return (
    <div
      style={{ background: dark.bgHigh, color: dark.textHigh }}
      className="min-h-screen w-full bg-red-600 flex flex-col items-center p-6 rtl"
    >
      <div className="w-full  shadow-md rounded-lg p-6">
        <div className="w-full ">
          <div className="flex-wrap flex justify-between mb-2">
            <div className="flex flex-col max-md:max-w-[100%] gap-y-2 max-w-[80%]">
              <h1 className="text-2xl font-bold mb-2 text-right">
                {response?.title ? (
                  response?.title
                ) : (
                  <Skeleton height={`100%`} width={`150px`} />
                )}
              </h1>
            </div>
            <div className="mb-4 text-lg font-semibold text-right">
              زمان باقی‌مانده:{" "}
              <span className="text-red-500">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="text-gray-600 mb-4 block text-right">
            {response.Desc ? (
              response.Desc
            ) : (
              <div className="mb-4 w-[100%]">
                <Skeleton height={30} width={`60%`} />
                <Skeleton height={30} width={`80%`} />
                <Skeleton height={30} width={`90%`} />
              </div>
            )}
          </div>
        </div>

        <div className="w-full min-w-[100%] my-8 border border-[#aaa]"></div>

        {!isTestStarted ? (
          <div className="flex flex-col items-center">
            <button
              onClick={() => setIsTestStarted(true)}
              className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg"
            >
              شروع آزمون
            </button>
          </div>
        ) : (
          <Formik
            initialValues={data.reduce((values, question) => {
              values[`q${question.id}`] = "";
              return values;
            }, {})}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="grid grid-cols-1 gap-6">
                  {data.map((question) => (
                    <div key={question.id}>
                      <p className="text-xl max-md:text-lg font-bold text-right mb-2">
                        {question.question}؟
                      </p>
                      <div className="flex flex-col items-start gap-y-1">
                        <label className="block text-right w-full">
                          <Field
                            type="radio"
                            name={`q${question.id}`}
                            value={question.op1}
                            disabled={isQuizOver}
                            className="ml-2"
                          />
                          {question.op1}
                        </label>
                        <label className="block text-right w-full">
                          <Field
                            type="radio"
                            name={`q${question.id}`}
                            value={question.op2}
                            disabled={isQuizOver}
                            className="ml-2"
                          />
                          {question.op2}
                        </label>
                        <label className="block text-right w-full">
                          <Field
                            type="radio"
                            name={`q${question.id}`}
                            value={question.op3}
                            disabled={isQuizOver}
                            className="ml-2"
                          />
                          {question.op3}
                        </label>
                        <label className="block text-right w-full">
                          <Field
                            type="radio"
                            name={`q${question.id}`}
                            value={question.op4}
                            disabled={isQuizOver}
                            className="ml-2"
                          />
                          {question.op4}
                        </label>
                      </div>
                      {errors[`q${question.id}`] &&
                        touched[`q${question.id}`] && (
                          <p className="text-red-500 text-sm text-right">
                            {errors[`q${question.id}`]}
                          </p>
                        )}
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className={`w-full py-2 px-4 mt-6 rounded-lg text-white font-bold ${
                    isQuizOver
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  disabled={isQuizOver}
                >
                  {isQuizOver ? "آزمون تمام شد" : "ارسال پاسخ‌ها"}
                </button>
              </Form>
            )}
          </Formik>
        )}

        <div className="w-full flex justify-center gap-x-4 p-2 ">
          {isQuizOver && (
            <div className="flex justify-center">
              <button
                onClick={handleRetry}
                className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg"
              >
                تلاش مجدد
              </button>
            </div>
          )}
          {persent == 100 ? (
            <Button onPress={onOpen}>گواهینامه ازمون </Button>
          ) : null}
        </div>
      </div>
      <div className="w-full flex items-center justify-center ">
        <Modal
          style={{ background: dark.bgHigh, color: dark.textHigh }}
          backdrop="opaque"
          isOpen={isOpen}
          size="4xl"
          onOpenChange={onOpenChange}
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              },
              exit: {
                y: -20,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: "easeIn",
                },
              },
            },
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  گواهینامه ازمون
                </ModalHeader>
                <ModalBody>
                  <Certificate
                    name={
                      CourseListItem
                        ? CourseListItem?.fName + CourseListItem?.lName
                        : "mehdi asadi"
                    }
                    course={response?.title + `  سطح ${response.Level}`}
                    date={convertToJalali(isoDate)}
                  />
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
    </div>
  );
};

export default QuizPage;
