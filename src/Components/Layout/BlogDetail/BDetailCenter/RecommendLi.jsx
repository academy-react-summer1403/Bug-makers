import React from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@nextui-org/react";

const RecommendLi = ({ id, title, desc }) => {
  const navigator = useNavigate();

  return (
    <li 
      onClick={() => { navigator(`/BlogDetail/${id}`); }} 
      className="hover:text-gray-600 cursor-pointer relative"
    >
      <Tooltip content={desc} placement="top-end" className="text-gray-700">
        <span>{title}</span>
      </Tooltip>
    </li>
  );
}

export default RecommendLi;
