import React from "react";
import DayCard from "../../organisms/DayCard/DayCard";
import styles from "./WeekPlan.module.scss";

const WeekPlan = ({ toggle, handleEdit }) => {
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  return (
    <div className={styles.container}>
      {days.map((day) => (
        <div key={day} className={styles.wrapper}>
          <DayCard day={day} toggle={toggle} handleEdit={handleEdit} />
        </div>
      ))}
    </div>
  );
};

export default WeekPlan;
