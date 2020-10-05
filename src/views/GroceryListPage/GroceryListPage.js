import React, { useState } from "react";
import styles from "./GroceryListPage.module.scss";
import UserPageTemplate from "../../templates/UserPageTemplate/UserPageTemplate";
import Button from "../../components/atoms/Button/Button";
import GroceryList from "../../components/organisms/GroceryList/GroceryList";
import cx from "classnames";
import PopUpListItem from "../../components/molecules/PopUpListItem/PopUpListItem";

const GroceryListPage = () => {
  const [selectedDays, setSelectedDays] = useState(["all"]);
  const [classActiveBtn, setClassActiveBtn] = useState(true);
  const [activeGroceryList, setActiveGroceryList] = useState(false);
  const [activeEditList, setActiveEditList] = useState(false);
  const [groceryList, setGroceryList] = useState([]);
  const buttonClass = cx(styles.button, {
    [`${styles.classActiveBtn}`]: classActiveBtn,
  });
  const [activePopUp, setActivePopUp] = useState(false);
  const [ingredients, setIngredients] = useState([]);

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
  const handleSelectOption = (day) => {
    if (selectedDays.includes(day)) {
      const activeOptions = selectedDays.filter((item) => item !== day);
      setSelectedDays(activeOptions);
    } else {
      const activeOptions = [...selectedDays, day];
      setSelectedDays(activeOptions);
    }
    setClassActiveBtn(classActiveBtn);
  };
  const handleAddItem = (inputTitle, inputAmount, inputUnit) => {
    const newItem = {
      title: inputTitle,
      amount: inputAmount,
      unit: inputUnit,
    };
    setIngredients([...ingredients, newItem]);
    setActivePopUp(false);
  };
  return (
    <UserPageTemplate border="borderTertiary" bgColorLight="bgTertiaryLight">
      <div className={styles.wrapper}>
        {!activeEditList && (
          <>
            <h3>Which days do you want to include in your list?</h3>
            <div className={styles.buttons}>
              {days.map((day) => {
                return (
                  <Button
                    bgColor="bgTertiary"
                    custom={
                      selectedDays.includes(day) ? buttonClass : styles.button
                    }
                    onClick={() => handleSelectOption(day)}
                  >
                    {day}
                  </Button>
                );
              })}
            </div>
            {!activeGroceryList && (
              <Button
                bgColor="bgWhite"
                custom={styles.buttonGenerate}
                onClick={() => setActiveGroceryList(true)}
              >
                Generate list
              </Button>
            )}
          </>
        )}
        {activeGroceryList && (
          <GroceryList
            days={selectedDays}
            setActiveGroceryList={setActiveGroceryList}
            activeGroceryList={activeGroceryList}
            setGroceryList={setGroceryList}
            groceryList={groceryList}
            setActivePopUp={setActivePopUp}
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
        )}
        {activePopUp && (
          <PopUpListItem
            handleAddItem={handleAddItem}
            setActivePopUp={setActivePopUp}
          />
        )}
      </div>
    </UserPageTemplate>
  );
};

export default GroceryListPage;
