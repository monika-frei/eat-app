import React from "react";
import PropTypes from "prop-types";
import styles from "./RecepiesGrid.module.scss";
import RecepieCard from "../../molecules/RecepieCard/RecepieCard";
import { connect } from "react-redux";

const RecepiesGrid = ({ recepies, meal, inputContent, handleQuickAdd }) => {
  const recepiesArray =
    meal === "all"
      ? recepies
      : recepies.filter((recepie) => recepie.category.includes(meal));
  return (
    <div className={styles.wrapper}>
      {recepiesArray
        .filter((item) => item.title.includes(inputContent))
        .map((item) => {
          return (
            <div key={item.id}>
              <RecepieCard
                item={item}
                bgColor="bgPrimary"
                handleQuickAdd={handleQuickAdd}
              />
            </div>
          );
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    recepies: state.recepies,
  };
};

RecepiesGrid.propTypes = {
  recepies: PropTypes.object.isRequired,
  meal: PropTypes.oneOf(["all", "breakfast", "lunch", "dinner", "snacks"])
    .isRequired,
  inputContent: PropTypes.string,
  handleQuickAdd: PropTypes.func,
};

export default connect(mapStateToProps)(RecepiesGrid);