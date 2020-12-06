import React from "react";
import styles from "./AddPlanForm.module.scss";
import FormAddTemplate from "../../../templates/FormAddTemplate/FormAddTemplate";
import Card from "../../molecules/Card/Card";
import Button from "../../atoms/Button/Button";
import PopupRecipes from "../../molecules/PopupRecipes/PopupRecipes";
import { meals } from "../../../constans/index";
import moment from "moment";
import DatePicker from "react-date-picker";
import { useLocation } from "react-router";
import RecipesContextProvider from "../../../context/RecipesContext";

const AddPlanForm = ({
  date,
  setDate,
  open,
  setOpen,
  meal,
  handleSaveRecipe,
  handleAddRecipe,
  handleDeleteRecipe,
  toggle,
  classOpen,
  savedRecipes,
  handleSubmit,
}) => {
  const location = useLocation();
  let buttonText;
  if (location.pathname === "/plan") {
    buttonText = "Add";
  } else {
    buttonText = "Save";
  }
  return (
    <FormAddTemplate classOpen={classOpen} toggle={toggle}>
      <form className={styles.form}>
        <label className={styles.label} htmlFor="day">
          Which day do you want to plan?
        </label>
        <div>
          <DatePicker
            onChange={setDate}
            value={date}
            format={"y-MM-dd"}
            minDate={new Date()}
            className={styles.datePicker}
            calendarClassName={styles.calendar}
            required={true}
          />
          {date && (
            <p className={styles.displayDay}>{moment(date).format("dddd")}</p>
          )}
        </div>
        <div className={styles.wrapper}>
          {date !== "" && (
            <>
              <h3 className={styles.heading}>
                Plan your week by adding recipes from the list
              </h3>
              <div className={styles.meals}>
                {meals.map((meal) => (
                  <Card
                    key={meal}
                    meal={meal}
                    handleAddRecepie={handleAddRecipe}
                    handleDelete={handleDeleteRecipe}
                    savedRecipes={savedRecipes[meal]}
                  />
                ))}
              </div>
            </>
          )}

          {open && (
            <RecipesContextProvider>
              <PopupRecipes
                meal={meal}
                handleSaveRecipe={handleSaveRecipe}
                handleClose={() => setOpen(!open)}
              />
            </RecipesContextProvider>
          )}
          <Button
            type="submit"
            bgColor="bgSecondary"
            custom={styles.button}
            onClick={handleSubmit}
          >
            {buttonText}
          </Button>
        </div>
      </form>
    </FormAddTemplate>
  );
};

export default AddPlanForm;
