import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./GroceryList.module.scss";
import IngredientsList from "../../molecules/IngredientsList/IngredientsList";
import Button from "../../atoms/Button/Button";
import ButtonIconSmall from "../../atoms/ButtonIconSmall/ButtonIconSmall";

const GroceryList = ({ setActivePopUp, ingredients }) => {
  const [editIngredients, setEditIngredients] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [activeInput, setActiveInput] = useState(false);
  const [activeIngredient, setActiveIngredient] = useState({});

  useEffect(() => {
    setEditIngredients(ingredients);
  }, [ingredients]);

  const handleDelete = (ingredient) => {
    const filteredArray = editIngredients.filter((item) => item !== ingredient);
    setEditIngredients(filteredArray);
  };
  const handleEdit = (ingredient) => {
    setActiveIngredient(ingredient);
    setInputValue(ingredient.amount);
    setActiveInput(true);
  };
  const handleChange = (e, ingredient) => {
    setInputValue(e.target.value);
  };
  const handleSave = (ingredient) => {
    const changedItem = {
      title: ingredient.title,
      amount: inputValue,
      unit: ingredient.unit,
    };
    const filteredArray = editIngredients.map((item) => {
      if (item === ingredient) {
        return changedItem;
      } else {
        return item;
      }
    });
    setEditIngredients(filteredArray);
  };
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
      <IngredientsList
        handleChange={handleChange}
        activeInput={activeInput}
        activeIngredient={activeIngredient}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleSave={handleSave}
        editIngredients={editIngredients}
        inputValue={inputValue}
      />
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
