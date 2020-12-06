import React, { useEffect, useState, useContext } from "react";
import AddPlanForm from "../AddPlanForm/AddPlanForm";
import moment from "moment";

const AddPlan = (props) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [savedRecipes, setSavedRecipes] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  });
  const [meal, setMeal] = useState("");
  const { classOpen, sendPlan, planToEdit, toggle, setRefresh } = props;

  useEffect(() => {
    if (classOpen === "") {
      setDate("");
      setSavedRecipes({
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: [],
      });
    }
  }, [classOpen]);

  useEffect(() => {
    setDate(planToEdit.date);
    setSavedRecipes(planToEdit.plan);
  }, [planToEdit]);

  const handleAddRecipe = (e, meal) => {
    setMeal(meal);
    setOpen(true);
    e.preventDefault();
  };

  //function which saves chosen recipe from the list
  const handleSaveRecipe = (recipe, meal) => {
    if (
      savedRecipes[meal].find((item) => item._id === recipe._id) === undefined
    ) {
      const newArray = [...savedRecipes[meal], recipe];
      setSavedRecipes({ ...savedRecipes, ...{ [meal]: newArray } });
    }
  };

  const handleDeleteRecipe = (meal, recipe) => {
    const filteredRecipes = savedRecipes[meal].filter(
      (item) => item._id !== recipe._id
    );
    setSavedRecipes({ ...savedRecipes, ...{ [meal]: filteredRecipes } });
  };

  //send plan to db
  const handleSubmit = (e) => {
    e.preventDefault();
    setDate("");
    setSavedRecipes({
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    });
    const day = moment(date).format("dddd");
    const formatDate = moment(date).format("YYYY-MM-DD");
    sendPlan(formatDate, day, savedRecipes);
    toggle();
    setRefresh((state) => !state);
  };

  return (
    <AddPlanForm
      date={date}
      setDate={setDate}
      open={open}
      setOpen={setOpen}
      meal={meal}
      savedRecipes={savedRecipes}
      handleAddRecipe={handleAddRecipe}
      handleDeleteRecipe={handleDeleteRecipe}
      handleSaveRecipe={handleSaveRecipe}
      handleSubmit={handleSubmit}
      {...props}
    />
  );
};

export default AddPlan;
