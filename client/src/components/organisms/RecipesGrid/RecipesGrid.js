import React, { useEffect, useContext } from "react";
import styles from "./RecipesGrid.module.scss";
import RecipeCard from "../../molecules/RecipeCard/RecipeCard";
import { RecipesContext } from "../../../context/RecipesContext";

const RecipesGrid = ({ meal, inputContent, handleQuickAdd }) => {
  const { getAllRecipes, recipes } = useContext(RecipesContext);

  useEffect(() => {
    getAllRecipes();
  }, []);

  const recipesArray =
    meal === "all"
      ? recipes
      : recipes.filter((recipe) => recipe.category.includes(meal));

  return (
    <section className={styles.wrapper}>
      {recipesArray
        .filter((item) => item.title.includes(inputContent))
        .map((item) => {
          return (
            <div key={item._id}>
              <RecipeCard
                item={item}
                bgColor="bgPrimary"
                handleQuickAdd={handleQuickAdd}
              />
            </div>
          );
        })}
    </section>
  );
};

export default RecipesGrid;
