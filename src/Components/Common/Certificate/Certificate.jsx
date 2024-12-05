import React from "react";
import { toPng } from "html-to-image";
import { useSelector } from "react-redux";

const Certificate = ({ name, course, date }) => {
  const handleDownload = () => {
    const certificateElement = document.getElementById("certificate-wrapper");
    toPng(certificateElement)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "certificate.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("خطا در دانلود گواهینامه:", err);
      });
  };

  const dark = useSelector((state) => state.darkMood);

  return (
    <div
      style={{ background: dark.bgHigh, color: dark.textHigh }}
      className="w-full mx-auto shadow-md rounded-lg p-6 text-center font-sans border border-gray-300"
    >
      <div
        id="certificate-wrapper"
        className={`p-6 ${dark.bgHigh == "#ffffff" ? "bg-white" : "bg-[#111]"}`}
        style={{ borderRadius: "0.5rem" }}
      >
        <div id="certificate" className="p-1">
          <h2 className="text-2xl font-bold mb-4">گواهینامه دوره</h2>
          <p className=" mb-6">بدین‌وسیله تأیید می‌شود که</p>
          <h1 className="text-3xl font-bold  mb-2">{name}</h1>
          <p className=" mb-6">
            با موفقیت دوره را با نشان‌دادن درک تئوری <br />
            از موضوع
          </p>
          <h2 className="text-2xl font-bold mb-6">{course}</h2>
          <div className="flex justify-between items-center mt-8">
            <div>
              <div className="bg-yellow-400 text-white rounded-full py-1 px-4 font-semibold">
                دوره تکمیل شد
              </div>
            </div>
            <p className="">تاریخ : {date}</p>
          </div>
          <div className="mt-8">
            <p className="text-gray-600">محمد حسن بحرالعلومی</p>
            <p className="text-gray-400 text-sm">مدیر عامل</p>
          </div>
        </div>
      </div>
      <button
        onClick={handleDownload}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
      >
        دانلود گواهینامه
      </button>
    </div>
  );
};

export default Certificate;
