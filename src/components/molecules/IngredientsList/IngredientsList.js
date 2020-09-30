import React, { useEffect, useState } from "react";
import ListItem from "../../atoms/ListItem/ListItem";

const IngredientsList = ({ ingredients }) => {
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  // useEffect(() => {
  //   let array = [];
  //   ingredients.

  // },ingredients)
  return (
    <ul>
      {ingredients.map((ingredient, index, array) => {
        return (
          <div key={ingredient.title}>
            <ListItem
              title={ingredient.title}
              amount={ingredient.amount ? ingredient.amount : ""}
              unit={ingredient.unit ? ingredient.unit : ""}
            />
          </div>
        );
      })}
    </ul>
  );
};

export default IngredientsList;
