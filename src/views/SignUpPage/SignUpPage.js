import React from "react";
import { motion } from "framer-motion";

const SignUpPage = () => {
  return (
    <motion.div
      initial={{ transform: "translate(0)" }}
      animate={{ transform: "translate(0)" }}
      exit={{ transform: "translate(-200vw)" }}
    >
      <h1>Sign up</h1>
    </motion.div>
  );
};

export default SignUpPage;
