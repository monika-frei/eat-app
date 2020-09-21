import React from "react";
import styles from "./GroceryList.module.scss";
import cx from "classnames";
import IngredientsList from "../../molecules/IngredientsList/IngredientsList";
import Button from "../../atoms/Button/Button";

const GroceryList = () => {
  const ingredients = [
    { title: "oat flakes", amount: 50 },
    { title: "banana", amount: 150 },
    { title: "nuts", amount: 30 },
  ];
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

export default GroceryList;
