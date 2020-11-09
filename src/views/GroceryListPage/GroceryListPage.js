import React, { useState, useEffect } from "react";
import styles from "./GroceryListPage.module.scss";
import UserPageTemplate from "../../templates/UserPageTemplate/UserPageTemplate";
import Button from "../../components/atoms/Button/Button";
import GroceryList from "../../components/organisms/GroceryList/GroceryList";
import PopUpListItem from "../../components/molecules/PopUpListItem/PopUpListItem";
import FilterIngredients from "../../providers/FilterIngredients";
import cx from "classnames";
import { connect } from "react-redux";
import { addItemToGroceryList as addItemToGroceryListAction } from "../../redux/actions/index";

const GroceryListPage = ({ addItemToGroceryList, groceryList }) => {
  const [activePopUp, setActivePopUp] = useState(false);
  const days = [
    "all",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const handleAddItem = (inputTitle, inputAmount, inputUnit) => {
    const newItem = {
      title: inputTitle,
      amount: inputAmount,
      unit: inputUnit,
    };
    addItemToGroceryList(newItem);
    setActivePopUp(false);
  };

  return (
    <FilterIngredients
      render={({
        activeGroceryList,
        handleSelectOption,
        classActiveBtn,
        selectedDays,
        handleGenerateList,
      }) => (
        <UserPageTemplate
          border="borderTertiary"
          bgColorLight="bgTertiaryLight"
        >
          <div className={styles.wrapper}>
            <h3>Which days do you want to include in your list?</h3>
            <div className={styles.buttons}>
              {days.map((day) => {
                return (
                  <Button
                    key={day}
                    bgColor="bgTertiary"
                    custom={
                      selectedDays.includes(day)
                        ? cx(styles.button, {
                            [`${styles.classActiveBtn}`]: classActiveBtn,
                          })
                        : styles.button
                    }
                    onClick={() => handleSelectOption(day)}
                  >
                    {day}
                  </Button>
                );
              })}
            </div>
            <Button
              bgColor="bgWhite"
              custom={styles.buttonGenerate}
              onClick={handleGenerateList}
            >
              Generate list
            </Button>
            {groceryList.length > 0 && (
              <GroceryList setActivePopUp={setActivePopUp} />
            )}

            {activePopUp && (
              <PopUpListItem
                handleAddItem={handleAddItem}
                setActivePopUp={setActivePopUp}
              />
            )}
          </div>
        </UserPageTemplate>
      )}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    groceryList: state.groceryList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToGroceryList: (item) => dispatch(addItemToGroceryListAction(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroceryListPage);
