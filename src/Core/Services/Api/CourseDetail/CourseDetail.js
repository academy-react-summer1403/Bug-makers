import instance from "../../interseptore/Interceptor";


export const getCourseDetail = async (id) => {
  let url = `/Home/GetCourseDetails?CourseId=${id}`;

  const response = await instance.get(url);
  return response; 
};

export const getCourseDetailComment = async (id) => {
  let url = `/Course/GetCourseCommnets/${id}`;

  const response = await instance.get(url);
  return response; 
};

export const postLikeNews = async (id) => {
  let url = `/Course/AddCourseLike?CourseId=${id}`;
  console.log(url)

  const response = await instance.post(url);
  return response; 
};

export const postDissLikeNews = async (id) => {
  let url = `/Course/AddCourseDissLike?CourseId=${id}`;
  console.log(url)

  const response = await instance.post(url);
  return response
};

export const delLikeNews = async (id) => {
  let url = "/Course/DeleteCourseLike";
  
  console.log(id)
  const response = await instance.delete(url, { "CourseLikeId": id });
  
  return response
};

export const postCourseRate = async (id,num) => {
  console.log(num)
  let url = `/Course/SetCourseRating?CourseId=${id}&RateNumber=`+num;
  
  console.log(url);

  const response = await instance.post(url);
  return response;
};

export const CorseReserve = async (id) => {

  let url = `/CourseReserve/ReserveAdd`;
  
  console.log(id);

  const response = await instance.post(url,id);
  return response;
};