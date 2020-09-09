import React from "react";
import styles from "./WelcomeNavigation.module.scss";
import { NavLink } from "react-router-dom";
import Logo from "../../atoms/Logo/Logo";
import { motion, transform } from "framer-motion";

const transition = { duration: 1.3, ease: [0.43, 0.13, 0.23, 0.96] };

const WelcomeNavigation = () => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={transition}
      className={styles.container}
    >
      <Logo />
      <nav>
        <ul className={styles.nav}>
          <li className={styles.link}>
            <NavLink to="">Join</NavLink>
          </li>
          <li className={styles.link}>
            <NavLink to="">Log in</NavLink>
          </li>
        </ul>
      </nav>
    </motion.div>
  );
};

export default WelcomeNavigation;
