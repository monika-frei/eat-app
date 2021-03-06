import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./PopupRecipes.module.scss";
import Search from "../../atoms/Search/Search";
import { RecipesContext } from "../../../context/RecipesContext";

const PopupRecipes = ({ meal, handleSaveRecipe, handleClose }) => {
  const [inputContent, setInputContent] = useState("");
  const { getAllRecipes, recipes } = useContext(RecipesContext);

  useEffect(() => {
    getAllRecipes();
  }, []);

  const handleInputChange = (e) => {
    setInputContent(e.target.value);
  };

  return (
    <div className={styles.recepies}>
      <button
        className={styles.closeIcon}
        onClick={handleClose}
        type="button"
      />
      <Search
        custom={styles.search}
        value={inputContent}
        onChange={handleInputChange}
      />
      <ul className={styles.list}>
        {recipes
          .filter((item) => item.title.includes(inputContent.toLowerCase()))
          .map((item) => {
            return (
              <li className={styles.listItem} key={item._id}>
                <button
                  data-title={item.title}
                  onClick={() => handleSaveRecipe(item, meal)}
                  type="button"
                >
                  {item.title}
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default PopupRecipes;
