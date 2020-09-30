import React from "react";
import styles from "./ListItem.module.scss";
import cx from "classnames";
import { Link } from "react-router-dom";

const ListItem = ({ title, amount, unit, link, custom }) => {
  const titleClass = cx(styles.title, custom);
  return (
    <li className={styles.item}>
      <div className={styles.button}></div>
      <span className={titleClass}>{title}</span>
      <div className={styles.amount}>
        {amount}
        <span>{unit}</span>
      </div>
    </li>
  );
};

export default ListItem;
