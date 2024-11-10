import axios from "axios";
import { getItem, removeItem } from "../common/storage.services";
import toast from "react-hot-toast";


const baseURL = import.meta.env.VITE_BASE_URL;
const notifyError = (err) => toast.error(err);
const instance = axios.create({
    baseURL : baseURL,
});

const onSuccess = (response) => {
    // if(response.status === 200){
    //     toast.success(response.data.message);
    // }

    return response.data;
}

const onError = (err) => {
    console.log(err);
    if(err.status === 401){
        removeItem("token")
        // setTimeout(() => {
        //     window.location.pathname="/sign/login"            
        // }, 1500);
        toast.error('ابتدا وارد حساب کاربری خود شوید')
    }

    if(err.response.status >= 400 && err.response.status < 500 && err.response.status != 401){
        {
          err.response.data.ErrorMessage[0]
            ? notifyError(err.response.data.ErrorMessage[0])
            : notifyError(err.message)
        }
    }
    return Promise.reject(err);
};

instance.interceptors.response.use(onSuccess,onError);

instance.interceptors.request.use((opt)=>{
    const token = getItem("token");
    if (token) opt.headers.Authorization = "Bearer "+ token;
    return opt;
});

export default instance;



// .......................
// import axios from 'axios';

// const baseURL = import.meta.env.VITE_BASE_URL;

// const instance = axios.create({
//   baseURL: baseURL,
// });

// instance.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default instance;

