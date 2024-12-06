import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { getMultiAcc } from "../../../../Core/Services/Api/Client/multiAccont";
import Loading from "../../../Common/loadingWeb/Loading";
import { getItem, setItem } from "../../../../Core/Services/common/storage.services";
import { useNavigate } from "react-router-dom";

const MultiAcc = ({ multiAccount, setMultiAccount }) => {
  const navigate = useNavigate()
      const dark = useSelector((state) => state.darkMood);
      const[mulltiData,setMulltiData]=useState([])
      const accId = getItem("accId");
      
      const queryClient = useQueryClient()
      const { isLoading, error, data } = useQuery(
        ["get",accId],
        () => getMultiAcc(accId),
        {
          onSuccess: (data) => {
            setMulltiData(data.data.filter((i)=>{
              return i.accId == accId;
            }));
            setMulltiData((arr) => {
            const uniqueObjects = arr.filter((item, index, self) => 
              index === self.findIndex((t) => t.UserId === item.UserId)
            );
            return uniqueObjects;
          })
          },
          keepPreviousData: true,
        }
      );
      // if (isLoading) return <p>در حال بارگذاری ...</p>;
      if (error) return <p>خطایی رخ داده است...</p>;

      console.log(mulltiData);

  return (
    <div
      style={{ background: dark.bgHigh, color: dark.textHigh }}
      className={`py-3 px-2 h-[800%] w-full transition-all duration-250 absolute top-[-800%] max-md:top-0 max-md:h-full z-20 shadow-[0_-10px_40px_10px_rgba(0,0,0,0.3)] rounded-xl 
            ${multiAccount == true ? "block" : "hidden"}
            `}
    >
      <div
        className={`justify-between flex items-start  
              
            `}
      >
        <span className="text-[1vw] max-md:text-[16px] font-[600]">
          حساب های کاربری
        </span>
        <div
          onClick={() => {
            setMultiAccount(false);
          }}
          className={`flex rounded-full border p-1 border-red-500 h-[1.8vw] max-md:h-[25px] max-md:w-[20%]  max-md:text-[10px] text-[0.7vw] w-[3.5vw] text-red-500  items-center justify-evenly cursor-pointer `}
        >
          <svg
            width=""
            height="70%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.001 5L5.00098 19M5.00098 5L19.001 19"
              stroke="#FF4242"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>بستن</span>
        </div>
      </div>
      <div className="w-full h-[90%] mt-3 overflow-auto flex flex-col gap-y-1">
        {mulltiData.length != 0
          ? mulltiData.map((ithem) => (
              <div key={ithem.id} className="min-h-[60px] h-[22%] w-full  rounded-2xl px-1 flex">
                <div className="h-full w-[18%] flex items-center justify-center ">
                  <div className="w-[80%] h-[60%] overflow-hidden bg-gray-600 rounded-full max-md:w-full">
                    <img
                      className="w-full h-full"
                      src={ithem.data.currentPictureAddress}
                      alt=""
                    />
                  </div>
                </div>
                <div className="h-full max-md:text-[12px] max-md:pr-3 w-[60%] flex flex-col justify-center gap-y-2 pr-1">
                  <span>
                    {ithem.data.fName} {ithem.data.lName}
                  </span>
                  <div className="flex gap-x-1">
                    <svg
                      width="11%"
                      height=""
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.16699 7.49984C4.16699 4.74998 4.16699 3.37505 5.02127 2.52078C5.87553 1.6665 7.25047 1.6665 10.0003 1.6665C12.7502 1.6665 14.1251 1.6665 14.9794 2.52078C15.8337 3.37505 15.8337 4.74998 15.8337 7.49984V12.4998C15.8337 15.2497 15.8337 16.6246 14.9794 17.4789C14.1251 18.3332 12.7502 18.3332 10.0003 18.3332C7.25047 18.3332 5.87553 18.3332 5.02127 17.4789C4.16699 16.6246 4.16699 15.2497 4.16699 12.4998V7.49984Z"
                        stroke="#5e5e5e"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M9.16699 15.8335H10.8337"
                        stroke="#5e5e5e"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7.5 1.6665L7.57417 2.11152C7.7349 3.07591 7.81527 3.55811 8.14599 3.85154C8.491 4.15762 8.98008 4.1665 10 4.1665C11.0199 4.1665 11.509 4.15762 11.854 3.85154C12.1847 3.55811 12.2651 3.07591 12.4258 2.11152L12.5 1.6665"
                        stroke="#5e5e5e"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <span className="text-gray-500">
                      {ithem.data.phoneNumber}
                    </span>
                  </div>
                </div>
                <div className="w-[20%] flex justify-end items-start pt-2">
                  <button onClick={()=>{
                    setItem("token", ithem.token);
                    setItem("userId", ithem.UserId);
                    setTimeout(() => {
                      queryClient.invalidateQueries("getProfileInfo");
                      queryClient.invalidateQueries("comments");
                    }, 1000);
                  }}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373V11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501"
                        stroke="#FF5454"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5"
                        stroke="#FF5454"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          : null}
        <div onClick={()=>{navigate("../../sign/login")}} className="h-[20%] cursor-pointer mt-2 text-sm text-gray-500 w-full flex justify-center flex-col items-center gap-y-1">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 8V16M16 12H8"
              stroke="#5e5e5e"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
              stroke="#5e5e5e"
              stroke-width="1.5"
            />
          </svg>
          <span>اضافه کردن حساب کاربری</span>
        </div>
      </div>
    </div>
  );
};
export default MultiAcc