import React, { useState, useContext } from "react";
import styles from "./RecipesPage.module.scss";
import cx from "classnames";
import UserPageTemplate from "../../templates/UserPageTemplate/UserPageTemplate";
import Heading from "../../components/atoms/Heading/Heading";
import Button from "../../components/atoms/Button/Button";
import RecipesGrid from "../../components/organisms/RecipesGrid/RecipesGrid";
import ButtonIcon from "../../components/atoms/ButtonIcon/ButtonIcon";
import Search from "../../components/atoms/Search/Search";
import ToggleOpen from "../../providers/ToggleOpen";
import QuickAdd from "../../components/molecules/QuickAdd/QuickAdd";
import AddRecipe from "../../components/organisms/AddRecipe/AddRecipe";
import PlanContextProvider from "../../context/PlanContext";
import { GlobalContext } from "../../context/GlobalContext";
import { Redirect } from "react-router";

const RecipesPage = () => {
  const [selectedMeal, setSelectedMeal] = useState("all");
  const [classActiveBtn, setClassActiveBtn] = useState(true);
  const [inputContent, setInputContent] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [activeRecipe, setActiveRecipe] = useState({});
  const { userLoggedIn } = useContext(GlobalContext);
  const meals = ["all", "breakfast", "lunch", "dinner", "snacks"];

  const handleInputChange = (e) => {
    setInputContent(e.target.value);
  };
  const buttonClass = cx(styles.button, {
    [`${styles.classActiveBtn}`]: classActiveBtn,
  });
  const handleSelectOption = (meal) => {
    setSelectedMeal(meal);
    setClassActiveBtn(true);
  };
  const handleQuickAdd = (item) => {
    setOpen(!isOpen);
    setActiveRecipe(item);
  };

  if (userLoggedIn === false) {
    return <Redirect to="/login" />;
  }

  return (
    <ToggleOpen
      render={({ toggle, classOpen }) => (
        <UserPageTemplate bgColorLight="bgPrimaryLight" border="borderPrimary">
          <Heading custom={styles.heading}>Recipes</Heading>
          <div className={styles.wrapper}>
            <div className={styles.buttons}>
              {meals.map((meal) => {
                return (
                  <Button
                    bgColor="bgPrimary"
                    custom={selectedMeal === meal ? buttonClass : styles.button}
                    onClick={() => handleSelectOption(meal)}
                  >
                    {meal}
                  </Button>
                );
              })}
            </div>
            <Search
              custom={styles.search}
              value={inputContent.toLowerCase()}
              onChange={handleInputChange}
            />
            <RecipesGrid
              meal={selectedMeal}
              inputContent={inputContent.toLowerCase()}
              handleQuickAdd={handleQuickAdd}
            />
            <div className={styles.buttonWrapper}>
              <ButtonIcon
                bgColor="bgPrimary"
                custom={styles.buttonAdd}
                onClick={toggle}
              />
            </div>
          </div>
          {isOpen && (
            <PlanContextProvider>
              <QuickAdd
                item={activeRecipe}
                setOpen={setOpen}
                custom={styles.quickAdd}
              />
            </PlanContextProvider>
          )}
          <AddRecipe classOpen={classOpen} toggle={toggle} />
        </UserPageTemplate>
      )}
    />
  );
};

export default RecipesPage;
