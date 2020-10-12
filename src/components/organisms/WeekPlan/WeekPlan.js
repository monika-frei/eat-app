import React from "react";
import DayCard from "../../organisms/DayCard/DayCard";
import styles from "./WeekPlan.module.scss";
import moment from "moment";

const WeekPlan = ({ toggle, handleEdit, handleDelete }) => {
  const today = moment().format("dddd").toLowerCase();
  const todayDate = moment().format("YYYY-MM-DD");
  const days = [
    {
      day: moment().add(1, "days").format("dddd").toLowerCase(),
      date: moment().add(1, "days").format("YYYY-MM-DD"),
    },
    {
      day: moment().add(2, "days").format("dddd").toLowerCase(),
      date: moment().add(2, "days").format("YYYY-MM-DD"),
    },
    {
      day: moment().add(3, "days").format("dddd").toLowerCase(),
      date: moment().add(3, "days").format("YYYY-MM-DD"),
    },
    {
      day: moment().add(4, "days").format("dddd").toLowerCase(),
      date: moment().add(4, "days").format("YYYY-MM-DD"),
    },
    {
      day: moment().add(5, "days").format("dddd").toLowerCase(),
      date: moment().add(5, "days").format("YYYY-MM-DD"),
    },
    {
      day: moment().add(6, "days").format("dddd").toLowerCase(),
      date: moment().add(6, "days").format("YYYY-MM-DD"),
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.wrapperToday}>
        <h3>Today's plan</h3>
        <DayCard
          day={today}
          date={todayDate}
          toggle={toggle}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
      <div className={styles.wrapperDays}>
        {days.map((day) => (
          <div key={day.day} className={styles.wrapper}>
            <DayCard
              day={day.day}
              date={day.date}
              toggle={toggle}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekPlan;
