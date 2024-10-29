import { Button } from "@nextui-org/react";
import React from "react";
import { useSelector } from "react-redux";

const PaymentFirstStep = ()=>{
    const price = Math.floor(10000 + Math.random() * 90000);

    

    const date="2024_02_04"
    const CoursePaymentItem = useSelector((state) => state.payment.paymentList);
    console.log(CoursePaymentItem);
    return (
      <div className="w-full h-full bg-white flex justify-center items-center">
        <div className="p-[1vw] w-[50%] text-center h-[60%] rounded-2xl shadow-xl border border-gray-300 ">
          <span className="text-[1.6vw] ">مشخصات دوره</span>
          <br />
          <br />
          <span className="text-[1.2vw]">{CoursePaymentItem.courseTitle}</span>
          <br />
          <br />
          <span>{price} تومان</span>
          <br />
          <br />
          <Button>پرداخت</Button>
        </div>
      </div>
    );
}
export default PaymentFirstStep