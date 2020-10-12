import React, { useState } from "react";
import styles from "./Header.module.scss";
import { useViewport } from "../../../hooks/index";
import { motion } from "framer-motion";
import HamburgerMenu from "../../organisms/HamburgerMenu/HamburgerMenu";
import WelcomeNavigation from "../WelcomeNavigation/WelcomeNavigation";
import Sidebar from "../Sidebar/Sidebar";

const transition = { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] };

const Header = ({ pageType }) => {
  const [logged, setLogged] = useState(true);
  const { width } = useViewport();
  const breakpoint = 1260;
  const menuItemsLogged = ["Plan", "Recepies", "Grocery List", "Log Out"];
  const menuItems = ["Log in", "Sign up"];
  return (
    <motion.div
      exit={{ opacity: 1 }}
      transition={transition}
      className={styles.container}
    >
      {width < breakpoint && logged && (
        <HamburgerMenu menuItems={menuItemsLogged} />
      )}
      {width >= breakpoint && logged && <Sidebar pageType={pageType} />}
      {width < breakpoint && !logged && <HamburgerMenu menuItems={menuItems} />}
      {width >= breakpoint && !logged && <WelcomeNavigation />}
    </motion.div>
  );
};

export default Header;
