import React, { useContext } from "react";
import DayCard from "../../organisms/DayCard/DayCard";
import styles from "./WeekPlan.module.scss";
import moment from "moment";
import { GlobalContext } from "../../../context/GlobalContext";

const WeekPlan = () => {
  const { plan } = useContext(GlobalContext);
  const todayDate = moment().format("DD-MM-YYYY");
  const todayPlan = plan.filter((day) => (day.date === todayDate ? day : null));

  if (plan.length > 0) {
    return (
      <div className={styles.container}>
        {todayPlan.length !== 0 && (
          <div className={styles.wrapperToday}>
            <h3>Today's plan</h3>
            <DayCard
              day={todayPlan[0].day}
              date={todayPlan[0].date}
              plan={todayPlan[0].plan}
            />
          </div>
        )}
        <div className={styles.wrapperDays}>
          {plan &&
            plan
              .filter((day) => (day.date !== todayDate ? day : null))
              .map((day) => (
                <div key={day._id} className={styles.wrapper}>
                  <DayCard
                    day={day.day}
                    date={day.date}
                    plan={day.plan}
                    planId={day._id}
                  />
                </div>
              ))}
        </div>
      </div>
    );
  } else {
    return <h1>You have no plans set yet!</h1>;
  }
};

export default WeekPlan;
