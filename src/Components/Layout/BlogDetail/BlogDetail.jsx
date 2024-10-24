import React from "react";
import { motion } from "framer-motion"; // Import motion
import BDetailRight from "./BDetailRight/BDetailRight";
import BDetailLeft from "./BDetailLeft/BDetailLeft";
import BDetailCenter from "./BDetailCenter/BDetailCenter";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
    const { id } = useParams();
    console.log(id);

    return (
        <motion.div 
            className="m-auto w-full relative text-center bg-[#f5f5f4]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            transition={{ duration: 0.5 }} 
        >
            <div className="w-[85%] mt-[5vw] relative m-auto flex bg-[#f5f5f4] bg-cover bg-blogBack justify-between">
                <BDetailRight />
                <BDetailCenter key={id} id={id} />
                <BDetailLeft />
            </div>
        </motion.div>
    );
}

export default BlogDetail;
