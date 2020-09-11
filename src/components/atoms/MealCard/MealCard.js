import React from "react";
import { Link } from "react-router-dom";
import styles from "./MealCard.module.scss";

const MealCard = ({ meal, recepies = [] }) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading}>{meal}</h3>
      {recepies.map((recepie) => (
        <Link>
          <p className={styles.recepie}>{recepie}</p>
        </Link>
      ))}
    </div>
  );
};

export default MealCard;
