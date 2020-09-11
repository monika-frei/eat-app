import React from "react";
import styles from "./ButtonIcon.module.scss";
import cx from "classnames";

const ButtonIcon = ({ lineColor, onClick }) => {
  const lineClass = cx(styles.line, lineColor);
  const iconClass = cx(styles.icon, lineColor);
  return (
    <button className={styles.button} onClick={onClick}>
      <div className={iconClass}>
        <div className={lineClass}></div>
        <div className={lineClass}></div>
      </div>
    </button>
  );
};

export default ButtonIcon;
