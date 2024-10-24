import React from 'react'
import { motion } from 'framer-motion'

const TextLanding = ({ h3Text , pText  }) => {

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

  return (
    <div >
        {/* Animated h3 and p */}
      <motion.h3 
        className='max-[784px]:text-[3vw] text-[1.953125vw]  '
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {h3Text}
      </motion.h3>

      <motion.p
        className='max-[784px]:text-[1.5vw] text-[0.9416666666666667vw] leading-[4.369791666666667vw]'
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {pText}
      </motion.p>
    </div>
  )
}

export default TextLanding