import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./RecepiesPage.module.scss";
import cx from "classnames";
import UserPageTemplate from "../../templates/UserPageTemplate/UserPageTemplate";
import Heading from "../../components/atoms/Heading/Heading";
import Button from "../../components/atoms/Button/Button";
import RecepiesGrid from "../../components/organisms/RecepiesGrid/RecepiesGrid";
import ButtonIcon from "../../components/atoms/ButtonIcon/ButtonIcon";
import Search from "../../components/atoms/Search/Search";
import ToggleOpen from "../../providers/ToggleOpen";
import QuickAdd from "../../components/molecules/QuickAdd/QuickAdd";
import AddRecepieForm from "../../components/organisms/AddRecepieForm/AddRecepieForm";

const RecepiesPage = () => {
  const [selectedMeal, setSelectedMeal] = useState("all");
  const [classActiveBtn, setClassActiveBtn] = useState(true);
  const [inputContent, setInputContent] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [activeRecepie, setActiveRecepie] = useState({});

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
    setActiveRecepie(item);
  };

  return (
    <ToggleOpen
      render={({ toggle, classOpen }) => (
        <UserPageTemplate bgColorLight="bgPrimaryLight" border="borderPrimary">
          <Heading custom={styles.heading}>Recepies</Heading>
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
              value={inputContent}
              onChange={handleInputChange}
            />
            <RecepiesGrid
              meal={selectedMeal}
              inputContent={inputContent}
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
            <QuickAdd
              item={activeRecepie}
              setOpen={setOpen}
              custom={styles.quickAdd}
            />
          )}
          {classOpen === "activeForm" && (
            <AddRecepieForm classOpen={classOpen} toggle={toggle} />
          )}
        </UserPageTemplate>
      )}
    />
  );
};

RecepiesPage.propTypes = {
  toggle: PropTypes.func.isRequired,
  classOpen: PropTypes.bool,
};

export default RecepiesPage;