import React, { useEffect, useState } from "react";
import styles from "./GroceryList.module.scss";
import IngredientsList from "../../molecules/IngredientsList/IngredientsList";
import Button from "../../atoms/Button/Button";
import { connect } from "react-redux";

const GroceryList = ({ plan }) => {
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    let allRecepies = [];
    days.map((day) => {
      allRecepies = [
        ...allRecepies,
        ...plan[day].breakfast,
        ...plan[day].lunch,
        ...plan[day].dinner,
        ...plan[day].snacks,
      ];
    });
    let ingredientsArray = [];
    allRecepies.map((item) => {
      return (ingredientsArray = [...ingredientsArray, ...item.ingredients]);
    });
    setIngredients(ingredientsArray);
    console.log(plan);
  }, [plan]);
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Grocery List</h2>
      <IngredientsList ingredients={ingredients} />
      <div className={styles.pages}>1 2 3</div>
      <Button bgColor="bgTertiary" custom={styles.button}>
        Edit
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    plan: state.plan,
  };
};

export default connect(mapStateToProps)(GroceryList);
