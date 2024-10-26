import instance from "../../interseptore/Interceptor";

export const AddCourseFavorite = async ({id}) => {
  const response = await instance.post
  ('/Course/AddCourseFavorite' , {
    courseId : id
} );
  return response; 
};