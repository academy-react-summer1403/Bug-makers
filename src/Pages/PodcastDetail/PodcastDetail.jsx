import React from "react";
import { motion } from "framer-motion"; // Import motion


import BDetailCenter from "../../Components/Layout/PodcastDetail/BDetailCenter/BDetailCenter";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const PodcastDetail = () => {
  const { id } = useParams();
  console.log(id);
  const dark = useSelector((state) => state.darkMood);
  return (
    <motion.div
      style={{ background: dark.bgLow, color: dark.textHigh }}
      className="m-auto w-full relative text-center bg-[#f5f5f4]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-[85%]  max-w-[2400px]  mt-[5vw] relative m-auto flex bg-cover bg-blogBack justify-between">
        {/* <BDetailRight /> */}
        <BDetailCenter key={id} id={id} />
        {/* <BDetailLeft /> */}
      </div>
    </motion.div>
  );
};

export default PodcastDetail;
