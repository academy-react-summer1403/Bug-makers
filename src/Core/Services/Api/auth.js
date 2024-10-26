import axios from "axios";
import http from "../interseptore/Interceptor.js"

export const LoginAPI = async (user)=>{
    try {
        const response = await http.post('/Sign/Login',user);

        return response
    } catch (error) {
        return false        
    }
}

export const RigesterStep1 = async (phoneNum)=>{
    try {
        const response = await http.post('/Sign/SendVerifyMessage',phoneNum);

        return response
    } catch (error) {
        return false        
    }
}

export const RigesterStep2 = async (rigester)=>{
    try {
        const response = await http.post('Sign/VerifyMessage',rigester);

        return response
    } catch (error) {
        return false        
    }
}

export const RigesterStep3 = async (rigester)=>{
    try {
        const response = await http.post('/Sign/Register',rigester);

        return response
    } catch (error) {
        return error        
    }
}

export const ForgetPassStep1 = async (forgetPass)=>{
    try {
        const response = await http.post('/Sign/ForgetPassword',forgetPass);

        return console.log(response)
    } catch (error) {
        return false     
    }
}

export const ForgetPassStep2 = async (ConfigValue)=>{
    try {
        const response = await http.get(`/Sign/Reset/${ConfigValue}`);

        return response
    } catch (errors) {
        return false     
    }
}

export const ForgetPassStep3 = async (newPass)=>{
    try {
        const response = await http.post('/Sign/Reset',newPass);

        return response
    } catch (errors) {
        return alert("دوباره تلاش کنید")       
    }
}

export const twoStepVerify = async (code, phoneNumber, password) => {
    try {
        const response = await http.post(
            `Sign/LoginTwoStep?VrifyCode=${code}`, 
            {
                phoneOrGmail: phoneNumber,
                password: password,
                rememberMe: true
            },

        );
        

        return response; 
    } catch (error) {
        return false;     
    }
}
