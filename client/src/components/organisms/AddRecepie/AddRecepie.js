import React, { useState, useContext, useEffect } from "react";
import { RecepiesContext } from "../../../context/RecepiesContext";
import AddRecepieForm from "../AddRecepieForm/AddRecepieForm";
import Axios from "axios";

const AddRecepie = ({ classOpen, toggle, recepieToEdit }) => {
  const { sendRecepie } = useContext(RecepiesContext);
  const [step, setStep] = useState(1);
  const [editStep, setEditStep] = useState(null);
  const [content, setContent] = useState("");
  const [editContent, setEditContent] = useState("");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [servings, setServings] = useState("");
  const [addInfo, setAddInfo] = useState("");
  const [meals, setMeals] = useState([]);
  const [ingredientTitle, setIngredientTitle] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState("-");
  const [ingredients, setIngredients] = useState([]);
  const [preparation, setPreparation] = useState([]);
  const [file, setFile] = useState("");

  useEffect(() => {
    if (recepieToEdit) {
      setTitle(recepieToEdit.title);
      setTime(recepieToEdit.time);
      setServings(recepieToEdit.servings);
      setAddInfo(recepieToEdit.info);
      setMeals(recepieToEdit.category);
      setIngredients(recepieToEdit.ingredients);
      setPreparation(recepieToEdit.preparation);
    }
  }, [recepieToEdit]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleStepChange = (e) => {
    setStep(Math.floor(parseInt(e.target.value)));
  };

  const handleInputMeals = (e) => {
    const target = e.target;
    const value = target.checked;
    const name = target.name;
    if (value) {
      setMeals((meals) => [...meals, name]);
    } else {
      const filteredMeals = meals.filter((meal) => !meal.includes(name));
      setMeals(filteredMeals);
    }
  };

  const handleAddIngredient = () => {
    const id = Math.floor(Math.random() * 1000);
    const ingredient = {
      id,
      title: ingredientTitle,
      amount: ingredientAmount,
      unit: ingredientUnit,
    };
    setIngredients((ingredients) => [...ingredients, ingredient]);
  };
  const handleDeleteIngredient = (item) => {
    const filteredIngredients = ingredients.filter(
      (ingredient) => ingredient.id !== item.id
    );
    setIngredients(filteredIngredients);
  };

  const handleAddPrepStep = () => {
    let addStep;
    if (editStep) {
      addStep = {
        step: editStep,
        content,
      };
    } else {
      addStep = {
        step,
        content,
      };
    }

    const filteredPreparation = preparation.filter((item) => {
      return item.step !== editStep && item.step !== step;
    });
    const actualStep = editStep && step;

    setPreparation(() => [...filteredPreparation, addStep]);
    if (actualStep) {
      setStep(actualStep);
    } else {
      setStep((step) => step + 1);
    }
    setContent("");
    setEditContent("");
    setEditStep(null);
  };
  const handleDeletePrepStep = (step) => {
    const filteredPreparation = preparation.filter(
      (item) => item.step !== step.step
    );
    setPreparation(filteredPreparation);
  };

  const handleEditPrepStep = (item) => {
    setEditStep(item.step);
    setContent(item.content);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      category: meals,
      title,
      ingredients,
      preparation,
      time,
      servings,
      info: addInfo,
    };
    const json = JSON.stringify(obj);

    const formData = new FormData();
    formData.append("document", json);
    if (file !== "") {
      formData.append("file", file);
    }
    sendRecepie(formData);
    toggle();
  };

  return (
    <AddRecepieForm
      classOpen={classOpen}
      toggle={toggle}
      title={title}
      setTitle={setTitle}
      meals={meals}
      setMeals={setMeals}
      ingredientTitle={ingredientTitle}
      setIngredientTitle={setIngredientTitle}
      ingredientAmount={ingredientAmount}
      setIngredientAmount={setIngredientAmount}
      ingredientUnit={ingredientUnit}
      setIngredientUnit={setIngredientUnit}
      time={time}
      setTime={setTime}
      servings={servings}
      setServings={setServings}
      addInfo={addInfo}
      setAddInfo={setAddInfo}
      editStep={editStep}
      step={step}
      content={content}
      setContent={setContent}
      ingredients={ingredients}
      preparation={preparation}
      handleInputMeals={handleInputMeals}
      handleAddIngredient={handleAddIngredient}
      handleFileUpload={handleFileUpload}
      handleDeleteIngredient={handleDeleteIngredient}
      handleStepChange={handleStepChange}
      handleAddPrepStep={handleAddPrepStep}
      handleEditPrepStep={handleEditPrepStep}
      handleDeletePrepStep={handleDeletePrepStep}
      handleSubmit={handleSubmit}
    />
  );
};

export default AddRecepie;
