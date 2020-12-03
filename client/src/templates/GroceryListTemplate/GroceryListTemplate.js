import React, { useState, useContext, useEffect } from "react";
import styles from "./GroceryListTemplate.module.scss";
import Button from "../../components/atoms/Button/Button";
import PopUpListItem from "../../components/molecules/PopUpListItem/PopUpListItem";
import GroceryList from "../../components/organisms/GroceryList/GroceryList";
import cx from "classnames";
import PropTypes from "prop-types";
import { GlobalContext } from "../../context/GlobalContext";
import Axios from "axios";

const GroceryListTemplate = ({
  handleSelectOption,
  handleAddItem,
  setActivePopUp,
  selectedDays,
  classActiveBtn,
  activePopUp,
  groceryList,
}) => {
  const { plan } = useContext(GlobalContext);
  return (
    <div className={styles.wrapper}>
      <h3>Which days do you want to include in your list?</h3>
      <div className={styles.buttons}>
        <Button
          key="all"
          bgColor="bgTertiary"
          custom={
            selectedDays.includes("all")
              ? cx(styles.button, {
                  [`${styles.classActiveBtn}`]: classActiveBtn,
                })
              : styles.button
          }
          onClick={() => handleSelectOption("all")}
        >
          all
        </Button>
        {plan.map((item) => {
          return (
            <Button
              key={item._id}
              bgColor="bgTertiary"
              custom={
                selectedDays.includes(item.date)
                  ? cx(styles.button, {
                      [`${styles.classActiveBtn}`]: classActiveBtn,
                    })
                  : styles.button
              }
              onClick={() => handleSelectOption(item.date)}
            >
              <span>{item.date}</span>
              <span>{item.day}</span>
            </Button>
          );
        })}
      </div>
      {groceryList.length > 0 && (
        <GroceryList
          setActivePopUp={setActivePopUp}
          ingredients={groceryList}
          handleAddItem={handleAddItem}
        />
      )}

      {activePopUp && (
        <PopUpListItem
          handleAddItem={handleAddItem}
          setActivePopUp={setActivePopUp}
        />
      )}
    </div>
  );
};

export default GroceryListTemplate;
