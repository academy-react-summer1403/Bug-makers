import { isToday, today } from "@internationalized/date";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setPayment } from "../../../../../../Core/Services/Api/Client/Profile";
import FacturePeyment from "./FacturePeyment";
import { useNavigate } from "react-router-dom";
import convertToJalali from "../../../../../Common/TimeChanger/TimeToShamsi";

const PaymentFirstStep = ()=>{
    const [paymentId,setPaymentId]=useState(null)

    const [open,setOpen] = useState(false)   

const navigate = useNavigate()

const CoursePaymentItem = useSelector((state) => state.payment.paymentList);
console.log(CoursePaymentItem);


// ​
// classRoomName:
// cost:
// courseGroupId: ​
// courseId:
// courseTitle
// describe
// fullName: 
// groupName: ​
// isActive:
// isExpire: false
// isdelete: false​
// lastUpdate: "2024-11-04T20:49:50.633"
// levelName: "متوسط"
// paymentStatus: "پرداخت نشده"
// statusName: "شروع ثبت نام"​
// studentId: 1​
// teacherId: 20205 ​
// termName: "بهار1404"​
// tumbImageAddress: null
// typeName: "حضوری"

const onsubmit = async ()=>{
  setOpen(true);

  const data = {
    courseId: CoursePaymentItem.courseId,
    price: price,
    PeymentDate: date,
    PaymentInvoiceNumber:price
  };
  const res = await setPayment(data)
  setPaymentId(res.id);
  if (res.id) {
    navigate(
      `../../../../ClientPanel/Payment/FacturePeyment/${res.id}/${
        CoursePaymentItem.courseId
      }/${0}`
    );
  } else {
    setTimeout(() => {
      navigate(
        `../../../../ClientPanel/Payment/FacturePeyment/${res.id}/${
          CoursePaymentItem.courseId
        }/${1}`
      );
    }, 1000);
  }
}
const dark = useSelector((state) => state.darkMood);

    return (
      <div
        style={{ background: dark.bgHigh, color: dark.textHigh }}
        className="w-full h-full  flex justify-center items-center"
      >
        <div className="flex flex-col justify-start gap-y-6 items-start p-[1vw] w-[50%] text-center h-[60%] rounded-2xl shadow-xl border border-gray-300 ">
          <span className="text-[1.6vw] ">مشخصات دوره</span>

          <span className="text-[1.2vw]">{CoursePaymentItem.courseTitle}</span>

          <span>
            اخرین بروزرسانی : {convertToJalali(CoursePaymentItem.lastUpdate)}
          </span>

          <span>{CoursePaymentItem.cost} تومان</span>

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