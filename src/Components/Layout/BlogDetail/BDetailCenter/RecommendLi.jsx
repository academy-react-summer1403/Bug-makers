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
      <Tooltip content={desc} placement="top-end" className="text-gray-700 max-w-[300px] max-h-[60px] overflow-hidden text-ellipsis ...">
        <span>{title}</span>
      </Tooltip>
    </li>
  );
}

export default RecommendLi;
