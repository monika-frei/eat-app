import React from "react";
import styles from "./RecepieCard.module.scss";
import ButtonIcon from "../../atoms/ButtonIcon/ButtonIcon";

const RecepieCard = ({ item }) => {
  const ingredients = item.ingredients;
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{item.title}</h2>
      <h3 className={styles.headingSmall}>Ingredients</h3>
      <div>
        <ul className={styles.info}>
          {ingredients.map((ingredient) => {
            return <li key={ingredient}>{ingredient}</li>;
          })}
        </ul>
      </div>
      <ButtonIcon
        custom={styles.button}
        bgColor="bgWhite"
        lineColor="borderPrimary"
      />
    </div>
  );
};

export default RecepieCard;
