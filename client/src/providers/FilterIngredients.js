import React, { useState } from "react";
import { connect } from "react-redux";
import { generateGroceryList as generateGroceryListAction } from "../redux/actions/index";
import PropTypes from "prop-types";

const FilterIngredients = (props) => {
  const [activeGroceryList, setActiveGroceryList] = useState(false);
  const [selectedDays, setSelectedDays] = useState(["all"]);
  const [classActiveBtn, setClassActiveBtn] = useState(true);

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

  const getIngredientsArray = () => {
    const plan = props.plan;

    let daysArray;
    if (selectedDays.includes("all")) {
      daysArray = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ];
    } else {
      daysArray = selectedDays;
    }
    let allRecepies = [];
    daysArray.map((day) => {
      allRecepies = [
        ...allRecepies,
        ...plan[day].breakfast,
        ...plan[day].lunch,
        ...plan[day].dinner,
        ...plan[day].snacks,
      ];
    });
    let ingredientsArray = [];
    allRecepies.map((item) => {
      return (ingredientsArray = [...ingredientsArray, ...item.ingredients]);
    });
    return ingredientsArray;
  };

  const getFilteredIngredientsArray = () => {
    const ingredientsArray = getIngredientsArray();
    let filteredIngredients = [];
    ingredientsArray.forEach((item) => {
      if (
        filteredIngredients.filter(
          (ingredient) =>
            ingredient.title === item.title && ingredient.unit === item.unit
        ).length > 0
      ) {
        let indexToDelete = filteredIngredients.findIndex(
          (ingredient) =>
            ingredient.title === item.title && ingredient.unit === item.unit
        );
        const summedItem = {
          title: filteredIngredients[indexToDelete].title,
          amount: (
            parseInt(filteredIngredients[indexToDelete].amount, 10) +
            parseInt(item.amount, 10)
          ).toString(),
          unit: filteredIngredients[indexToDelete].unit,
        };
        filteredIngredients = filteredIngredients.filter(
          (ingredient, index) => index !== indexToDelete
        );
        filteredIngredients = [...filteredIngredients, summedItem];
      } else {
        filteredIngredients = [...filteredIngredients, item];
      }
    });

    return filteredIngredients;
  };

  const handleGenerateList = () => {
    const filteredArray = getFilteredIngredientsArray();
    props.saveGroceryList(filteredArray);
    setActiveGroceryList(true);
  };

  const renderProps = {
    handleSelectOption,
    selectedDays,
    classActiveBtn,
    activeGroceryList,
    handleGenerateList,
  };

  return props.render(renderProps);
};

const mapStateToProps = (state) => {
  return {
    plan: state.plan,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveGroceryList: (list) => dispatch(generateGroceryListAction(list)),
  };
};

FilterIngredients.propTypes = {
  setActivePopUp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterIngredients);
