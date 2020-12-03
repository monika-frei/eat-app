import React, { useState, useEffect, useContext } from "react";
import styles from "./GroceryListPage.module.scss";
import UserPageTemplate from "../../templates/UserPageTemplate/UserPageTemplate";
import Button from "../../components/atoms/Button/Button";
import GroceryList from "../../components/organisms/GroceryList/GroceryList";
import PopUpListItem from "../../components/molecules/PopUpListItem/PopUpListItem";
import cx from "classnames";
import { GlobalContext } from "../../context/GlobalContext";
import { RecepiesContext } from "../../context/RecepiesContext";
import GroceryListTemplate from "../../templates/GroceryListTemplate/GroceryListTemplate";

const GroceryListPage = ({ addItemToGroceryList, groceryList }) => {
  const [activePopUp, setActivePopUp] = useState(false);
  const [fetchedRecepies, setFetchedRecepies] = useState([]);
  const [activeGroceryList, setActiveGroceryList] = useState(false);
  const [selectedDays, setSelectedDays] = useState(["all"]);
  const [classActiveBtn, setClassActiveBtn] = useState(true);
  const [recepiesToList, setRecepiesToList] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const { plan, plannedRecepies } = useContext(GlobalContext);
  const { getSingleRecepie, recepie } = useContext(RecepiesContext);

  useEffect(() => {
    plannedRecepies.map((item) => {
      getSingleRecepie(item.recepieId);
    });
  }, [plannedRecepies]);

  useEffect(() => {
    setFetchedRecepies([...fetchedRecepies, recepie]);
  }, [recepie]);

  useEffect(() => {
    getPlanRecepies();
  }, []);

  useEffect(() => {
    getPlanRecepies();
  }, [selectedDays, fetchedRecepies]);

  useEffect(() => {
    getAllIngredients();
  }, [recepiesToList]);

  useEffect(() => {
    getFilteredIngredientsArray();
  }, [ingredients]);

  const handleAddItem = (inputTitle, inputAmount, inputUnit) => {
    const newItem = {
      title: inputTitle,
      amount: inputAmount,
      unit: inputUnit,
    };
    setIngredients([...ingredients, newItem]);
    setActivePopUp(false);
  };

  const getPlanRecepies = () => {
    let daysArray;
    let allRecepies = [];
    if (selectedDays.includes("all")) {
      daysArray = plan.map((item) => item.date);
    } else {
      daysArray = selectedDays;
    }
    plan.map((item) => {
      if (daysArray.includes(item.date)) {
        allRecepies = [...allRecepies, ...item.recepies];
      }
    });
    let plannedRecepies = [];
    allRecepies.map((recepie, index, array) => {
      const count = array.filter((item) => item === recepie).length;
      const newItem = {
        count,
        recepieId: recepie,
      };
      if (
        plannedRecepies.find((item) => item.recepieId === recepie) === undefined
      ) {
        plannedRecepies = [...plannedRecepies, newItem];
      }
    });
    setRecepiesToList(plannedRecepies);
  };

  const handleSelectOption = (date) => {
    if (selectedDays.includes(date)) {
      const activeOptions = selectedDays.filter((item) => item !== date);
      setSelectedDays(activeOptions);
    } else {
      const activeOptions = [...selectedDays, date];
      setSelectedDays(activeOptions);
    }
    setClassActiveBtn(classActiveBtn);
  };

  const getFilteredIngredientsArray = () => {
    let filteredIngredients = [];
    if (ingredients.length !== 0) {
      ingredients.forEach((item) => {
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
    }

    setFilteredIngredients(filteredIngredients);
  };

  const getAllIngredients = () => {
    let allIngredients = [];
    fetchedRecepies.map((item) => {
      const [count] = recepiesToList.filter((plannedRecepie) => {
        if (plannedRecepie.recepieId === item._id) {
          return plannedRecepie.count;
        }
      });
      if (count) {
        const recepieIngredients = item.ingredients.map((ingredient) => {
          const amount = parseInt(ingredient.amount, 10);
          return {
            title: ingredient.title,
            amount: amount * count.count,
            unit: ingredient.unit,
          };
        });
        allIngredients = [...allIngredients, ...recepieIngredients];
      }
    });
    setIngredients(allIngredients);
  };

  return (
    <UserPageTemplate border="borderTertiary" bgColorLight="bgTertiaryLight">
      <GroceryListTemplate
        handleSelectOption={handleSelectOption}
        handleAddItem={handleAddItem}
        setActivePopUp={setActivePopUp}
        selectedDays={selectedDays}
        classActiveBtn={classActiveBtn}
        fetchedRecepies={fetchedRecepies}
        activePopUp={activePopUp}
        groceryList={filteredIngredients}
      />
    </UserPageTemplate>
  );
};

export default GroceryListPage;
