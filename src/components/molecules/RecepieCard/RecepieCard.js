import React from "react";
import PropTypes from "prop-types";
import styles from "./RecepieCard.module.scss";
import { Link } from "react-router-dom";
import ButtonIcon from "../../atoms/ButtonIcon/ButtonIcon";

const RecepieCard = ({ item, handleQuickAdd }) => {
  const ingredients = item.ingredients;

  return (
    <div className={styles.wrapper}>
      <Link to={`/recepies/${item.id}`}>
        <h2 className={styles.heading}>{item.title}</h2>

        <h3 className={styles.headingSmall}>Ingredients:</h3>
        <div>
          <ul className={styles.info}>
            {ingredients.map((ingredient) => {
              return (
                <li key={ingredient.title} className={styles.ingredient}>
                  <span>{ingredient.title}</span>
                  <div className={styles.amount}>
                    <span>{ingredient.amount}</span>
                    <span>{ingredient.unit}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Link>
      <ButtonIcon
        custom={styles.button}
        bgColor="bgWhite"
        lineColor="borderPrimary"
        onClick={() => handleQuickAdd(item)}
      />
    </div>
  );
};

RecepieCard.propTypes = {
  item: PropTypes.object,
  handleQuickAdd: PropTypes.func,
};

export default RecepieCard;
