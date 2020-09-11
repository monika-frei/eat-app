import React from "react";
import styles from "./UserPageTemplate.module.scss";
import Sidebar from "../../components/organisms/Sidebar/Sidebar";
import cx from "classnames";

const UserPageTemplate = ({ children, bgColor, border }) => {
  const cardClass = cx(styles.card, bgColor, border);
  return (
    <div className={styles.container}>
      <div className={cardClass}>
        <Sidebar />
        <div className={styles.wrapper}>{children}</div>
      </div>
    </div>
  );
};

export default UserPageTemplate;
