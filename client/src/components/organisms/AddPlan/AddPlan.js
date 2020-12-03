import React, { useEffect, useState, useContext } from "react";
import AddPlanForm from "../AddPlanForm/AddPlanForm";
import moment from "moment";

const AddPlan = (props) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [savedRecepies, setSavedRecepies] = useState({
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
      setSavedRecepies({
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: [],
      });
    }
  }, [classOpen]);

  useEffect(() => {
    setDate(planToEdit.date);
    setSavedRecepies(planToEdit.plan);
  }, [planToEdit]);

  const handleAddRecepie = (e, meal) => {
    setMeal(meal);
    setOpen(true);
    e.preventDefault();
  };

  //function which saves chosen recepie from the list
  const handleSaveRecepie = (recepie, meal) => {
    if (
      savedRecepies[meal].find((item) => item._id === recepie._id) === undefined
    ) {
      const newArray = [...savedRecepies[meal], recepie];
      setSavedRecepies({ ...savedRecepies, ...{ [meal]: newArray } });
    }
  };

  const handleDeleteRecepie = (meal, recepie) => {
    const filteredRecepies = savedRecepies[meal].filter(
      (item) => item._id !== recepie._id
    );
    setSavedRecepies({ ...savedRecepies, ...{ [meal]: filteredRecepies } });
  };

  //send plan to db
  const handleSubmit = (e) => {
    e.preventDefault();
    setDate("");
    setSavedRecepies({
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    });
    const day = moment(date).format("dddd");
    const formatDate = moment(date).format("YYYY-MM-DD");
    sendPlan(formatDate, day, savedRecepies);
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
      savedRecepies={savedRecepies}
      handleAddRecepie={handleAddRecepie}
      handleDeleteRecepie={handleDeleteRecepie}
      handleSaveRecepie={handleSaveRecepie}
      handleSubmit={handleSubmit}
      {...props}
    />
  );
};

export default AddPlan;
