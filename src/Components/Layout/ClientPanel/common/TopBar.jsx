import React from "react";
import { Button, Avatar } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { ProfileGet } from "../../../../Core/Services/Api/Client/Profile";
import { setClientInfo } from "../../../../Redux/Slice/ClientInfo/ClientInfo";



const TopBar = () => {

    const dispatch = useDispatch();

    const { data: getProfileInfo } = useQuery({
      queryKey: ["getProfileInfo"],
      queryFn: ProfileGet,
      onSuccess: (data) => {
        dispatch(setClientInfo(data || []));
      },
    });

  const CourseListItem = useSelector(
    (state) => state.ClientInfoSlice.ClientInfo
  );
  const dark = useSelector((state) => state.darkMood);
  return (
    <div
      style={{ background: dark.bgHigh, color: dark.textHigh }}
      className="w-full h-full flex flex-row-reverse justify-between items-center  shadow-md px-[1%] py-[0.5%] rounded-lg"
    >
      {/* Left Icons */}
      <div className="flex items-center justify-end gap-x-[2%] max-md:w-[20%]   h-full">
        {/* Clock Icon Button */}
        <Button
          auto
          className="bg-gray-500 rounded-full h-full w-[100%]  p-0 max-md:max-w-[70px]"
        >
          <svg
            width=""
            height="70%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z"
              stroke="#272727"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Button>

        {/* Notification Icon Button */}
        {/* <div className="relative h-full w-[40%]"> */}
        <Button
          auto
          className="bg-gray-500 rounded-full max-md:hidden h-full w-[30%]"
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
              stroke="#272727"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 19C8.45849 20.7252 10.0755 22 12 22C13.9245 22 15.5415 20.7252 16 19"
              stroke="#272727"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Button>
        {/* Notification Badge */}
        {/* <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            1
          </span> */}
        {/* </div> */}
      </div>

      {/* User Profile Section */}
      <div className="flex items-center justify-end gap-x-3 flex-row-reverse h-full max-md:w-[50%]">
        <div className="text-right">
          <p className="text-[1.2vw] max-lg:text-[60%] max-md:text-[90%] font-semibold ">
            {CourseListItem.fName} {CourseListItem.lName}
          </p>
          <p className="text-[0.9vw] max-lg:text-[60%] max-md:text-[90%] text-gray-500">
            {" "}
            دانشجو
          </p>
        </div>
        {/* User Avatar */}
        <Avatar
          src={CourseListItem.currentPictureAddress} // لینک تصویر آواتار را تغییر دهید
          size="lg"
          className="border border-white w-[17%] h-full max-md:max-w-[60px] max-md:min-w-[60px]"
        />
      </div>
    </div>
  );
};

export default TopBar;
