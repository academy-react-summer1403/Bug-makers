import { Skeleton } from '@mui/material';
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Gauge = ({ value }) => {
  const percentage = (value);
  const color = `rgba(${255 - percentage * 2.55}, ${percentage * 2.55}, 0, 1)`;

  return (
    <div className="flex flex-col w-full items-center border p-[0.5vw] border-[#eee] h-full rounded-[0.5vw]  text-right">
      <h2 className="text-[1vw] font-[500] text-right max-md:text-[14px]">
        وضعیت اطلاعات حساب
      </h2>
      <div className="w-[60%] my-[1vw]">
        {value ? <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textColor: "#888",
            pathColor: color,
            trailColor: "lightgray",
          })}
        /> : <Skeleton height={150}  width={`100%`} circle={true} />}</div>
      <p
        className={`text-right text-[0.7vw] max-md:text-[12px] ${
          percentage == 100 ? "text-green-600" : "text-orange-500"
        }`}
      >
        {percentage == 100
          ? "اطلاعات کاربری شما تکمیل شده است"
          : " حساب‌کاربری شما تکمیل نیست "}
      </p>
    </div>
  );
};

export default Gauge;
