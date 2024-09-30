
import React from "react";
import Login from "./login/Login";
import ForgetPass from "./passForget/ForgetPass";
import ReStep1 from "./register/step1/ReStep1";
import ReStep2 from "./register/step2/ReStep2";
import ReStep4 from "./register/step4/ReStep4";

const LoginPage = () => {
    return(
        <div className="w-full h-lvh flex justify-center items-center bg-white">
            {/* <Login /> */}
            <ForgetPass/>
            {/* <ReStep1/> */}
            {/* <ReStep2/> */}
            {/* <ReStep4/> */}

            

        </div>
    );
}
export default LoginPage;