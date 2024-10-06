import axios from 'axios';
import { list } from 'postcss'
import React,{ useState , useEffect } from 'react'
import { useMutation , useQueryClient } from 'react-query'; 
import { getLikeCount } from '../../../Core/Services/Api/CoursePage/LikeCount';
import { toast } from 'react-hot-toast';

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
    listStyle 
}) => {

    const [likeBtn, setLikeBtn] = useState(false);
    const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);

    useEffect(() => {
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
        if (likedPosts.includes(courseId)) {
            setLikeBtn(true);
        }
    }, [courseId]);

    const mutation = useMutation({
        mutationFn: getLikeCount,
        onSuccess: () => {
            const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
            if (!likedPosts.includes(courseId)) {
                likedPosts.push(courseId);
                localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
            }
            setLikeBtn(prev => !prev);
            setCurrentLikeCount(prev => prev + (likeBtn ? -1 : 1)); 
            toast.success('لایک شد' ,title, 'دوره')
        },
        onError: (error) => {
            console.error("Error adding like:", error);
        }
    });

    const handleLike = () => {
        // Call API to add like
        mutation.mutate(courseId);
        toast.error('ابتدا به حساب کاربری خود ورود کنید')
    };

  return (
    <div dir={`${listStyle ? 'ltr' : 'rtl'}`}  className={`relative shadow-[-15px_15px_15px_0px_#0000000D] bg-white rounded-2xl p-[5px] overflow-hidden group hover:scale-110 cursor-pointer transition-all duration-300  ${listStyle ? 'w-[100%]  h-[22.786458333333332vw]' : 'w-[250px]  h-[405px]   '}`}>
        <div className={`w-[600px] h-40 bg-[rgba(245,245,245,0.5)] absolute  transition-all duration-500 group-hover:translate-x-[-150px]  ${listStyle ? 'rotate-45 translate-x-[1000px] translate-y-[-100px] group-hover:translate-y-[250px] group-hover:translate-x-[-450px]' : 'rotate-45 translate-x-[450px] translate-y-[-50px] group-hover:translate-y-[200px]'}`}></div>
        <img src={img}  className={` bg-poster rounded-[11px] ${listStyle ? 'w-[35.807291666666664vw] h-[22.135416666666668vw]' : 'w-[100%] h-[147px]'}`} />
        <div className={`absolute  w-[70px] h-[25px] rounded-[15px] bg-[#F5F5F4] text-[11px] shadow-[0px_3px_3px_0px_#0000001F] text-[#DEDEDE] leading-[25px] ${listStyle ? 'top-[1.8229166666666667vw] left-[33.854166666666664vw]' : 'left-5 top-[140px]'}`}>{technologyList}</div>
        <h2 className={`absolute  text-[16px] font-semibold  text-right ${listStyle ? 'top-[1.166666666666667vw] right-[0.78125vw]' : 'top-[168px] '}`}>{title}</h2>
        <span className={`text-[14px] text-[#5E5E5E] absolute top-[4.166666666666667vw] right-[0.78125vw] ${listStyle ? 'block' : 'hidden'}`}>عنوان دسته بندی</span>
        <p className={`absolute mr-[10px] text-[11px] text-right  break-words  text-[#9A9A9A] ${listStyle ? 'top-[6.25vw] right-0 w-[32.552083333333336vw]' : 'top-[202px] right-[-5px] w-[100%] '}`}>{description}</p>
        
        <div className={`flex justify-center items-center gap-[5.208333333333333vw] flex-nowrap w-[31.25vw] absolute top-[11.6041666666666665vw] right-[0.78125vw] ${listStyle ? 'flex' : 'hidden'}`}>
        <div className='w-[7.096354166666667vw] h-[2.5390625vw]  flex flex-nowrap justify-center items-center gap-[0.5208333333333334vw] '>
            <span className='text-[0.5859375vw] text-[#8A8A8A]'>دانشجو تاکنون</span>
            <h2 className='text-[2.0833333333333335vw] text-[#878787]'>83</h2>
        </div>
        <div className='w-[7.096354166666667vw] h-[2.5390625vw]  flex flex-nowrap justify-center items-center gap-2 '>
            <span className='text-[0.5859375vw] text-[#8A8A8A]'>تعداد برگذاری</span>
            <h2 className='text-[2.0833333333333335vw] text-[#878787]'>83</h2>
        </div>
        <div className='w-[7.096354166666667vw] h-[2.5390625vw]  flex flex-nowrap justify-center items-center gap-[0.5208333333333334vw] '>
            <span className='text-[0.5859375vw] text-[#8A8A8A]'>اطلاعات مهم</span>
            <h2 className='text-[2.0833333333333335vw] text-[#878787]'>83</h2>
        </div>
        </div>


        <div className={`absolute  h-[2.6041666666666665vw]  flex flex-row gap-[0.5208333333333334vw] justify-center items-center ${listStyle ? 'top-[14.583333333333334vw] right-[0.78125vw]' : 'top-[261px] left-[15px]'}`}>
            <span className='text-[0.7161458333333334vw] text-[#8A8A8A]'>{teacherName}</span>
            <span className={`text-[0.5808333333333334vw] text-[#8A8A8A] absolute bottom-0 right-12 ${listStyle ? 'block' : 'hidden'}`}>12دوره فعال</span>
            <img src='' className={` bg-drop-gradient shadow-drop-shadow  ${listStyle ? 'rounded-[10px] h-[2.6041666666666665vw] w-[2.6041666666666665vw]' : 'rounded-[100%] w-[40px] h-[40px]'} `} />
        </div>
        <h2 className={` w-[11.71875vw] h-[2.2786458333333335vw] rounded-[8px] absolute top-[14.908854166666666vw] right-[20.833333333333332vw] text-[1.0416666666666667vw] text-center bg-register-course text-white leading-8 ${listStyle ? 'block' : 'hidden'}`}>ثبت نام در دوره</h2>
        <div dir='rtl' className={`absolute h-[1.5625vw]  flex flex-row gap-1 justify-center items-center ${listStyle ? 'top-[17.96875vw] right-[2.6041666666666665vw]' : 'top-[308px] left-[15px] '}`}>
            <img src='../../../../public/Image/Icon/calendar.png' className={` ${listStyle ? 'w-[0.9765625vw] h-[0.9765625vw]' : 'w-[24px] h-[24px]'}`} />
            <span className='text-[11px] ml-[70px]'>{date}</span>
            <span className='text-[10px] '>{statusName}</span>
        </div>
        <span className={`absolute text-[11px] text-[#8A8A8A] ${listStyle ? ' top-[280px] right-[325px]' : ' top-[347px] left-[190px]'}`}>هزینه دوره</span>
        <div dir='rtl' className={`absolute h-[24px]  flex flex-row gap-2 justify-center items-center ${listStyle ? ' top-[17.96875vw] right-[27.018229166666668vw]' : ' top-[343px] left-[15px]'}`}>
            <h3 className='text-[16px] text-[#DC6C6C] font-semibold price'>{price}</h3>
            <img src='../../../../public/Image/Icon/toman.png'  />
        </div>
        <div className={` bg-[#f2eefb] absolute  h-[1px] ${listStyle ? 'top-[20.182291666666668vw] right-[0.78125vw] w-[42%]' : 'top-[371px] left-0 w-[100%]'}`}></div>
        <div className={`h-3 w-3 rounded-[100%]  absolute  ${listStyle ? 'block top-[19.856770833333332vw] right-[0.5208333333333334vw]' : 'hidden top-[305px] right-2'}`}></div>
        <div dir='ltr' className={`flex flex-nowrap items-center justify-center absolute ${listStyle ? 'gap-[6.25vw]  top-[20.833333333333332vw] right-[2.6041666666666665vw]' : 'gap-8  top-[380px] right-10'}`}>
            <div className={` h-[1.1067708333333333vw] w-[2.6041666666666665vw] flex flex-row justify-center items-center gap-2 text-[11px] text-[#8A8A8A] ${listStyle ? 'block' : 'hidden w-[40px] h-[17px]'}`}>
                <span>کاربر</span>
                <img src='../../../../public/Image/Icon/users-alt.png'  />
                <span>{currentRegistrants}</span>
            </div>
            <div className='w-[40px] h-[17px] flex flex-row justify-center items-center gap-2 text-[11px]  text-[#8A8A8A]'>
                <span>{currentLikeCount}</span>
                <img src={likeBtn ? '../../../../public/Image/Icon/Likeing.png' : '../../../../public/Image/Icon/Like.png'} onClick={handleLike} />
            </div>
            <div className='w-[40px] h-[17px] flex flex-row justify-center items-center gap-2 text-[11px]  text-[#8A8A8A]'>
                <span>{courseRate}</span>
                <img src='../../../../public/Image/Icon/star.png'  />
            </div>
            <div className='w-[40px] h-[17px] flex flex-row justify-center items-center gap-2 text-[11px] text-[#8A8A8A]'>
                <span>{commandCount}</span>
                <img src='../../../../public/Image/Icon/comment.png'  />
            </div>
        </div>
    </div>
  )
}

export default CourseItem