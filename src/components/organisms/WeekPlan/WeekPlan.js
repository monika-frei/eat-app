import React from "react";
import DayCard from "../../molecules/DayCard/DayCard";
import { Link } from "react-router-dom";
import styles from "./WeekPlan.module.scss";

const days = [
  {
    day: "Monday",
    recepies: {
      breakfast: ["oat meal", "banana"],
      lunch: ["tomato soup", "veggie rice"],
      dinner: ["egg sandwich", "green smoothie", "chia pudding"],
      snacks: ["chocolate bar", "pop-corn"],
    },
  },
  {
    day: "Tuesday",
    recepies: {
      breakfast: ["oat meal", "banana"],
      lunch: ["tomato soup", "veggie rice"],
      dinner: ["egg sandwich", "green smoothie", "chia pudding"],
      snacks: ["chocolate bar", "pop-corn"],
    },
  },
  {
    day: "Wednesday",
    recepies: {
      breakfast: ["oat meal", "banana"],
      lunch: ["tomato soup", "veggie rice"],
      dinner: ["egg sandwich", "green smoothie", "chia pudding"],
      snacks: ["chocolate bar", "pop-corn"],
    },
  },
  {
    day: "Thursday",
    recepies: {
      breakfast: ["oat meal", "banana"],
      lunch: ["tomato soup", "veggie rice"],
      dinner: ["egg sandwich", "green smoothie", "chia pudding"],
      snacks: ["chocolate bar", "pop-corn"],
    },
  },
  {
    day: "Friday",
    recepies: {
      breakfast: ["oat meal", "banana"],
      lunch: ["tomato soup", "veggie rice"],
      dinner: ["egg sandwich", "green smoothie", "chia pudding"],
      snacks: ["chocolate bar", "pop-corn"],
    },
  },
  {
    day: "Saturday",
    recepies: {
      breakfast: ["oat meal", "banana"],
      lunch: ["tomato soup", "veggie rice"],
      dinner: ["egg sandwich", "green smoothie", "chia pudding"],
      snacks: ["chocolate bar", "pop-corn"],
    },
  },
  {
    day: "Sunday",
    recepies: {
      breakfast: ["oat meal", "banana"],
      lunch: ["tomato soup", "veggie rice"],
      dinner: ["egg sandwich", "green smoothie", "chia pudding"],
      snacks: ["chocolate bar", "pop-corn"],
    },
  },
];

const WeekPlan = () => {
  return (
    <div className={styles.container}>
      {days.map((day) => (
        <div key={day.day} className={styles.wrapper}>
          <Link to="">
            <DayCard day={day} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default WeekPlan;
