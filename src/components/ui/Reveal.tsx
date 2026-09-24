"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

export default function Reveal({
  children,
}: Props) {

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 80,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 1.2,
        ease: "easeOut",
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
    >
      {children}
    </motion.div>

  );
}