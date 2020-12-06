import React, { useContext } from "react";
import DayCard from "../../organisms/DayCard/DayCard";
import Button from "../../atoms/Button/Button";
import styles from "./WeekPlan.module.scss";
import { GlobalContext } from "../../../context/GlobalContext";

const WeekPlan = ({ toggle }) => {
  const { plan } = useContext(GlobalContext);

  if (plan.length > 0) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapperDays}>
          {plan &&
            plan.map((day) => (
              <section key={day._id} className={styles.wrapper}>
                <DayCard
                  day={day.day}
                  date={day.date}
                  plan={day.plan}
                  planId={day._id}
                />
              </section>
            ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.buttonWrapper}>
        <Button
          bgColor="bgSecondary"
          custom={styles.buttonGenerate}
          onClick={toggle}
        >
          Plan your meals!
        </Button>
      </div>
    );
  }
};

export default WeekPlan;
