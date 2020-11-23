import React, { useState, useEffect } from "react";
import styles from "./AddPlanForm.module.scss";
import FormAddTemplate from "../../../templates/FormAddTemplate/FormAddTemplate";
import Card from "../../molecules/Card/Card";
import Button from "../../atoms/Button/Button";
import PopupRecepies from "../../molecules/PopupRecepies/PopupRecepies";
import { connect } from "react-redux";
import { addRecepiesToPlan as addRecepiesToPlanAction } from "../../../redux/actions/index";

const AddPlanForm = ({
  classOpen,
  day,
  date,
  setDay,
  setDate,
  meals,
  meal,
  savedRecepies,
  handleSaveRecepie,
  handleAddRecepie,
  handleDeleteRecepie,
  setOpen,
  open,
  setSavedRecepies,
  addRecepiesToPlan,
  toggle,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    addRecepiesToPlan(day, date, savedRecepies);
    setDay("");
    setDate("");
    setSavedRecepies({
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    });
    toggle();
  };

  return (
    <FormAddTemplate classOpen={classOpen} toggle={toggle}>
      <form className={styles.form}>
        <label className={styles.label} htmlFor="day">
          Which day do you want to plan?
        </label>
        <select
          name="day"
          value={day}
          onChange={(event) => setDay(event.target.value)}
        >
          <option value="">select a day</option>
          <option value="monday">Monday</option>
          <option value="tuesday">Tuesday</option>
          <option value="wednesday">Wednesday</option>
          <option value="thursday">Thursday</option>
          <option value="friday">Friday</option>
          <option value="saturday">Saturday</option>
          <option value="sunday">Sunday</option>
        </select>
        <div className={styles.wrapper}>
          {day.length > 0 && (
            <>
              <h3 className={styles.heading}>
                Plan your week by adding recepies from the list
              </h3>
              <div className={styles.meals}>
                {meals.map((meal) => (
                  <Card
                    meal={meal}
                    handleAddRecepie={handleAddRecepie}
                    handleDelete={handleDeleteRecepie}
                    savedRecepies={savedRecepies[meal]}
                  />
                ))}
              </div>
            </>
          )}

          {open && (
            <PopupRecepies
              meal={meal}
              handleSaveRecepie={handleSaveRecepie}
              handleClose={() => setOpen(!open)}
            />
          )}
          <Button
            type="submit"
            bgColor="bgSecondary"
            custom={styles.button}
            onClick={(e) =>
              handleSubmit(e, day, savedRecepies, setSavedRecepies)
            }
          >
            Add
          </Button>
        </div>
      </form>
    </FormAddTemplate>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    addRecepiesToPlan: (day, date, savedRecepies) =>
      dispatch(addRecepiesToPlanAction(day, date, savedRecepies)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPlanForm);
