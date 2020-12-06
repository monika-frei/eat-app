import React from "react";
import PropTypes from "prop-types";
import styles from "./RecipeCard.module.scss";
import imageBg from "../../../assets/2499038.jpg";
import { Link } from "react-router-dom";
import ButtonIcon from "../../atoms/ButtonIcon/ButtonIcon";

const RecipeCard = ({ item, handleQuickAdd }) => {
  const imageUrlString = `http://localhost:4000/${item.recipeImage}`;
  const imageUrl =
    item.recipeImage !== "" ? imageUrlString.replace(/\\/g, "/") : `${imageBg}`;
  return (
    <div className={styles.container}>
      <Link to={`/recipes/${item._id}`}>
        <div className={styles.wrapper}>
          <h2 className={styles.heading}>{item.title}</h2>
          <div
            className={styles.image}
            style={{
              backgroundImage: `url(${imageUrl}), url(${imageUrl})`,
            }}
          ></div>
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

RecipeCard.propTypes = {
  item: PropTypes.object,
  handleQuickAdd: PropTypes.func,
};

export default RecipeCard;
