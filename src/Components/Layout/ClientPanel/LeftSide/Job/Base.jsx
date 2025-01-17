import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from "@nextui-org/react";
import convertToJalali from "../../../../Common/TimeChanger/TimeToShamsi";
import DeleteModal from "../../common/DeleteModal";
import toast from "react-hot-toast";
import SearchBox from "../LikedCourse/SearchBox/SearchBox";
import { useQuery, useQueryClient } from "react-query";
import CustomSkeleton from "../../../../Common/Sceleton/CostomeSceleton";
import { deleteJob, getJobList } from "../../../../../Core/Services/Api/Client/Job";
import JobForm from "./commen/JobForm";
import { FaRegEdit } from "react-icons/fa";
import JobDetails from "./commen/JobDetail";
import JobEdit from "./commen/JobEdit";



const CoursePage = ({location,name, show, itemPerpage, setShowMoreCourse }) => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [listStyle, setListStyle] = useState(false);
  const [response, setResponse] = useState([]);
  const [detailCourse, setDetailCourse] = useState(false);
  const [detail, setDetail] = useState({});
  const [detailId, setDetailId] = useState(null);

  // delete box
  const [isDelete, setIsDelete] = useState(false);
  
  const [deleteId, setDeleteId] = useState(null);
  const [queryValue, setQueryValue] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const [fun, setFun] = useState();
  const setIsDeleteFalse = () => {
    setIsDelete(false);
  };

const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery({
    queryKey: ["getJobList"],
    queryFn: getJobList,
    onSuccess: (data) => {
      setResponse(data.jobLists || []);
      setOriginalData(data.jobLists || []);
      console.log(data.jobLists);
    },
  });  

    const DeleteIthem = async (id) => {
      console.log(deleteId);
        const res = await deleteJob(id);
        toast.success("خبر مورد نظر با موفقیت حذف شد");
      setIsDeleteFalse();
      queryClient.invalidateQueries("getJobList");
    };



const handleSearch = (e) => {
  const value = e.target.value;
  setQueryValue(value);


  if (value === "") {
    setResponse(originalData);
    return;
  }
  const filterData = originalData.filter((el) => {
    return el.jobTitle.toLowerCase().includes(value.toLowerCase());
  });
setResponse(filterData);
};
    const [selectedStatus, setSelectedStatus] = useState(null);

