import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaPaperPlane,
  FaTimesCircle,
  FaArrowLeft,
  FaRedo,
} from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { getItem } from "../../../Core/Services/common/storage.services";
import { getHelpPm, postHelpPm, postHelpPmInChat } from "../../../Core/Services/Api/HelpChat/help";
import convertToJalali from "../TimeChanger/TimeToShamsi";
import { setHelpStatus } from "../../../Redux/Slice/helpchat/helpChat";



const ChatBox = () => {
  const dispatch = useDispatch();


  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [responseAdmin, setResponseAdmin] = useState({});
  const [adminMassegeNotif,setAdminMassegeNotif]=useState([])
  const [groupId, setGroupId] = useState(false);
  const queryClient = useQueryClient();

  const { data: adminMessages } = useQuery(
    "adminMessages",
    () => getHelpPm(responseAdmin.id),
    // 673b8a25c0fdffcbdefdc5db
    {
      enabled: isChatOpen,
      refetchInterval: 50000,
      onSuccess: (data) => {
        if (data) {
          const adminReplies = data?.dataText.filter(
            (msg) => msg.SenderId === data.Peaple2
          );

          const adminRepliesMsg = adminReplies?.map((msg) => ({
            id: msg.id,
            sender: "support",
            text: msg.text,
            timestamp: convertToJalali(msg.time),
            status: "sent",
          }));

          console.log(adminRepliesMsg);

          setMessages((prevMessages) => {
            const existingIds = new Set(prevMessages.map((msg) => msg.id));
            const newMessages = adminRepliesMsg.filter(
              (msg) => !existingIds.has(msg.id)
            );
            return [...prevMessages, ...newMessages];
          });

          // ارسال نوتیفیکیشن به کاربر
          if (adminRepliesMsg.length > 0) {
            const lastMessage = adminRepliesMsg[adminRepliesMsg.length - 1];
            if (
              "Notification" in window &&
              Notification.permission === "granted"
            ) {
              new Notification("پیام جدید از پشتیبانی", {
                body: lastMessage.text,
              });
            } else if (
              "Notification" in window &&
              Notification.permission !== "denied"
            ) {
              Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                  new Notification("پیام جدید از پشتیبانی", {
                    body: lastMessage.text,
                  });
                }
              });
            }
          }
        }
      },
    }
  );
