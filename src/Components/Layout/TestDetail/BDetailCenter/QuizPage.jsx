import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { postTestAnswer } from "../../../../Core/Services/Api/TestDetail/TestDeatil";
import { getItem } from "../../../../Core/Services/common/storage.services";
import toast from "react-hot-toast";

const QuizPage = ({ data, response }) => {
  const [timeLeft, setTimeLeft] = useState(300); // زمان به ثانیه (5 دقیقه)
  const [isQuizOver, setIsQuizOver] = useState(false);

  // کاهش تایمر
  useEffect(() => {
    if (timeLeft > 0 && !isQuizOver) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsQuizOver(true); // آزمون تمام شده
    }
  }, [timeLeft, isQuizOver]);

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
    // تبدیل پاسخ‌ها به فرمت مورد نظر
    const formattedResponse = {
      UserId: `${userId}`,
      Time: response?.time, // زمان سپری‌شده به دقیقه
      examId: response?.id, // examId از props
      tests: Object.entries(values).map(([key, value]) => ({
        id: key.slice(1), // حذف 'q' از کلید برای گرفتن id تست
        option: value,
      })),
    };

    console.log("پاسخ‌های ارسال شده:", formattedResponse);

    // ارسال به تابع postTestAnswer
    const res = await postTestAnswer(formattedResponse);
    toast.success(`${res.data.data.Percent}%`);
    setIsQuizOver(true);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6 rtl">
      <div className="w-full  bg-white shadow-md rounded-lg p-6">
        <div className="w-full flex justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-bold mb-2 text-right">
              {response?.title}
            </h1>
            <p className="text-gray-600 mb-4 text-right">{response?.Desc}</p>
          </div>
          <div className="mb-4 text-lg font-semibold text-right">
            زمان باقی‌مانده:{" "}
            <span className="text-red-500">{formatTime(timeLeft)}</span>
          </div>
        </div>
        <div className="w-full my-8 border border-[#aaa]"></div>

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
                    <p className="text-xl font-bold text-right mb-2">
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
      </div>
    </div>
  );
};

export default QuizPage;
