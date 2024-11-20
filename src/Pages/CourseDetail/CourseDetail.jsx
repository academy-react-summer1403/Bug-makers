import React from "react";
import CourseCard from "../../Components/Layout/CourseDetail/CourseCard/CourseCard";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion
import { useSelector } from "react-redux";

const CourseDetail = () => {
    const { id } = useParams();
    const dark = useSelector((state) => state.darkMood);
    return (
      <motion.div
        style={{ background: dark.bgLow, color: dark.textHigh }}
        className="m-auto w-full relative text-center  h-[155.78vw]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-[85%] mt-[5vw] h-[95%] m-auto flex  bg-cover bg-blogBack justify-between">
          <CourseCard id={id} />
        </div>
      </motion.div>
    );
}

export default CourseDetail;
