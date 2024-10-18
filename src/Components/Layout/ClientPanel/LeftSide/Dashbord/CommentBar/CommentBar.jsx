import React from "react";
import { Card, Avatar, Tooltip } from "@nextui-org/react";

const CommentCard = ({ user, comment, date, likes, replies, shares }) => {
  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg border border-gray-200 p-4 rounded-lg">
      <div className="flex items-start">
        <Avatar src={user.avatar} alt={user.name} className="w-10 h-10 mr-4" />
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <h4 className="text-sm font-semibold">{user.name}</h4>
              <span className="text-xs text-gray-500 ml-2">{date}</span>
            </div>
            <Tooltip content="مشاهده مقاله">
              <a className="text-xs text-blue-500 hover:underline" href="#">
                مشاهده همه
              </a>
            </Tooltip>
          </div>
          <p className="text-sm text-gray-700 mb-2">{comment}</p>
          <div className="flex items-center space-x-4 text-gray-500">
            <div className="flex items-center space-x-1">
              <HeartSVG />
              <span className="text-xs">{likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSVG />
              <span className="text-xs">{replies}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ShareSVG />
              <span className="text-xs">{shares}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

// SVG for Heart (Like)
const HeartSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-5 h-5 text-red-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 6.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

// SVG for Message (Replies)
const MessageSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-5 h-5 text-blue-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-9-9 9 9 0 019 9zm-9 4h.01"
    />
  </svg>
);

// SVG for Share
const ShareSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-5 h-5 text-green-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M14.828 9.172a4 4 0 110-5.656M21 12a9 9 0 11-9-9 9 9 0 019 9zm-7-4v12m-4-4l4-4-4-4"
    />
  </svg>
);

const CommentSection = () => {
  const comments = [
    {
      user: { name: "شما", avatar: "https://via.placeholder.com/40" },
      comment: "دوره خوبی بود، استادانش ...",
      date: "1403 اردیبهشت 27",
      likes: 20,
      replies: 2,
      shares: 1,
    },
    {
      user: { name: "مجتبی علی", avatar: "https://via.placeholder.com/40" },
      comment: "دوره خوبی بود، نکات خوبی داشت ...",
      date: "1403 اردیبهشت 27",
      likes: 15,
      replies: 1,
      shares: 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {comments.map((comment, index) => (
        <CommentCard key={index} {...comment} />
      ))}
    </div>
  );
};

export default CommentSection;
