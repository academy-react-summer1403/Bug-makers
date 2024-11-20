import {motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { BiHeadphone } from "react-icons/bi";
import { useSelector } from "react-redux";
import ChatBox from "./ChatBox";


const Help = ()=>{
    const [openHelp, setOpenHelp] = useState(false);

    const dark = useSelector((state) => state.darkMood);
    return (
      <div>
        <AnimatePresence>
          <motion.div
            className={`  min-[1700px]:w-16 min-[1700px]:h-16  /* end responsive */ border w-10 z-[1000] h-10 rounded-full fixed bottom-[10px] left-[20px] cursor-pointer flex items-center justify-center
                ${dark.selectedButton === 0 ? "bg-blue-500" : ""}
                ${dark.selectedButton === 1 ? "bg-green-500" : ""}
                ${dark.selectedButton === 2 ? "bg-yellow-500" : ""}
                ${dark.selectedButton === 3 ? "bg-red-500" : ""}
                `}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              openHelp ? setOpenHelp(false) : setOpenHelp(true);
            }}
          >
            <BiHeadphone className="text-white w-[50%] h-[50%]" />
          </motion.div>
        </AnimatePresence>
        <div
          className={`fixed bottom-[70px] left-[70px] w-[400px] rounded-lg h-[500px] bg-white ${
            openHelp ? "block" : "hidden"
          } `}
        >
          <ChatBox/>
        </div>
      </div>
    );
}
export default Help