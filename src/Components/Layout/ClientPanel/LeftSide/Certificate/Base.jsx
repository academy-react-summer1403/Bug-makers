import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from "@nextui-org/react";
import convertToJalali from "../../../../Common/TimeChanger/TimeToShamsi";
import SearchBox from "../LikedCourse/SearchBox/SearchBox";
import { useQuery } from "react-query";
import {
  getUserTest,

} from "../../../../../Core/Services/Api/Client/certificate";
import { getTestById } from "../../../../../Core/Services/Api/TestDetail/TestDeatil";
import { useSelector } from "react-redux";
import CustomSkeleton from "../../../../Common/Sceleton/CostomeSceleton";
import Certificate from "../../../../Common/Certificate/Certificate";
import { getItem } from "../../../../../Core/Services/common/storage.services";

const CoursePage = ({
  location,
  name,
  show,
  itemPerpage,
  setShowMoreCourse,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [response, setResponse] = useState([]);
  const [detailCourse, setDetailCourse] = useState(false);
  const [detail, setDetail] = useState([]);
  const [queryValue, setQueryValue] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const [uniq, setUniq] = useState([]);

  const userId = getItem("userId");
  const { isLoading, error, data } = useQuery({
    queryKey: ["getUserTest"],
    queryFn: () => getUserTest(userId), 
    onSuccess: (data) => {
      setResponse(data.data.data || []);
    },
  });
   const CourseListItem = useSelector(
     (state) => state.ClientInfoSlice.ClientInfo
   );

     const today = new Date();
     const isoDate = today.toISOString();
useEffect(() => {
  const uniqueData = response?.reduce((acc, current) => {
    const x = acc.find(
      (item) =>
        item.ExamId === current.ExamId && item.Percent === current.Percent
    );
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  setUniq(uniqueData);
  setOriginalData(uniqueData);
}, [response]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQueryValue(value);

    if (value === "") {
      setUniq(originalData);
      return;
    }
    const filterData = originalData.filter((el) => {
      return el.exam.title.toLowerCase().includes(value.toLowerCase());
    });
    setUniq(filterData);
  };


  const renderCourses = () => {
    return uniq?.map((course, index) => (
      <div
        key={course.id}
        style={{ background: dark.bgHigh, color: dark.textHigh }}
        className="w-full h-[3vw] max-md:justify-between max-md:border-b-1 max-md:h-[40px] rounded-[0.4vw] flex items-center text-[0.9vw]  hover:bg-gray-100"
      >
        <div
          className={`w-[8%] max-md:hidden justify-center h-[90%] overflow-hidden rounded-lg bg
                  ${
                    dark.bgHigh == "#ffffff"
                      ? "bg-gradient-to-r from-blue-200 to-blue-50"
                      : "bg-gradient-to-r from-[#222] to-[#333] "
                  }
                  ${true ? "flex" : "hidden"}`}
        >
          {course.exam.Image ? (
            <img
              className=" h-full rounded-lg w-full"
              src={course.exam.Image}
              alt=""
            />
          ) : null}
        </div>
        <div className="w-[15%] h-full  py-[1%] px-[1%] text-right whitespace-nowrap overflow-hidden text-ellipsis ... max-md:w-[30%] max-md:text-[14px]">
          <Tooltip
            placement="top"
            className="text-gray-700 max-w-[200px] overflow-hidden text-ellipsis ... leading-6"
            content={`${course.exam.title}`}
          >
            <span>{course.exam.title}</span>
          </Tooltip>
        </div>
        <div
          className={`max-md:hidden w-[35%] h-full py-[1%] px-[1%] text-right whitespace-nowrap overflow-hidden text-ellipsis ...`}
        >
          <Tooltip
            placement="top-end"
            className="text-gray-700  max-w-[400px] max-h-[200px] overflow-hidden text-ellipsis ... leading-[1.5vw]"
            content={`${course.exam.Desc}`}
          >
            <span>{course.exam.Desc}</span>
          </Tooltip>
        </div>

        <div
          className={`w-[14%] h-full max-md:w-[30%] max-md:text-[14px] py-[1%] px-[1%]  text-center whitespace-nowrap`}
        >
          {convertToJalali(course.exam.Insert)}
        </div>
        <div className="w-[14%] max-md:text-[14px] max-md:w-[18%] h-full py-[1%] px-[1%] text-center whitespace-nowrap">
          درصد : %{course.Percent}
        </div>
        <div
          className={`max-md:hidden   w-[14%]  py-[1%] px-[1%] text-center whitespace-nowrap`}
        >
          سطح : {course.exam.Level}
        </div>
        <div
          className={`w-[6%] max-md:ml-[10px] h-full items-center justify-center ${
            true ? "flex" : "hidden"
          }`}
          onClick={() => {
            setDetail(course);
          }}
        >
          {" "}
          {course.Percent == "100" ? (
            <Tooltip
              className="text-gray-500 w-[7vw] leading-[1.2vw] text-sm"
              content={"گواهینامه"}
            >
              <svg
                onClick={() => {
                  onOpen();
                }}
                className="cursor-pointer"
                width=""
                height="50%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z"
                  stroke="#787878"
                  stroke-width="1.5"
                />
                <path
                  d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z"
                  stroke="#787878"
                  stroke-width="1.5"
                />
              </svg>
            </Tooltip>
          ) : (
            <Tooltip
              className="text-gray-500 w-[7vw] leading-[1.2vw] text-sm"
              content={"درصدت کمه"}
            >
              <svg
                
                className="cursor-pointer"
                width=""
                height="50%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z"
                  stroke="#787878"
                  stroke-width="1.5"
                />
                <path
                  d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z"
                  stroke="#787878"
                  stroke-width="1.5"
                />
              </svg>
            </Tooltip>
          )}
        </div>
      </div>
    ));
  };

  const dark = useSelector((state) => state.darkMood);
  return (
    <div
      style={{ background: dark.bgHigh, color: dark.textHigh }}
      className="relative  m-auto w-[100%] bg-transparent text-center max-md:w-full"
    >
      <div
        className={`fixed top-[40%] left-[50%] translate-x-[-100%] ${
          true ? "flex" : "hidden"
        }`}
      >
        {/* <DeleteModal
          onCancel={setIsDeleteFalse}
          onDelete={DeleteIthem}
          id={deleteId}
        /> */}
      </div>
      <div
        className={`absolute z-[1000]  backdrop-blur-[3px] top-[-1.5vw] right-[0vw] h-[104%]  w-[100%] pt-4 ${
          detailCourse == true ? "block" : "hidden"
        }`}
      >
        <div
          className={`sticky h-[18vw] w-[20vw] max-md:absolute max-md:w-[75%] max-md:h-[100px] top-[80%] backdrop-blur-[5px]  right-[50%] translate-x-[50%] z-40  ${
            detailCourse == true ? "block" : "hidden"
          }`}
        >
          {/* {detailCourse == true ? renderDetail() : <div></div>} */}
        </div>
      </div>

      <div
        className={`justify-between pb-[0.2vw] px-[1vw] items-start ${
          show == true ? "flex" : "hidden"
        }`}
      ></div>
      <div className="w-[100%] selection: mt-[0vw] ">
        {/* for dashbord........  */}
        <div
          className={` justify-between items-center my-[1vw] max-md:h-[50px]`}
        >
          <div className="text-[1.5vw] font-[600] text-right max-md:text-[20px]">
            {name}
          </div>
        </div>

        {/* filterActionSection */}
        <div
          style={{ background: dark.bgHigh, color: dark.textHigh }}
          className={`h-[10%]  w-full max-md:grid  relative flex-row flex-wrap justify-start items-center gap-x-3 max-md:gap-y-[20px]  rounded-[10px] shadow-[-5px_5px_5px_0px_#0000001C] p-3
            ${true ? "flex max-md:grid max-md:grid-cols-2" : "hidden"}`}
        >
          <SearchBox
            width={"20%"}
            lgWidth={"160px"}
            placeHolder="جست جو کنید ..."
            value={`${queryValue}`}
            onChange={handleSearch}
          />
        </div>

        <div className=" w-full mt-[0.5vw] max-md:py-[10px]">
          <div
            style={{ background: dark.bgLow, color: dark.textLow }}
            className="flex items-center  w-full rounded-[0.5vw]  text-[0.9vw] leading-normal"
          >
            <div className="w-[7%] max-md:hidden py-[1%] px-[1%] text-center"></div>
            <div
              className={`w-[15%]   py-[1%] px-[1%] text-right max-md:text-[16px] max-md:w-[38%] 
                
              `}
            >
              عنوان ازمون
            </div>
            <div className="w-[35%] max-md:hidden  py-[1%] px-[1%] text-right">
              درباره ازمون
            </div>
            <div
              className={`w-[12%] max-md:w-[30%] max-md:text-[16px] pl-[3%] py-[1%] px-[1%] text-center `}
            >
              تاریخ
            </div>
            <div
              className={` max-md:hidden w-[14%] h-full py-[1%] px-[1%] text-center whitespace-nowrap overflow-hidden text-ellipsis ...
            `}
            >
              نمره کاربر
            </div>
            <div
              className={`w-[10%] max-md:w-[22%] max-md:text-[16px] py-[1%] px-[1%] text-center `}
            >
              سطح ازمون
            </div>
            <div className="w-[8%] max-md:hidden py-[1%] px-[1%] text-center">
              گواهینامه
            </div>
          </div>
        </div>
        {/* courseItemsSection */}
        <div className="flex flex-wrap justify-center items-center  mt-[0.5vw]">
          {uniq?.length == 0 ? <CustomSkeleton count={7} /> : null}
          {renderCourses()}
        </div>

        {/* paginationSection */}
        {/* <Pagination
          pageCount={Math.ceil(CourseListItem.length / itemsPerPage)}
          handlePageClick={(data) => setCurrentPage(data.selected)}
        /> */}
      </div>
      <div className="w-full flex items-center justify-center ">
        <Modal
          style={{ background: dark.bgHigh, color: dark.textHigh }}
          backdrop="opaque"
          isOpen={isOpen}
          size="4xl"
          onOpenChange={onOpenChange}
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              },
              exit: {
                y: -20,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: "easeIn",
                },
              },
            },
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 pr-14">
                  گواهینامه ازمون
                </ModalHeader>
                <ModalBody>
                  {/* <Certificate
                    name={
                      CourseListItem
                        ? CourseListItem?.fName + CourseListItem?.lName
                        : "mehdi asadi"
                    }
                    course={
                      detail
                        ? detail?.exam.title + `  سطح ${detail?.exam.Level}`
                        : ""
                    }
                    date={convertToJalali(isoDate)}
                    companyName="Bahr academy" // The company issuing the certificate
                    companyLogo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2HIo446aYfUlj3Qp3_fafI1WyxJWOnU2xRg&s" // The URL to the company logo image
                  /> */}
                  <Certificate
                    name={
                      CourseListItem
                        ? CourseListItem?.fName + CourseListItem?.lName
                        : "mehdi asadi"
                    }
                    course={
                      detail
                        ? detail?.exam.title + `  سطح ${detail?.exam.Level}`
                        : ""
                    }
                    date={convertToJalali(isoDate)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    بستن
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default CoursePage;
