import React from "react";
import UserPageTemplate from "../../templates/UserPageTemplate/UserPageTemplate";
import WeekPlan from "../../components/organisms/WeekPlan/WeekPlan";
import Heading from "../../components/atoms/Heading/Heading";
import styles from "./PlanPage.module.scss";
import ButtonIcon from "../../components/atoms/ButtonIcon/ButtonIcon";

const PlanPage = () => {
  return (
    <UserPageTemplate bgColor="bgSecondary">
      <div className={styles.wrapper}>
        <Heading custom={styles.heading}>Weekly plan</Heading>
        <WeekPlan />
        <ButtonIcon lineColor="borderSecondary" />
      </div>
    </UserPageTemplate>
  );
};

export default PlanPage;
