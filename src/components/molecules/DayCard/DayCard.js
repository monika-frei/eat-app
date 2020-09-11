import React from "react";
import MealCard from "../../atoms/MealCard/MealCard";
import styles from "./DayCard.module.scss";

const DayCard = ({ day }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{day.day}</h2>
      <MealCard meal="Breakfast" recepies={day.recepies.breakfast} />
      <MealCard meal="Lunch" recepies={day.recepies.lunch} />
      <MealCard meal="Dinner" recepies={day.recepies.dinner} />
      <MealCard meal="Snacks" recepies={day.recepies.snacks} />
    </div>
  );
};

export default DayCard;
