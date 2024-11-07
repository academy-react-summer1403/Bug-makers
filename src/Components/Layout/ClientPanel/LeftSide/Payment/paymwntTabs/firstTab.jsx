import { isToday, today } from "@internationalized/date";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setPayment } from "../../../../../../Core/Services/Api/Client/Profile";
import FacturePeyment from "./FacturePeyment";
import { useNavigate } from "react-router-dom";

const PaymentFirstStep = ()=>{
    const [paymentId,setPaymentId]=useState(null)
    const price = Math.floor(10000 + Math.random() * 90000);
    const [date,setDate] = useState()
    const [open,setOpen] = useState(false)   

const navigate = useNavigate()

 const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // ماه از 0 شروع می‌شود، پس 1 اضافه می‌کنیم
  const day = String(today.getDate()).padStart(2, "0");

  const date2 = `${year}-${month}-${day}`;
  setDate(date2)
};

useEffect(()=>{getTodayDate()},[])
console.log(date);
const CoursePaymentItem = useSelector((state) => state.payment.paymentList);
console.log(CoursePaymentItem);

const onsubmit = async ()=>{
  setOpen(true);

  const data = {
    courseId: CoursePaymentItem.courseId,
    price: price,
    PeymentDate: date,
    PaymentInvoiceNumber:price
  };
  const res = await setPayment(data)
  setPaymentId(res)
  setTimeout(() => {
    navigate(`Payment/PaymentSecoundTab/:${res.id}`);
  }, 1000);
}
const dark = useSelector((state) => state.darkMood);

    return (
      <div
        style={{ background: dark.bgHigh, color: dark.textHigh }}
        className="w-full h-full  flex justify-center items-center"
      >
        <div
          style={{ background: dark.bgLow, color: dark.text }}
          className={`z-20 absolute top-[11%] h-[87%] w-[77%]  ${
            open == true ? "block" : "hidden"
          }`}
        >
          <FacturePeyment
            corseId={"be071479-2131-ef11-b6c8-c6ea51a59bbe"}
            id={"0e651b96-5198-ef11-b6e7-9ae1b6d917d9"}
          />
        </div>
        <div className="flex flex-col justify-start gap-y-6 items-start p-[1vw] w-[50%] text-center h-[60%] rounded-2xl shadow-xl border border-gray-300 ">
          <span className="text-[1.6vw] ">مشخصات دوره</span>

          <span className="text-[1.2vw]">{CoursePaymentItem.courseTitle}</span>

          <span>تاریخ امروز : {date}</span>

          <span>{price} تومان</span>

          <Button
            onClick={() => {
              onsubmit();
            }}
          >
            پرداخت
          </Button>
        </div>
      </div>
    );
}
export default PaymentFirstStep