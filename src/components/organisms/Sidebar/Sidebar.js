import React from "react";
import { withRouter } from "react-router";
import styles from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";
import Logo from "../../atoms/Logo/Logo";
import { motion } from "framer-motion";
import SidebarButton from "../../atoms/SidebarButton/SidebarButton";

const transition = { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] };

const Sidebar = ({ pageType }) => {
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
              <SidebarButton
                border="borderSecondary"
                bgColor={pageType === "plan" && "bgSecondary"}
              >
                Plan
              </SidebarButton>
            </NavLink>
          </li>
          <li className={styles.link}>
            <NavLink to="/recepies">
              <SidebarButton
                border="borderPrimary"
                bgColor={pageType === "recepies" && "bgPrimary"}
              >
                Recepies
              </SidebarButton>
            </NavLink>
          </li>
          <li className={styles.link}>
            <NavLink to="/grocerylist">
              <SidebarButton
                border="borderTertiary"
                bgColor={pageType === "grocerylist" && "bgTertiary"}
              >
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

export default withRouter(Sidebar);