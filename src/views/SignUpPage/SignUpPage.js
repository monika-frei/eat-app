import React from "react";
import { motion } from "framer-motion";
import WelcomeTemplate from "../../templates/WelcomeTemplate/WelcomeTemplate";
import styles from "./SignUpPage.module.scss";

const transition = { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] };

const SignUpPage = () => {
  return (
    <WelcomeTemplate>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition}
        className={styles.container}
        className={styles.wrapper}
      >
        <h1>Sign up</h1>
      </motion.div>
    </WelcomeTemplate>
  );
};

export default SignUpPage;
