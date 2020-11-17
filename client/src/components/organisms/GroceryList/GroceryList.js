import React from "react";
import PropTypes from "prop-types";
import styles from "./GroceryList.module.scss";
import IngredientsList from "../../molecules/IngredientsList/IngredientsList";
import Button from "../../atoms/Button/Button";
import ButtonIconSmall from "../../atoms/ButtonIconSmall/ButtonIconSmall";

const GroceryList = ({ setActivePopUp }) => {
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
      <IngredientsList />
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

GroceryList.propTypes = {
  setActivePopUp: PropTypes.func.isRequired,
};

export default GroceryList;
