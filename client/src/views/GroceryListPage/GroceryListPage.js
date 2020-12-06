import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router";
import UserPageTemplate from "../../templates/UserPageTemplate/UserPageTemplate";
import { GlobalContext } from "../../context/GlobalContext";
import { RecipesContext } from "../../context/RecipesContext";
import GroceryListTemplate from "../../templates/GroceryListTemplate/GroceryListTemplate";

const GroceryListPage = ({ addItemToGroceryList, groceryList }) => {
  const [activePopUp, setActivePopUp] = useState(false);
  const [fetchedRecipes, setFetchedRecipes] = useState([]);
  const [activeGroceryList, setActiveGroceryList] = useState(false);
  const [selectedDays, setSelectedDays] = useState(["all"]);
  const [classActiveBtn, setClassActiveBtn] = useState(true);
  const [recipesToList, setRecipesToList] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const { plan, plannedRecipes, userLoggedIn } = useContext(GlobalContext);
  const { getSingleRecipe, recipe } = useContext(RecipesContext);

  useEffect(() => {
    plannedRecipes.map((item) => {
      getSingleRecipe(item.recepieId);
    });
  }, [plannedRecipes]);

  useEffect(() => {
    setFetchedRecipes([...fetchedRecipes, recipe]);
  }, [recipe]);

  useEffect(() => {
    getPlanRecipes();
  }, []);

  useEffect(() => {
    getPlanRecipes();
  }, [selectedDays, fetchedRecipes]);

  useEffect(() => {
    getAllIngredients();
  }, [recipesToList]);

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

  const getPlanRecipes = () => {
    let daysArray;
    let allRecipes = [];
    if (selectedDays.includes("all")) {
      daysArray = plan.map((item) => item.date);
    } else {
      daysArray = selectedDays;
    }
    plan.map((item) => {
      if (daysArray.includes(item.date)) {
        allRecipes = [...allRecipes, ...item.recipe];
      }
    });
    let plannedRecipes = [];
    allRecipes.map((recipe, index, array) => {
      const count = array.filter((item) => item === recipe).length;
      const newItem = {
        count,
        recipeId: recipe,
      };
      if (
        plannedRecipes.find((item) => item.recipeId === recipe) === undefined
      ) {
        plannedRecipes = [...plannedRecipes, newItem];
      }
    });
    setRecipesToList(plannedRecipes);
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
    fetchedRecipes.map((item) => {
      const [count] = recipesToList.filter((plannedRecipe) => {
        if (plannedRecipe.recipeId === item._id) {
          return plannedRecipe.count;
        }
      });
      if (count) {
        const recipeIngredients = item.ingredients.map((ingredient) => {
          const amount = parseInt(ingredient.amount, 10);
          return {
            title: ingredient.title,
            amount: amount * count.count,
            unit: ingredient.unit,
          };
        });
        allIngredients = [...allIngredients, ...recipeIngredients];
      }
    });
    setIngredients(allIngredients);
  };

  if (userLoggedIn === false) {
    return <Redirect to="/login" />;
  }

  return (
    <UserPageTemplate border="borderTertiary" bgColorLight="bgTertiaryLight">
      <GroceryListTemplate
        handleSelectOption={handleSelectOption}
        handleAddItem={handleAddItem}
        setActivePopUp={setActivePopUp}
        selectedDays={selectedDays}
        classActiveBtn={classActiveBtn}
        fetchedRecipes={fetchedRecipes}
        activePopUp={activePopUp}
        groceryList={filteredIngredients}
      />
    </UserPageTemplate>
  );
};

export default GroceryListPage;
