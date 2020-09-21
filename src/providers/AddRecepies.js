import { useState } from "react";

const AddRecepies = (props) => {
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState("");
  const [savedRecepies, setSavedRecepies] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  });
  const [meal, setMeal] = useState("");
  const meals = ["breakfast", "lunch", "dinner", "snacks"];

  const handleAddRecepie = (e, meal) => {
    setMeal(meal);
    setOpen(true);
    e.preventDefault();
  };
  //function which saves chosen recepie from the list
  const handleSaveRecepie = (recepie) => {
    const newArray = [...savedRecepies[meal], recepie];
    setSavedRecepies({ ...savedRecepies, ...{ [meal]: newArray } });
  };
  const handleDeleteRecepie = (meal, recepie) => {
    const filteredRecepies = savedRecepies[meal].filter(
      (item) => item.appUrl !== recepie.appUrl
    );
    setSavedRecepies({ ...savedRecepies, ...{ [meal]: filteredRecepies } });
  };

  const handleEdit = (day, plan) => {
    setMeal(meal);
    setDay(day);
    setSavedRecepies(plan[day]);
  };

  const renderProps = {
    meals,
    meal,
    savedRecepies,
    handleSaveRecepie,
    handleAddRecepie,
    handleDeleteRecepie,
    setOpen,
    open,
    setSavedRecepies,
    handleEdit,
    day,
    setDay,
  };
  return props.render(renderProps);
};

export default AddRecepies;
