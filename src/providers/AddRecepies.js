import { useState } from "react";

const AddRecepies = (props) => {
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
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
    console.log("dziala");
    const filteredRecepies = savedRecepies[meal].filter(
      (item) => item.appUrl !== recepie.appUrl
    );
    setSavedRecepies({ ...savedRecepies, ...{ [meal]: filteredRecepies } });
  };

  const handleEdit = (day, date, plan) => {
    setMeal(meal);
    setDay(day);
    setDate(date);
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
    date,
    setDate,
  };
  return props.render(renderProps);
};

export default AddRecepies;
