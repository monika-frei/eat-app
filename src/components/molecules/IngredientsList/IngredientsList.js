import React, { useEffect, useState } from "react";
import styles from "./IngredientsList.module.scss";
import ButtonIconSmall from "../../atoms/ButtonIconSmall/ButtonIconSmall";
import cx from "classnames";

const IngredientsList = ({ ingredients, custom }) => {
  const [editIngredients, setEditIngredients] = useState([]);
  const [activeInput, setActiveInput] = useState(false);
  const [activeIngredient, setActiveIngredient] = useState({});
  const [inputValue, setInputValue] = useState("");
  const titleClass = cx(styles.title, custom);

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
    <ul>
      {editIngredients.map((ingredient) => {
        return (
          <li key={ingredient.title} className={styles.item}>
            <div className={styles.circle}></div>
            <span className={titleClass}>{ingredient.title}</span>
            <div className={styles.wrapper}>
              <div>
                {activeInput && activeIngredient === ingredient ? (
                  <>
                    <input
                      value={inputValue}
                      onChange={(e) => handleChange(e, ingredient)}
                      className={styles.input}
                    ></input>
                    <span>{ingredient.unit}</span>
                  </>
                ) : (
                  <>
                    <span>{ingredient.amount}</span>
                    <span>{ingredient.unit}</span>
                  </>
                )}
              </div>
              <div className={styles.buttons}>
                {activeInput && activeIngredient === ingredient ? (
                  <ButtonIconSmall
                    bgImage="buttonChecked"
                    btnSize="btn20"
                    onClick={() => handleSave(ingredient)}
                  ></ButtonIconSmall>
                ) : (
                  <ButtonIconSmall
                    bgImage="buttonEdit"
                    btnSize="btn20"
                    onClick={() => handleEdit(ingredient)}
                  ></ButtonIconSmall>
                )}

                <ButtonIconSmall
                  bgImage="buttonDelete"
                  btnSize="btn20"
                  onClick={() => handleDelete(ingredient)}
                ></ButtonIconSmall>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default IngredientsList;
