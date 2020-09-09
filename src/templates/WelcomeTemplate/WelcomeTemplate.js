import React from "react";
import styles from "./WelcomeTemplate.module.scss";
import WelcomeNavigation from "../../components/organisms/WelcomeNavigation/WelcomeNavigation";

const WelcomeTemplate = ({ children }) => {
  return (
    <div className={styles.container}>
      <WelcomeNavigation />
      {children}
    </div>
  );
};

export default WelcomeTemplate;
