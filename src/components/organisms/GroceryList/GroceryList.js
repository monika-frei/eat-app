import React, { useEffect, useState } from "react";
import styles from "./GroceryList.module.scss";
import IngredientsList from "../../molecules/IngredientsList/IngredientsList";
import Button from "../../atoms/Button/Button";
import ButtonIconSmall from "../../atoms/ButtonIconSmall/ButtonIconSmall";
import { connect } from "react-redux";

const GroceryList = ({
  days,
  plan,
  setGroceryList,
  setActivePopUp,
  ingredients,
  setIngredients,
}) => {
  useEffect(() => {
    let daysArray;
    if (days.includes("all")) {
      daysArray = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ];
    } else {
      daysArray = days;
    }
    let allRecepies = [];
    daysArray.map((day) => {
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
    let filteredIngredients = [];
    ingredientsArray.forEach((item) => {
      if (
        filteredIngredients.filter(
          (ingredient) =>
            ingredient.title === item.title && ingredient.unit === item.unit
        ).length > 0
      ) {
        let indexToDelete = filteredIngredients.findIndex(
          (ingredient) =>
            ingredient.title === item.title && ingredient.unit === item.unit
        );
        const summedItem = {
          title: filteredIngredients[indexToDelete].title,
          amount: (
            parseInt(filteredIngredients[indexToDelete].amount, 10) +
            parseInt(item.amount, 10)
          ).toString(),
          unit: filteredIngredients[indexToDelete].unit,
        };
        filteredIngredients = filteredIngredients.filter(
          (ingredient, index) => index !== indexToDelete
        );
        filteredIngredients = [...filteredIngredients, summedItem];
      } else {
        filteredIngredients = [...filteredIngredients, item];
      }
    });
    setIngredients(filteredIngredients);
    setGroceryList(filteredIngredients);
  }, [days, plan]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Grocery List</h2>
      <div className={styles.buttons}>
        <ButtonIconSmall
          bgImage="buttonPrint"
          btnSize="btn30"
          custom={styles.btnPrint}
        ></ButtonIconSmall>
        <ButtonIconSmall
          bgImage="buttonEmail"
          btnSize="btn40"
          custom={styles.btnPrint}
        ></ButtonIconSmall>
      </div>
      <IngredientsList ingredients={ingredients} />
      <Button
        bgColor="bgTertiary"
        custom={styles.button}
        onClick={() => setActivePopUp(true)}
      >
        Add item
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
