import { Skeleton } from "@mui/material";
import React from "react";

import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";

const Skeleton2 = () => {
    const dark = useSelector((state) => state.darkMood);
  return (
    <div
      style={{ background: dark.bgHigh, color: dark.textHigh }}
      className={` relative   rounded-[1vw]  overflow-hidden
          "w-[100%] h-[100%]  max-h-[100%] max-md:h-full`}
    >
      <div className="flex justify-between items-center mb-4">
        <Skeleton circle={true} height={40} width={40} />
        <Skeleton circle={true} height={40} width={40} />
      </div>
      <div className="mb-0 flex gap-x-3">
        <Skeleton height={20} width={`10%`} />
        <Skeleton height={20} width={`10%`} />
      </div>
      <div className="mb-4">
        <Skeleton height={250} />
      </div>
      <div className="mb-4">
        <Skeleton height={20} width={`70%`} />
        <Skeleton height={20} width={`50%`} />
      </div>
      <div className="mb-4 flex justify-between">
        <Skeleton height={30} width={60} />
        <Skeleton height={30} width={60} />
      </div>
      <div className="mb-4">
        <Skeleton height={20} width={`40%`} />
      </div>
      <div className="mb-4">
        <Skeleton height={20} width={`90%`} />
      </div>
      <div className="mb-4 flex justify-between">
        <Skeleton height={20} width={30} />
        <Skeleton height={20} width={30} />
      </div>
      <div className="mb-4 flex justify-between items-center">
        <Skeleton height={20} width={`40%`} />
        <Skeleton height={20} width={`40%`} />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton height={20} width={`30%`} />
        <Skeleton height={20} width={`30%`} />
      </div>
    </div>
  );
};

export default Skeleton2;
