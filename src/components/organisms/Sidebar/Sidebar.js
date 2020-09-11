import React from "react";
import styles from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";
import Logo from "../../atoms/Logo/Logo";
import { motion } from "framer-motion";
import SidebarButton from "../../atoms/SidebarButton/SidebarButton";

const transition = { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] };

const Sidebar = () => {
  return (
    <motion.div
      exit={{ opacity: 1 }}
      transition={transition}
      className={styles.container}
    >
      <Logo />
      <nav className={styles.wrapper}>
        <ul className={styles.nav}>
          <li className={styles.link}>
            <NavLink to="/plan">
              <SidebarButton border="borderSecondary">Plan</SidebarButton>
            </NavLink>
          </li>
          <li className={styles.link}>
            <NavLink to="/recepies">
              <SidebarButton border="borderPrimary">Recepies</SidebarButton>
            </NavLink>
          </li>
          <li className={styles.link}>
            <NavLink to="/shoppinglist">
              <SidebarButton border="borderTertiary">
                Shopping List
              </SidebarButton>
            </NavLink>
          </li>
        </ul>
      </nav>
      <NavLink to="">
        <h3 className={styles.logout}> Log out </h3>
      </NavLink>
    </motion.div>
  );
};

export default Sidebar;
