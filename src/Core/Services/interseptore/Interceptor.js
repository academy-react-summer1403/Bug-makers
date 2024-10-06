import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
    baseURL : baseURL,
});

const onSuccess = (response) => {
    return response.data;
}

const onError = (err) => {
    console.log(err);

    if(err.response.status >= 400 && err.response.status < 500){
        console.log("Client error: "+ err.response.status)
    }
    return Promise.reject(err);
};

instance.interceptors.response.use(onSuccess,onError);

instance.interceptors.request.use((opt)=>{
    opt.headers["MessageTest"] = "Hello word";
    return opt;
});

export default instance;