const HelpStatus = useSelector((state) => state.help);
useEffect(()=>{
  setGroupId(HelpStatus.helpStatus);
},[])

  const handleSendMessage = async () => {
    
    const userId = getItem("userId");
    if (userMessage !== "") {
      const newMessage = {
        id: Date.now(),
        text: userMessage,
        sender: "user",
        status: "pending",
        timestamp: new Date().toLocaleTimeString(),
      };
      
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      try {
        console.log(groupId);
        const res = groupId
          ? await postHelpPmInChat({
              SenderId: groupId.SenderId,
              text: groupId.text,
              ReciveId: groupId.ReciveId,
              GroupId: groupId.GroupId,
            })
          : await postHelpPm({ id: userId, message: newMessage.text });
        
        
        if(groupId == false) {
          setResponseAdmin(res.data.data)
          setGroupId(res.data.data.dataText)
          console.log(res.data)
        } 
        
        dispatch(setHelpStatus(res.data.data.dataText || {}));
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === newMessage.id
              ? { ...msg, status: "sent" }
              : msg
          )
        );
      } catch (error) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === newMessage.id
              ? { ...msg, status: "failed" }
              : msg
          )
        );
      }
      setUserMessage("");
    }
  };

  const handleRetry = async (message) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === message.id ? { ...msg, status: "pending" } : msg
      )
    );
    try {
      const res = groupId
        ? await postHelpPmInChat({
            SenderId: groupId.dataText.SenderId,
            text: groupId.dataText.text,
            ReciveId: groupId.dataText.ReciveId,
            GroupId: groupId.dataText.groupId,
          })
        : await postHelpPm({ id: message.id, message: message.text });
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === message.id ? { ...msg, status: "sent" } : msg
        )
      );
    } catch (error) {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === message.id ? { ...msg, status: "failed" } : msg
        )
      );
    }
  };

  const handleBackToMenu = () => {
    setIsChatOpen(false);
    setMessages([]);
  };

  const defaultQuestions = [
    { id: 1, text: "چطور می‌توانم یادگیری برنامه‌نویسی را شروع کنم؟" },
    { id: 2, text: "کدام زبان برنامه‌نویسی برای شروع مناسب‌تر است؟" },
    { id: 3, text: "چگونه تمرین‌های کدنویسی بیشتری پیدا کنم؟" },
  ];

  const responses = {
    1: "برای شروع برنامه‌نویسی، بهتر است با مفاهیم پایه‌ای مثل متغیرها، حلقه‌ها و شرط‌ها آشنا شوید.",
    2: "زبان‌های Python و JavaScript برای شروع بسیار مناسب هستند.",
    3: "سایت‌های معتبری مانند Codewars و LeetCode منابع خوبی برای تمرین کدنویسی هستند.",
  };

  const handleQuestionClick = (questionId) => {
    const question = defaultQuestions.find((q) => q.id === questionId).text;
    const response = responses[questionId];
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now(), sender: "user", text: question, timestamp: new Date().toLocaleTimeString() },
      { id: Date.now() + 1, sender: "support", text: response, timestamp: new Date().toLocaleTimeString() },
    ]);
    setIsChatOpen(true);
  };
 
  const dark = useSelector((state) => state.darkMood);

  // useEffect(() => {
  //   if (responseAdmin) {
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       {
  //         id: Date.now(),
  //         sender: "support",
  //         text: responseAdmin.dataText.text,
  //         timestamp: new Date().toLocaleTimeString(),
  //       },
  //     ]);
  //   }
  // }, [responseAdmin]);


    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // جلوگیری از ارسال فرم به طور پیش‌فرض
        handleSendMessage();
      }
    };
  return (
    <div
      style={{ backgroundColor: dark.bgLow, color: dark.textHigh }}
      className="w-[100%] h-[100%] flex flex-col border rounded-lg shadow-lg overflow-hidden"
      dir="rtl"
    >
      {/* هدر */}
      <div
        className={`
          ${dark.selectedButton === 0 ? "bg-blue-500" : ""}
          ${dark.selectedButton === 1 ? "bg-green-500" : ""}
          ${dark.selectedButton === 2 ? "bg-yellow-500" : ""}
          ${dark.selectedButton === 3 ? "bg-red-500" : ""}
          text-white flex flex-row-reverse justify-between max-md:h-[15%] items-center px-4 py-2
        `}
      >
        <button
          className={`${
            isChatOpen ? "visible" : "invisible"
          } text-white rounded-full p-2 mr-2 hover:bg-blue-800`}
          onClick={handleBackToMenu}
        >
          <FaArrowLeft />
        </button>
        <div className="flex justify-between w-[50%] items-center">
          <div className="bg-white rounded-full p-2 text-blue-500">
            <FaUser size={24} />
          </div>
          <span className="ml-4 text-lg font-semibold">پشتیبانی آنلاین</span>
        </div>
      </div>

      {/* بدنه اصلی */}
      <div className="flex-1 overflow-y-auto p-4 bg-chatBg">
        {!isChatOpen ? (
          <div>
            <h4 className="text-lg font-medium mb-3">سوالات متداول</h4>
            {defaultQuestions.map((question) => (
              <button
                key={question.id}
                className="w-full bg-white border border-gray-300 text-gray-700 rounded-md py-2 px-4 mb-2 text-right hover:bg-gray-100 transition"
                onClick={() => handleQuestionClick(question.id)}
              >
                {question.text}
              </button>
            ))}
            <button
              className={`w-full text-white rounded-md py-2 px-4 mt-4 hover:bg-blue-600 transition
                ${dark.selectedButton === 0 ? "bg-blue-500" : ""}
                ${dark.selectedButton === 1 ? "bg-green-500" : ""}
                ${dark.selectedButton === 2 ? "bg-yellow-500" : ""}
                ${dark.selectedButton === 3 ? "bg-red-500" : ""}
              `}
              onClick={() => setIsChatOpen(true)}
            >
              ارتباط با پشتیبانی
            </button>
          </div>
        ) : (
          <div dir="ltr">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-3 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  style={{ backgroundColor: dark.bgHigh, color: dark.textHigh }}
                  className={`relative max-w-[70%] px-4 py-2 rounded-lg shadow ${
                    msg.sender === "user"
                      ? msg.status === "failed"
                        ? " text-red-700 rounded-bl-lg rounded-tr-lg"
                        : `${dark.selectedButton === 0 ? "bg-blue-500" : ""}
                          ${dark.selectedButton === 1 ? "bg-green-500" : ""}
                          ${dark.selectedButton === 2 ? "bg-yellow-500" : ""}
                          ${
                            dark.selectedButton === 3 ? "bg-red-500" : ""
                          } rounded-bl-lg rounded-tr-lg`
                      : " rounded-br-lg rounded-tl-lg"
                  }`}
                >
                  <p className="text-sm text-right">{msg.text}</p>
                  <div className="text-xs mt-1 flex items-center justify-between">
                    {msg.status === "failed" && (
                      <>
                        <button
                          className="ml-2 text-red-500 hover:text-red-700"
                          onClick={() => handleRetry(msg)}
                        >
                          <FaRedo className="inline mr-3" />
                          ارسال مجدد
                        </button>
                        <FaTimesCircle
                          className="text-red-500 mx-3"
                          size={14}
                        />
                      </>
                    )}
                    <span>{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
            {responseAdmin?.Peaple2 || messages.sender == "support" ? (
              <div className="admin-messages">
                {/* اینجا پیام‌های ادمین را اضافه کنید */}
                {/* داده‌ها به صورت پویا اضافه می‌شوند */}
              </div>
            ) : !responseAdmin ? null : (
              <div className="text-center bg-white p-2 rounded-md text-black mt-4">
                پیام شما در انتظار تایید ادمین و پاسخگویی است
              </div>
            )}
          </div>
        )}
      </div>

      {/* ورودی پیام */}
      {isChatOpen && (
        <div className="flex flex-row-reverse items-center px-4  py-2 border-t">
          <input
            style={{ backgroundColor: dark.bgLow, color: dark.textHigh }}
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="پیام خود را بنویسید..."
            className="max-md:w-[100%] border rounded-md py-2 px-4 text-gray-500 text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            className={`ml-3 text-white rounded-md px-4  py-2 flex items-center hover:bg-blue-600 transition
              ${dark.selectedButton === 0 ? "bg-blue-500" : ""}
                ${dark.selectedButton === 1 ? "bg-green-500" : ""}
                ${dark.selectedButton === 2 ? "bg-yellow-500" : ""}
                ${dark.selectedButton === 3 ? "bg-red-500" : ""}
              `}
            onClick={handleSendMessage}
          >
            ارسال
            <FaPaperPlane className="ml-2 " />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
