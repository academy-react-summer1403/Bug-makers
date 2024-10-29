import React from "react";

const DeleteModal = ({ onCancel, onDelete ,id}) => {
  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
      {/* آیکون زباله */}
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26 7.3335L25.1737 20.7003C24.9625 24.1154 24.8571 25.823 24.0011 27.0507C23.5777 27.6576 23.0329 28.1699 22.4009 28.5548C21.1228 29.3335 19.412 29.3335 15.9903 29.3335C12.5642 29.3335 10.8511 29.3335 9.57207 28.5534C8.93973 28.1678 8.39467 27.6546 7.97157 27.0466C7.11584 25.817 7.0126 24.107 6.80615 20.6871L6 7.3335"
            stroke="#FF5454"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M4 7.33317H28M21.4076 7.33317L20.4975 5.45548C19.8928 4.20818 19.5904 3.58453 19.0689 3.19558C18.9533 3.1093 18.8308 3.03256 18.7027 2.9661C18.1252 2.6665 17.4321 2.6665 16.046 2.6665C14.6251 2.6665 13.9147 2.6665 13.3276 2.97866C13.1975 3.04785 13.0733 3.1277 12.9564 3.2174C12.4289 3.6221 12.1342 4.26857 11.5448 5.56152L10.7372 7.33317"
            stroke="#FF5454"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M12.666 22V14"
            stroke="#FF5454"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M19.334 22V14"
            stroke="#FF5454"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </div>

      {/* پیام اصلی */}
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        آیا از حذف دوره مطمئن هستید؟
      </h2>
      <p className="text-sm text-gray-600 text-center mb-6">
        در صورت تایید این دوره از لیست علاقه‌مندی‌ها حذف خواهد شد
      </p>

      {/* دکمه‌ها */}
      <div className="flex justify-between w-full">
        <button
          onClick={onCancel}
          className="w-[40%] bg-gray-200 text-gray-800 py-2 px-4 rounded-lg mr-2 hover:bg-gray-300"
        >
          انصراف
        </button>
        <button
          onClick={()=>{onDelete(id)}}
          className="w-[40%] bg-red-500 text-white py-2 px-4 rounded-lg ml-2 hover:bg-red-600"
        >
          حذف دوره
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
