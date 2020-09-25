import React from "react";
import ListItem from "../../atoms/ListItem/ListItem";

const IngredientsList = ({ ingredients }) => {
  return (
    <ul>
      {ingredients.map((ingredient) => {
        return (
          <div key={ingredient.title}>
            <ListItem
              title={ingredient.title}
              amount={ingredient.amount ? ingredient.amount : ""}
            />
          </div>
        );
      })}
    </ul>
  );
};

export default IngredientsList;
