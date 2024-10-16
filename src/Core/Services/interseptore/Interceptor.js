import axios from "axios";
import { getItem, removeItem } from "../common/storage.services";
import toast from "react-hot-toast";


const baseURL = import.meta.env.VITE_BASE_URL;
const notifyError = (err) => toast.error(err);
const instance = axios.create({
    baseURL : baseURL,
});

const onSuccess = (response) => {
    response.data.message?toast.success(response.data.message):console.log(response.data)
    return response.data;
}

const onError = (err) => {
    console.log(err);

    if(err.response.status===401){
        toast.error( err.message);
        removeItem("token")
        window.location.pathname="/sign/login"
    }

    if(err.response.status >= 400 && err.response.status < 500){
        notifyError(err.message);
    }
    return Promise.reject(err);
};

instance.interceptors.response.use(onSuccess,onError);

instance.interceptors.request.use((opt)=>{
    const token =getItem("token");
    if (token) opt.headers.Authorization = "Bearer "+token;
    return opt;
});

export default instance;