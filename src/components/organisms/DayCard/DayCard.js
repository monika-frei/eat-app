import React, { useState } from "react";
import Card from "../../molecules/Card/Card";
import ButtonIconSmall from "../../atoms/ButtonIconSmall/ButtonIconSmall";
import AddRecepies from "../../../providers/AddRecepies";
import styles from "./DayCard.module.scss";
import { connect } from "react-redux";

const DayCard = ({ day, toggle, handleEdit, plan = [] }) => {
  const meals = ["breakfast", "lunch", "dinner", "snacks"];
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.heading}>{day}</h2>
        {handleEdit && (
          <ButtonIconSmall
            bgImage="buttonAdd"
            btnSize="btn30"
            onClick={() => {
              toggle();
              handleEdit(day, plan);
            }}
            type="button"
            custom={styles.button}
          ></ButtonIconSmall>
        )}
      </div>

      {meals.map((meal) => (
        <Card meal={meal} savedRecepies={plan[day] ? plan[day][meal] : []} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    plan: state.plan,
  };
};

export default connect(mapStateToProps)(DayCard);
