import React, { useEffect, useState } from "react";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useQuery, useQueryClient } from "react-query";
import { getNotifMessageList, getUserNotif, postReedNotif } from "../../../../Core/Services/Api/Client/notif";
import { getItem } from "../../../../Core/Services/common/storage.services";
import convertToJalali from "../../../Common/TimeChanger/TimeToShamsi";
import toast from "react-hot-toast";

const NotificationBox = () => {
    const userId = getItem("userId");
    const queryClient = useQueryClient();
  const [notifications, setNotifications] = useState([
  ]);
  const [message,setMessage]=useState([])
  const [preMessage, setPreMessage] = useState({});
  const [response, setResponse] = useState([]);
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [readNotif,setReadNotif]=useState([])

   const {isLoading, data: NotifList } = useQuery({
     queryKey: ["getNotifList"],
     queryFn: getUserNotif,
     onSuccess: (data) => {
        
       setResponse(data || []);
     },
   });

   const {  data: notifMessageList } = useQuery({
     queryKey: ["getNotifMessage"],
     queryFn: getNotifMessageList,
     onSuccess: (data) => {
        console.log(data)
       setMessage(data || []);
     },
   });
   if(isLoading) {<div>dddd</div>}


   useEffect(() => {
     filterMyNotif(NotifList);
     findUnreadNum(NotifList);
   }, [NotifList]);

   const filterMyNotif=(dataa)=>{
    const filterdata = dataa?dataa.filter((el) => el.userId==userId):[]
    
    setNotifications(filterdata);
   }
   const findUnreadNum = (dataa)=>{
    const filterdata = dataa
      ? dataa.filter((el) => el.isRead == false && el.userId == userId)
      : [];
    console.log(filterdata);
    setReadNotif(filterdata);
   }

   

  // باز و بسته کردن باکس
  const toggleBox = () => {
    setIsBoxOpen(!isBoxOpen);
  };

  // تغییر وضعیت نوتیف به خوانده‌شده
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  };

  const setRead= async (id)=>{
    const res = await postReedNotif(id)
    toast.success(res.message);
    queryClient.invalidateQueries("getNotifList");
  }
        
  const dark = useSelector((state) => state.darkMood);


  return (
    <div
      style={{ background: dark.bgHigh, color: dark.textHigh }}
      dir="rtl"
      className="relative w-[50%] h-full"
    >
      {/* دکمه نوتیف */}
      <Button
        isIconOnly
        onPress={toggleBox}
        className="rounded-full w-[100%] max-md:size-12 h-full bg-gray-600 text-white hover:bg-gray-700"
      >
        <svg
          width=""
          height="70%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.52992 14.7696C2.31727 16.1636 3.268 17.1312 4.43205 17.6134C8.89481 19.4622 15.1052 19.4622 19.5679 17.6134C20.732 17.1312 21.6827 16.1636 21.4701 14.7696C21.3394 13.9129 20.6932 13.1995 20.2144 12.5029C19.5873 11.5793 19.525 10.5718 19.5249 9.5C19.5249 5.35786 16.1559 2 12 2C7.84413 2 4.47513 5.35786 4.47513 9.5C4.47503 10.5718 4.41272 11.5793 3.78561 12.5029C3.30684 13.1995 2.66061 13.9129 2.52992 14.7696Z"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 19C8.45849 20.7252 10.0755 22 12 22C13.9245 22 15.5415 20.7252 16 19"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
      {readNotif.length > 0 && (
        <Badge
          color="danger"
          content={readNotif.length}
          className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
        />
      )}

      {/* باکس نوتیف */}
      {isBoxOpen && (
        <Card
          style={{ background: dark.bgHigh, color: dark.textHigh }}
          className="absolute max-md:w-[700%] top-14 left-0 z-50 w-[500%] shadow-lg"
          isHoverable
          variant="flat"
        >
          <CardHeader>
            <h4 className="font-semibold">اعلانات</h4>
          </CardHeader>
          <CardBody className="max-h-[250px] overflow-auto">
            <div className="flex flex-col gap-2 text-right">
              {isLoading ? <div> صبر کن </div> : null}
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3  flex justify-between rounded-md cursor-pointer ${
                    notification.isRead
                      ? " text-gray-500"
                      : dark.bgHigh == "#ffffff"
                      ? "text-black"
                      : " text-white"
                  } hover:bg-gray-300`}
                  onClick={() => {
                    markAsRead(notification.id);
                    setRead(notification.id);
                  }}
                >
                  <div className="w-[60%] h-full flex flex-col gap-y-2">
                    <span>
                      {
                        message.find(
                          (el) => el.id == notification.notificationMessageId
                        ).title
                      }
                    </span>
                    <span className="text-[12px]">
                      {
                        message.find(
                          (el) => el.id == notification.notificationMessageId
                        ).describeText
                      }
                    </span>
                  </div>
                  <div className="w-[25%] h-full text-[12px]">
                    {convertToJalali(
                      message.find(
                        (el) => el.id == notification.notificationMessageId
                      ).insertDate
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
          <CardFooter>
            <Button
              size="sm"
              variant="light"
              className="w-full text-blue-500"
              onPress={() =>
                setNotifications((prev) =>
                  prev.map((n) => ({ ...n, read: true }))
                )
              }
            >
              علامت زدن همه به عنوان خوانده شده
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default NotificationBox;
