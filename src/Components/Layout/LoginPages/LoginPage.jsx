import React from "react";
import { motion } from "framer-motion"; // Import motion
import { Outlet } from "react-router-dom";

const LoginPage = () => {
    return (
        <motion.div 
            className="w-full h-lvh flex justify-center items-center bg-white"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }} 
            transition={{ duration: 0.5 }} 
        >
            <Outlet />
        </motion.div>
    );
}

export default LoginPage;
