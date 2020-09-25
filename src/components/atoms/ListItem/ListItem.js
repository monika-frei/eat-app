import React from "react";
import styles from "./ListItem.module.scss";
import cx from "classnames";
import { Link } from "react-router-dom";

const ListItem = ({ title, amount, link, custom }) => {
  const titleClass = cx(styles.title, custom);
  return (
    <li className={styles.item}>
      <div className={styles.button}></div>
      <Link to={link ? link : ""}>
        <span className={titleClass}>{title}</span>
      </Link>
      <div className={styles.amount}>{amount}</div>
    </li>
  );
};

export default ListItem;
