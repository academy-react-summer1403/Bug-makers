import axios from 'axios';
import { list } from 'postcss'
import React,{ useState , useEffect } from 'react'
import { useMutation , useQuery, useQueryClient } from 'react-query'; 
import { getLikeCount } from '../../../Core/Services/Api/CoursePage/LikeCount';
import { toast } from 'react-hot-toast';
import img2 from '../../../../public/images/icon/image.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getDiscount } from '../../../Core/Services/Api/CourseDetail/CourseDetail';
const CourseItem = ({
  title,
  courseId,
  img,
  description,
  technologyList,
  teacherName,
  likeCount,
  commandCount,
  courseRate,
  statusName,
  price,
  currentRegistrants,
  date,
  listStyle,
  discount,
}) => {
  const [likeBtn, setLikeBtn] = useState(false);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    if (likedPosts.includes(courseId)) {
      setLikeBtn(true);
    }
  }, [courseId]);



  discount ? console.log(discount) :null

  const mutation = useMutation({
    mutationFn: getLikeCount,
    onSuccess: () => {
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
      if (!likedPosts.includes(courseId)) {
        likedPosts.push(courseId);
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
      }
      setLikeBtn((prev) => !prev);
      setCurrentLikeCount((prev) => prev + (likeBtn ? -1 : 1));
      toast.success("لایک شد", title, "دوره");
    },
    onError: (error) => {
      console.error("Error adding like:", error);
    },
  });

  const handleLike = (e) => {
    // Call API to add like
    e.stopPropagation();
    e.preventDefault();
    e.preventDefault();
    mutation.mutate(courseId);
  };
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/CourseDetail/${courseId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const dark = useSelector((state) => state.darkMood);
  return (
    <div
      style={{ background: dark.bgHigh, color: dark.textHigh }}
      onClick={handleNavigate}
      dir={`${listStyle ? "ltr" : "rtl"}`}
      className={`relative shadow-[-15px_15px_15px_0px_#0000000D]  rounded-2xl p-[5px] overflow-hidden group hover:scale-110 cursor-pointer transition-all duration-300  ${
        listStyle
          ? "w-[100%]  h-[22.786458333333332vw]"
          : "w-[250px]  h-[405px]   "
      }`}
    >
      <div
        className={`w-[600px] h-40 bg-[rgba(245,245,245,0.5)] absolute  transition-all duration-500 group-hover:translate-x-[-150px]  ${
          listStyle
            ? "rotate-45 translate-x-[1000px] translate-y-[-100px] group-hover:translate-y-[250px] group-hover:translate-x-[-450px]"
            : "rotate-45 translate-x-[450px] translate-y-[-50px] group-hover:translate-y-[240px]"
        }`}
      ></div>
      <img
        src={img ? img : img2}
        onError={(e) => {
          e.target.src = img2;
        }}
        className={` bg-poster rounded-[11px] ${
          listStyle
            ? "w-[35.807291666666664vw] h-[22.135416666666668vw]"
            : "w-[100%] h-[147px]"
        }`}
      />
      <div
        style={{ background: dark.bgHigh, color: dark.textHigh }}
        className={`absolute  w-[70px] h-[25px] rounded-[15px] text-[11px] shadow-[0px_3px_3px_0px_#0000001F] leading-[25px] line-clamp-1 ${
          listStyle
            ? "top-[1.8229166666666667vw] left-[33.854166666666664vw]"
            : "left-5 top-[140px]"
        }`}
      >
        {technologyList}
      </div>
      <h2
        className={`absolute  text-[16px] font-semibold  text-right overflow-hidden text-ellipsis ... h-[7%] ${
          listStyle
            ? "top-[1.166666666666667vw] right-[0.78125vw]"
            : "top-[168px] "
        }`}
      >
        {title}
      </h2>
      <span
        className={`text-[14px] text-[#5E5E5E] absolute top-[4.166666666666667vw] right-[0.78125vw] ${
          listStyle ? "block" : "hidden"
        }`}
      >
        عنوان دسته بندی
      </span>
      <p
        className={`absolute mr-[10px] text-[11px] text-right break-words text-[#9A9A9A] ${
          listStyle
            ? "top-[6.25vw] right-0 w-[32.552083333333336vw]"
            : "top-[202px] right-[-5px] w-[100%]"
        } line-clamp-3`}
      >
        {description}
      </p>

      <div
        className={`flex justify-center items-center gap-[5.208333333333333vw] flex-nowrap w-[31.25vw] absolute top-[11.6041666666666665vw] right-[0.78125vw] ${
          listStyle ? "flex" : "hidden"
        }`}
      >
        <div className="w-[7.096354166666667vw] h-[2.5390625vw]  flex flex-nowrap justify-center items-center gap-[0.5208333333333334vw] ">
          <span className="text-[0.5859375vw] text-[#8A8A8A]">
            دانشجو تاکنون
          </span>
          <h2 className="text-[2.0833333333333335vw] text-[#878787]">83</h2>
        </div>
        <div className="w-[7.096354166666667vw] h-[2.5390625vw]  flex flex-nowrap justify-center items-center gap-2 ">
          <span className="text-[0.5859375vw] text-[#8A8A8A]">
            تعداد برگذاری
          </span>
          <h2 className="text-[2.0833333333333335vw] text-[#878787]">83</h2>
        </div>
        <div className="w-[7.096354166666667vw] h-[2.5390625vw]  flex flex-nowrap justify-center items-center gap-[0.5208333333333334vw] ">
          <span className="text-[0.5859375vw] text-[#8A8A8A]">اطلاعات مهم</span>
          <h2 className="text-[2.0833333333333335vw] text-[#878787]">83</h2>
        </div>
      </div>

      <div
        className={`absolute  h-[2.6041666666666665vw]  flex flex-row gap-[0.5208333333333334vw] justify-center items-center ${
          listStyle
            ? "top-[14.583333333333334vw] right-[0.78125vw]"
            : "top-[245px] left-[15px]"
        }`}
      >
        <span className="text-[13px] text-[#8A8A8A]">{teacherName}</span>
        <span
          className={`text-[0.5808333333333334vw] text-[#8A8A8A] absolute bottom-0 right-12 ${
            listStyle ? "block" : "hidden"
          }`}
        >
          12دوره فعال
        </span>
        <img
          src={img2}
          className={` bg-drop-gradient shadow-drop-shadow  ${
            listStyle
              ? "rounded-[10px] h-[2.6041666666666665vw] w-[2.6041666666666665vw]"
              : "rounded-[100%] w-[40px] h-[40px]"
          } `}
        />
      </div>
      <h2
        className={` w-[11.71875vw] h-[2.2786458333333335vw] rounded-[8px] absolute top-[14.908854166666666vw] right-[20.833333333333332vw] text-[1.0416666666666667vw] text-center bg-register-course text-white leading-8 ${
          listStyle ? "block" : "hidden"
        }`}
      >
        ثبت نام در دوره
      </h2>
      <div
        dir="rtl"
        className={`absolute h-[1.5625vw]  flex flex-row gap-1 justify-center items-center ${
          listStyle
            ? "top-[17.96875vw] right-[2.6041666666666665vw]"
            : "top-[292px] left-[15px] "
        }`}
      >
        <svg
          className={` ${
            listStyle ? "w-[0.9765625vw] h-[0.9765625vw]" : "w-[24px] h-[24px]"
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 2H18V1C18 0.447715 17.5523 0 17 0C16.4477 0 16 0.447715 16 1V2H8V1C8 0.447715 7.55228 0 7 0C6.44772 0 6 0.447715 6 1V2H5C2.23995 2.00331 0.00330687 4.23995 0 7V19C0.00330687 21.7601 2.23995 23.9967 5 24H19C21.7601 23.9967 23.9967 21.7601 24 19V7C23.9967 4.23995 21.7601 2.00331 19 2ZM2 7C2 5.34315 3.34315 4 5 4L19 4C20.6569 4 22 5.34315 22 7V8H2V7ZM19 22H5C3.34315 22 2 20.6569 2 19V10H22V19C22 20.6569 20.6569 22 19 22Z"
            fill="#7A7A7A"
          />
          <circle cx="12" cy="15" r="1.5" fill="#7A7A7A" />
          <circle cx="7" cy="15" r="1.5" fill="#7A7A7A" />
          <circle cx="17" cy="15" r="1.5" fill="#7A7A7A" />
        </svg>

        <span className="text-[11px] ml-[70px]">{date}</span>
        <span className="text-[10px] ">{statusName}</span>
      </div>
      <span
        className={`absolute text-[11px] text-[#8A8A8A] ${
          listStyle ? " top-[280px] right-[325px]" : " top-[347px] left-[190px]"
        }`}
      >
        هزینه دوره
      </span>
      <div
        dir="rtl"
        className={`absolute h-[38px]  ${
          listStyle
            ? " top-[17.96875vw] right-[27.018229166666668vw]"
            : discount 
            ? " top-[320px] left-[15px]"
            : " top-[335px] left-[15px]"
        }`}
      >
        <div className="flex flex-row gap-2 justify-center items-cente">
          <h3 className="text-[16px] text-[#DC6C6C] font-semibold price">
            {discount  ? discount.Pcost : price}
          </h3>

          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.49352 0.990824L3.36666 0.142822L4.2581 0.999967L3.37124 1.84683L2.49352 0.990824ZM6.18496 3.82512C6.18496 4.53598 6.0021 5.09484 5.63867 5.50169C5.40895 5.75427 5.11067 5.94741 4.74381 6.07884C4.34474 6.21048 3.92623 6.27347 3.50609 6.26512H2.87181C2.39066 6.26512 1.95637 6.18055 1.57009 6.01027C1.15277 5.83468 0.795441 5.54167 0.541515 5.16684C0.270814 4.74114 0.132042 4.24491 0.142656 3.74055C0.142656 3.67312 0.143799 3.60683 0.147228 3.5394C0.181513 2.91083 0.380371 2.21597 0.747229 1.4514L1.99866 2.00454C1.70495 2.61254 1.54495 3.1474 1.5198 3.60797C1.51752 3.65369 1.51523 3.6994 1.51523 3.74512C1.51523 4.03312 1.57809 4.26855 1.70495 4.4514C1.84133 4.64985 2.04389 4.79327 2.27638 4.85598C2.37352 4.88798 2.4798 4.91083 2.59409 4.92455C2.68438 4.93598 2.77695 4.94055 2.87181 4.94055H3.50609C4.02952 4.94055 4.38495 4.84798 4.57238 4.66169C4.73238 4.50283 4.81238 4.22398 4.81238 3.82626V1.30854H6.18382V3.82512H6.18496ZM12.3941 7.46398L11.5713 6.66398L12.3815 5.85712L13.2215 6.66513L12.3941 7.46513L12.3941 7.46398ZM9.13011 7.81599C9.74954 7.81599 10.2421 8.03313 10.6078 8.46627C10.9473 8.8617 11.1164 9.35427 11.1164 9.94399V10.36H11.3221V10.3554H11.7907C12.0433 10.3554 12.2215 10.3234 12.3244 10.2594C12.4307 10.1966 12.4844 10.0994 12.4844 9.96456V9.8857C12.489 9.60799 12.5038 8.69256 12.4844 8.61142L13.857 8.19999V9.99885C13.8604 10.355 13.745 10.702 13.529 10.9851C13.1793 11.448 12.6101 11.6789 11.8204 11.6789H11.1038C11.0341 12.5166 10.6078 13.1154 9.82725 13.4766C9.52211 13.616 9.16439 13.7166 8.75639 13.7794C8.41074 13.8323 8.06148 13.8579 7.71182 13.856V12.5314C8.41125 12.5314 8.93696 12.4377 9.28897 12.2491C9.57468 12.0983 9.71868 11.9086 9.71868 11.6789H9.13011C8.63182 11.6789 8.20782 11.5497 7.85811 11.2914C7.43868 10.9794 7.22953 10.5291 7.22953 9.94285C7.22953 9.38513 7.36896 8.91313 7.64896 8.5257C7.98725 8.05142 8.48096 7.81484 9.13011 7.81484L9.13011 7.81599ZM9.73925 10.36V9.94399C9.73925 9.69599 9.68439 9.49942 9.57582 9.35427C9.47157 9.21391 9.30483 9.13396 9.13011 9.14056C8.95357 9.13444 8.78497 9.21406 8.67753 9.35428C8.56866 9.50256 8.51381 9.68364 8.52211 9.86742C8.52193 9.89298 8.52307 9.91854 8.52553 9.94399C8.53468 10.0868 8.60096 10.1954 8.72782 10.2674C8.83411 10.3291 8.96782 10.3588 9.13011 10.3588H9.73925L9.73925 10.36ZM9.85697 6.66512L10.6798 7.46513L11.5073 6.66512L10.6673 5.85712L9.85697 6.66512ZM2.20666 12.2514H2.24095C2.73581 12.24 3.09238 12.1303 3.31181 11.92C3.33924 11.9337 3.38609 11.96 3.44895 11.9977L3.53352 12.0423L3.62609 12.0903C3.78038 12.1737 3.92438 12.2423 4.05924 12.296C4.45352 12.4629 4.82495 12.5474 5.17581 12.5474C5.54576 12.5554 5.90362 12.4156 6.1701 12.1589C6.51296 11.8331 6.68324 11.3428 6.68324 10.6891C6.67918 10.2259 6.54664 9.77291 6.30039 9.38056C5.95867 8.85827 5.46381 8.5977 4.81467 8.5977C4.24095 8.5977 3.76781 8.81713 3.39524 9.25484C3.26609 9.4057 3.15524 9.57942 3.05924 9.77599C3.02266 9.84684 2.99066 9.91884 2.96324 9.99427C2.94936 10.023 2.93789 10.0528 2.92895 10.0834C2.92013 10.1061 2.91175 10.129 2.90381 10.152C2.78609 10.5051 2.70838 10.7063 2.66952 10.7577C2.58723 10.8606 2.42495 10.9177 2.18152 10.9257C2.04095 10.92 1.94266 10.8914 1.88895 10.8388C1.8238 10.7771 1.7918 10.664 1.7918 10.4994V6.99998L0.419228 6.42855V10.4994C0.419228 10.7977 0.474086 11.0663 0.582657 11.3029C0.6638 11.4834 0.774658 11.6411 0.914087 11.7749C1.05466 11.9097 1.21809 12.016 1.40552 12.0949C1.6318 12.1909 1.88552 12.2434 2.16552 12.2503V12.2514L2.20666 12.2514ZM5.35181 11.0926C5.39951 10.9638 5.41672 10.8257 5.4021 10.6891C5.39307 10.4955 5.32751 10.3088 5.21353 10.152C5.09924 9.99885 4.96553 9.92227 4.81353 9.92227C4.60781 9.92227 4.43638 10.04 4.30267 10.2766C4.25467 10.3577 4.21124 10.4571 4.17238 10.576C4.15596 10.6213 4.14072 10.667 4.12667 10.7131L4.10952 10.7737L4.09238 10.8263C4.25467 10.9611 4.46153 11.0731 4.7141 11.1611C4.91981 11.232 5.08553 11.2663 5.20896 11.2663C5.25924 11.2663 5.30724 11.2091 5.35181 11.0926Z"
              fill="#7D7D7D"
            />
          </svg>
        </div>
        {discount  ? (
          <div className="flex justify-between">
            <h3 className="text-[14px] block line-through decoration-[1.5px]	decoration-gray-500 text-[#f3aeae]  price">
              {discount.Tcost}
            </h3>
            <div className="size-[22px] text-center leading-[20px] rounded-full bg-red-500 text-[10px] text-white">
              {discount.discount}%
            </div>
          </div>
        ) : null}
      </div>
      <div
        className={` bg-[#f2eefb] absolute  h-[1px] ${
          listStyle
            ? "top-[20.182291666666668vw] right-[0.78125vw] w-[42%]"
            : "top-[371px] left-0 w-[100%]"
        }`}
      ></div>
      <div
        className={`h-3 w-3 rounded-[100%]  absolute  ${
          listStyle
            ? "block top-[19.856770833333332vw] right-[0.5208333333333334vw]"
            : "hidden top-[305px] right-2"
        }`}
      ></div>
      <div
        dir="ltr"
        className={`flex flex-nowrap items-center justify-center absolute ${
          listStyle
            ? "gap-[6.25vw]  top-[20.833333333333332vw] right-[2.6041666666666665vw]"
            : "gap-8  top-[380px] right-10"
        }`}
      >
        <div
          className={` h-[1.1067708333333333vw] w-[2.6041666666666665vw] flex flex-row justify-center items-center gap-2 text-[11px] text-[#8A8A8A] ${
            listStyle ? "block" : "hidden w-[40px] h-[17px]"
          }`}
        >
          <span>کاربر</span>
          <img src="../../../../public/images/icon/users-alt.png" />
          <span>{currentRegistrants}</span>
        </div>
        <div className="w-[50px] h-[19px] flex flex-row justify-center items-center gap-2 text-[11px]  text-[#8A8A8A]">
          <span>{currentLikeCount}</span>
          <svg
            className="relative z-10 active:scale-150 transition-all duration-150"
            onClick={handleLike}
            width=""
            height="100%"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5815 9.53674e-07C12.6722 0.0296979 10.9247 1.07823 10 2.74887C9.07533 1.07823 7.32778 0.0296972 5.41855 8.34465e-07C2.30577 0.135243 -0.113381 2.75909 0.00410423 5.87259C0.00410423 9.6602 3.9908 13.7968 7.33443 16.6015C8.87553 17.8966 11.1245 17.8966 12.6656 16.6015C16.0092 13.7968 19.9959 9.6602 19.9959 5.87259C20.1134 2.75909 17.6942 0.135244 14.5815 9.53674e-07ZM11.5952 15.327C10.6734 16.1033 9.32662 16.1033 8.40482 15.327C4.12491 11.736 1.67009 8.29076 1.67009 5.87259C1.55155 3.67865 3.2255 1.80011 5.41855 1.66598C7.61159 1.80011 9.28554 3.67865 9.16701 5.87259C9.16701 6.33264 9.53995 6.70558 10 6.70558C10.46 6.70558 10.833 6.33264 10.833 5.87259C10.7145 3.67865 12.3884 1.80011 14.5815 1.66598C16.7745 1.80011 18.4484 3.67865 18.3299 5.87259C18.3299 8.29076 15.8751 11.736 11.5952 15.3237V15.327Z"
              fill={likeBtn ? "#ff5454" : "#8A8A8A"}
            />
          </svg>
        </div>
        <div className="w-[40px] h-[17px] flex flex-row justify-center items-center gap-2 text-[11px]  text-[#8A8A8A]">
          <span>{courseRate}</span>
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.5134 7.40725C20.1518 6.25634 19.0793 5.47791 17.873 5.49087H14.1117L12.9692 1.93016C12.6006 0.780157 11.5313 2.08616e-07 10.3237 0C9.11603 0 8.04671 0.780157 7.6781 1.93016L6.53568 5.49087H2.77437C1.57307 5.49258 0.508955 6.26623 0.136835 7.40844C-0.235286 8.55066 0.168898 9.80266 1.13865 10.5117L4.20004 12.75L3.03609 16.3547C2.64979 17.5028 3.0645 18.7683 4.0554 19.4651C5.02932 20.1843 6.36017 20.1777 7.32685 19.4488L10.3237 17.2431L13.3213 19.4462C14.2925 20.1605 15.6136 20.167 16.5917 19.4621C17.5698 18.7572 17.9817 17.502 17.6112 16.3547L16.4473 12.75L19.5121 10.5117C20.4939 9.81087 20.9007 8.54963 20.5134 7.40725ZM18.4963 9.12132L14.9287 11.729C14.6281 11.9483 14.5024 12.3358 14.617 12.6898L15.9729 16.8824C16.1137 17.3187 15.957 17.7959 15.585 18.0639C15.2131 18.3318 14.7107 18.3292 14.3415 18.0575L10.8333 15.4748C10.5301 15.252 10.1173 15.252 9.81401 15.4748L6.30581 18.0575C5.93673 18.333 5.43172 18.3376 5.0577 18.0688C4.68367 17.8001 4.52684 17.3201 4.67009 16.8824L6.03032 12.6898C6.14496 12.3358 6.01925 11.9483 5.71867 11.729L2.15108 9.12132C1.78253 8.85147 1.62918 8.37531 1.77097 7.9411C1.91277 7.50689 2.3176 7.21301 2.77437 7.21269L7.165 7.21269C7.53893 7.21269 7.87013 6.97126 7.98457 6.61524L9.31898 2.45618C9.45952 2.01952 9.86581 1.72347 10.3245 1.72347C10.7832 1.72347 11.1895 2.01952 11.3301 2.45618L12.6645 6.61522C12.7789 6.97124 13.1101 7.21267 13.4841 7.21269H17.8747C18.3315 7.21301 18.7363 7.50689 18.8781 7.9411C19.0199 8.37531 18.8665 8.85147 18.498 9.12132H18.4963Z"
              fill="#8A8A8A"
            />
          </svg>
        </div>
        <div className="w-[40px] h-[17px] flex flex-row justify-center items-center gap-2 text-[11px] text-[#8A8A8A]">
          <span>{commandCount}</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.9808 9.3832C19.6451 3.95028 15.0255 -0.216173 9.58687 0.0086889C4.14823 0.23355 -0.111612 4.76712 0.00222945 10.2092C0.116068 15.6513 4.56178 20.0028 10.0051 20H15.8184C18.1163 19.9977 19.9785 18.1354 19.9808 15.8375L19.9808 9.3832ZM18.3159 15.8375C18.3159 17.2169 17.1977 18.335 15.8184 18.335H10.0051C7.62926 18.3339 5.36615 17.322 3.78133 15.552C2.18833 13.7823 1.43695 11.411 1.72008 9.04687C2.17463 5.25534 5.14038 2.25362 8.92615 1.75339C9.28515 1.70839 9.64658 1.68559 10.0084 1.68512C11.9485 1.67983 13.8285 2.3577 15.3189 3.59986C17.0778 5.06172 18.1609 7.18043 18.3159 9.46228L18.3159 15.8375Z"
              fill="#8A8A8A"
            />
            <path
              d="M6.4375 7.74072H10.4375C10.9898 7.74072 11.4375 7.29301 11.4375 6.74072C11.4375 6.18844 10.9898 5.74072 10.4375 5.74072H6.4375C5.88522 5.74072 5.4375 6.18844 5.4375 6.74072C5.4375 7.29301 5.88522 7.74072 6.4375 7.74072Z"
              fill="#8A8A8A"
            />
            <path
              d="M13.9907 9.00989H5.99072C5.43844 9.00989 4.99072 9.4576 4.99072 10.0099C4.99072 10.5622 5.43844 11.0099 5.99072 11.0099H13.9907C14.543 11.0099 14.9907 10.5622 14.9907 10.0099C14.9907 9.4576 14.543 9.00989 13.9907 9.00989Z"
              fill="#8A8A8A"
            />
            <path
              d="M13.9907 12.2791H5.99072C5.43844 12.2791 4.99072 12.7268 4.99072 13.2791C4.99072 13.8313 5.43844 14.2791 5.99072 14.2791H13.9907C14.543 14.2791 14.9907 13.8313 14.9907 13.2791C14.9907 12.7268 14.543 12.2791 13.9907 12.2791Z"
              fill="#8A8A8A"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CourseItem