// const delfilter=()=>{
//   setResponse(originalData);
//   setQueryValue("")
//   setSelectedStatus(null)
// }
  const renderCourses = () => {
  
      // if(response.length==0){return(
      //     <div className="w-full mt-[2vw] text-gray-700 font-[500] text-[1.5vw] max-md:text-[16px]" >لیست{" "}{ name }{" "}خالی است</div>
      //   )}
        
          return response.map((course, index) => (
            <div
              key={index}
              style={{ background: dark.bgHigh, color: dark.textHigh }}
              className="w-full h-[3vw] max-md:justify-between max-md:border-b-1 max-md:h-[40px] rounded-[0.4vw] flex items-center text-[0.9vw]  hover:bg-gray-100"
            >
              <div className="w-[18%] h-full  py-[1%] px-[1%] text-right whitespace-nowrap overflow-hidden text-ellipsis ... max-md:w-[30%] max-md:text-[14px]">
                <Tooltip
                  className="text-gray-700 max-w-[100px] overflow-hidden text-ellipsis ...  leading-[1.5vw]"
                  content={`${course.jobTitle}`}
                >
                  <span>{course.jobTitle}</span>
                </Tooltip>
              </div>
              <div
                className={`max-md:hidden w-[30%] h-full py-[1%] px-[1%] text-right whitespace-nowrap overflow-hidden text-ellipsis ...
              `}
              >
                <Tooltip
                  placement="top-end"
                  className="text-gray-700 p-1 max-w-[500px] overflow-auto max-h-[200px]  break-words leading-[1.5vw]"
                  content={`${course.aboutJob}`}
                >
                  <span>{course.aboutJob}</span>
                </Tooltip>
              </div>
              <div
                className={`w-[14%] h-full max-md:hidden py-[1%] px-[1%]  text-center whitespace-nowrap`}
              >
                {convertToJalali(course.workStartDate)}
              </div>
              <div className="w-[14%] max-md:hidden h-full py-[1%] px-[1%] text-center whitespace-nowrap">
                {convertToJalali(course.workEndDate)}
              </div>
              <div
                className={`max-md:w-[40%]  max-md:text-[14px] w-[16%] overflow-hidden text-ellipsis ...  py-[1%] px-[1%] text-center whitespace-nowrap
                  `}
              >
                {course.companyName}
              </div>
              <div
                className={`w-[4%] max-md:ml-[10px] h-full items-center justify-end ${
                  true ? "flex" : "hidden"
                }`}
              >
                <JobEdit detail={course} />
              </div>

              <div
                className={`w-[4%] ml-2 max-md:ml-[10px] h-full items-center justify-end ${
                  true ? "flex" : "hidden"
                }`}
              >
                {" "}
                <Tooltip
                  className="text-gray-500 w-[7vw] leading-[1.2vw] text-sm"
                  content={"نمایش جزییات"}
                >
                  <svg
                    onClick={() => {
                      onOpen();
                      setDetail(course);
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
              </div>
              <div className="w-[4%] h-full flex items-center justify-center cursor-pointer">
                <Tooltip
                  className="text-gray-700 w-[7vw] leading-[1.5vw]"
                  content={"حذف از لیست"}
                >
                  <svg
                    onClick={() => {
                      setIsDelete(true);
                      setDeleteId(course.id);
                    }}
                    width=""
                    height="50%"
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
                </Tooltip>
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
        className={`fixed top-[40%]  max-md:left-[90%] left-[50%] translate-x-[-100%] ${
          isDelete == true ? "flex" : "hidden"
        }`}
      >
        <DeleteModal
          onCancel={setIsDeleteFalse}
          onDelete={DeleteIthem}
          id={deleteId}
        />
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
          className={`h-[10%]  w-full max-md:grid  relative flex-row flex-wrap justify-between items-center gap-x-3 max-md:gap-y-[20px]  rounded-[10px] shadow-[-5px_5px_5px_0px_#0000001C] p-3
            ${true ? "flex max-md:grid max-md:grid-cols-2" : "hidden"}`}
        >
          <SearchBox
            width={"20%"}
            lgWidth={"160px"}
            placeHolder="جست جو کنید ..."
            value={`${queryValue}`}
            onChange={handleSearch}
          />

          <JobForm />
        </div>

        <div className=" w-full mt-[0.5vw] max-md:py-[10px]">
          <div
            style={{ background: dark.bgLow, color: dark.textLow }}
            className="flex items-center  w-full rounded-[0.5vw]  text-[0.9vw] leading-normal"
          >
            <div
              className={`w-[19%]  py-[1%] px-[1%] text-right max-md:text-[16px] max-md:w-[40%] 
                
              `}
            >
              عنوان شغل
            </div>
            <div className="w-[30%] max-md:hidden  py-[1%] px-[1%] text-right">
              درباره شغل
            </div>
            <div
              className={`w-[14%]  py-[1%] px-[1%] text-center max-md:hidden `}
            >
              تاریخ شروع
            </div>
            <div
              className={` max-md:hidden w-[14%] h-full py-[1%] px-[1%] text-center whitespace-nowrap overflow-hidden text-ellipsis ...
            `}
            >
              تاریخ پایان
            </div>
            <div
              className={`w-[16%] max-md:text-[16px] max-md:w-[40%] py-[1%] px-[1%] text-center `}
            >
              شرکت
            </div>
            <div className="w-[4%]  py-[1%] px-[1%] text-center"></div>
            <div className="w-[4%]  py-[1%] px-[1%] text-center"></div>
            <div className="w-[4%]  py-[1%] px-[1%] text-center"></div>
          </div>
        </div>
        {/* courseItemsSection */}
        <div className="flex flex-wrap justify-center items-center  mt-[0.5vw]">
          {response?.length == 0 ? <CustomSkeleton count={7} /> : null}
          {renderCourses()}
        </div>
      </div>
      <div className="w-full flex items-center justify-center ">
        <Modal
          style={{ background: dark.bgHigh, color: dark.textHigh }}
          backdrop="blur"
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
                <ModalHeader className="flex flex-col gap-1 ">
                  جزییات شغل
                </ModalHeader>
                <ModalBody>
                  <JobDetails jobData={detail} />
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
