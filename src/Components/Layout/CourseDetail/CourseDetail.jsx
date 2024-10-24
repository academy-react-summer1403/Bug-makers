import React from "react";
import CourseCard from "./CourseCard/CourseCard";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion

const CourseDetail = () => {
    const { id } = useParams();

    return (
        <motion.div 
            className="m-auto w-full relative text-center bg-[#f5f5f4] h-[155.78vw]"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            transition={{ duration: 0.5 }} 
        >
            <div className="w-[85%] mt-[5vw] h-[95%] m-auto flex bg-[#f5f5f4] bg-cover bg-blogBack justify-between">
                <CourseCard id={id} />
            </div>
        </motion.div>
    );
}

export default CourseDetail;
