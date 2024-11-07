
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { toPng } from 'html-to-image';
import { getCourseDetail } from '../../../../../../Core/Services/Api/CourseDetail/CourseDetail';
import { Button } from '@nextui-org/react';
import { useSelector } from 'react-redux';

const FacturePeyment = ({ corseId, id }) => {
  const elementRef = useRef(null);
  const navigate = useNavigate();
  const [image,setImage]=useState()
  const htmlToImageConvert = () => {
    // console.log(paramsData)
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        setImage(link)
        link.href = dataUrl;
        link.click();
        setTimeout(() => {
          navigate(`ClientPanel/Payment/PaymentSecoundTab/${id}`);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
console.log(image);
  const [course, setCourse] = useState();

  async function getCourseById() {
    const getApi = await getCourseDetail(corseId);
    setCourse(getApi);
  }
  useEffect(() => {
    getCourseById();
  }, []);
const dark = useSelector((state) => state.darkMood);
  return (
    <div className="h-full  max-md:w-full flex ">
      {course ? (
        <div
          id="big"
          className=" w-[50%] max-md:w-full  mx-auto my-auto inset-0"
        >
          <table
            ref={elementRef}
            style={{ background: dark.bgHigh, color: dark.textHigh }}
            class="table-auto w-full  text-xl rounded-lg dark:bg-slate-800 dark:text-white "
          >
            <tbody>
              <h1 className="text-center text-2xl font-semibold mt-2">
                رسید پرداخت
              </h1>
              <p className="text-center">اکادمی بحرالعلوم</p>
              <tr className=" flex justify-around border-t border-slate-100 dark:border-slate-900">
                <td className=" border-l-2 border-black w-6/12 text-center">
                  نام دوره :{" "}
                </td>
                <td className="w-6/12 text-center">{course.title}</td>
              </tr>
              <tr className=" flex justify-around border-t border-slate-100 dark:border-slate-900">
                <td className=" border-l-2 border-black w-6/12 text-center">
                  قیمت :{" "}
                </td>
                <td className="w-6/12 text-center">{course.cost}</td>
              </tr>
              <tr className=" flex justify-around border-t border-slate-100 dark:border-slate-900">
                <td className=" border-l-2 border-black w-6/12 text-center">
                  ایدی دوره :{" "}
                </td>
                <td className="w-6/12 text-center">{course.courseId}</td>
              </tr>
              <tr className=" flex justify-around border-t border-slate-100 dark:border-slate-900">
                <td className=" border-l-2 border-black w-6/12 text-center">
                  ظرفیت دوره :{" "}
                </td>
                <td className="w-6/12 text-center">{course.capacity}</td>
              </tr>
              <tr className=" flex justify-around border-y border-slate-100 dark:border-slate-900">
                <td className=" border-l-2 border-black w-6/12 text-center">
                  شناسه پرداخت:{" "}
                </td>
                <td className="w-6/12 text-center">545484</td>
              </tr>
              <div className="flex max-w-80 h-16 m-2">
                <button
                  className="butten1 md:w-6/12 w-full mx-auto   "
                  onClick={htmlToImageConvert}
                  type="submit"
                >
                  ادامه
                </button>
                <NavLink
                  to="/dashboard/booking"
                  className="butten2 text-center py-2  md:w-6/12 mx-auto"
                >
                  برگشت
                </NavLink>
              </div>
            </tbody>
            
          </table>
          <Button className="butten1" onClick={htmlToImageConvert}>
              download
            </Button>
        </div>
      ) : (
        "no data"
      )}
    </div>
  );
};

export default FacturePeyment;