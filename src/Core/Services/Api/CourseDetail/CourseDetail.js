import axios from "axios";
import instance from "../../interseptore/Interceptor";


export const getCourseDetail = async (id) => {
  try {
    let url = `/Home/GetCourseDetails?CourseId=${id}`;
    

    const response = await instance.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getCourseDetailAdmin = async (id) => {
  try {
    let url = `/Course/${id}`;
    // /Home/GetCourseDetails?CourseId=

    const response = await instance.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getCourseDetailComment = async (id) => {
  try {
    let url = `/Course/GetCourseCommnets/${id}`;

    const response = await instance.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postLikeNews = async (id) => {
  try {
    let url = `/Course/AddCourseLike?CourseId=${id}`;
    const response = await instance.post(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postDissLikeNews = async (id) => {
 try {
   let url = `/Course/AddCourseDissLike?CourseId=${id}`;
   const response = await instance.post(url);
   return response;
 } catch (error) {
   console.log(error);
 }
};

export const delLikeNews = async (id) => {
  try {
    let url = "/Course/DeleteCourseLike";
    const formData = new FormData();
    formData.append("CourseLikeId", id);
    const response = await instance.delete(url, { data: formData });

    return response;
  } catch (error) {
    console.log(error);
  }
};



export const postCourseRate = async (id,num) => {
try {
  let url = `/Course/SetCourseRating?CourseId=${id}&RateNumber=` + num;
  const response = await instance.post(url);
  return response;
} catch (error) {
  console.log(error);
}
};

export const CorseReserve = async (id) => {
try{
    let url = `/CourseReserve/ReserveAdd`;
  const response = await instance.post(url,id);
  return response;
}
catch (error) {
    console.log(error);
  }
}
export const deleteCorseReserve = async (id) => {
try {
  let url = `/CourseReserve`;
  const response = await instance.delete(url, {
    data: { id },
  });
  return response;
} catch (error) {
  console.log(error);
}
};


// scazhol

export const getScDetail = async (id) => {
  try {
    let url = `/api/Schedual/GetStudentScheduals/${id}`;

    const response = await instance.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getDiscount = async (id) => {
  try {
    let url = `https://taharahimycode.liara.run/DisCost/ById/${id}`;

    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getDiscountAll = async () => {
  try {
    let url = `https://taharahimycode.liara.run/DisCost/All`;

    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};


// session 

export const CorseAB = async (id) => {
  try {
    let url = `/Session/Student_AP`;
    const response = await instance.post(url, {
      sessionId: `${id.id}`,
      courseStudent: `${id.id}`,
      present: id.val,
      studentHand: true,
      absentReason: "none",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};