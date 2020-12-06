import React, { createContext, useState, useContext } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";

export const RecipesContext = createContext();

const RecipesContextProvider = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState({
    title: "",
    category: [],
    ingredients: [],
    preparation: [],
    time: "",
    servings: "",
    info: "",
    recipeImage: "",
  });

  const location = useLocation();
  const id = location ? location.pathname.split("/")[2] : "";

  const { token } = useContext(GlobalContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const configPost = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const getAllRecipes = () => {
    axios
      .get("http://localhost:4000/recipes", config)
      .then((res) => {
        setRecipes(res.data.recipes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSingleRecipe = async (id) => {
    const res = await axios.get(`http://localhost:4000/recipes/${id}`, config);
    const data = await res.data;
    setRecipe(data);
    // axios
    //   .get(`http://localhost:4000/recepies/${id}`, config)
    //   .then((res) => {
    //     console.log(res);
    //     setRecepie(res.data);
    //     return res.data;
    //   })
    //   .catch((err) => {
    //     console.log(`Something went wrong ${err}`);
    //   });
  };

  const createRecipe = (formData) => {
    axios
      .post("http://localhost:4000/recipes", formData, configPost)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(`Something went wrong ${err}`);
      });
  };

  const updateRecipe = (formData) => {
    axios
      .patch(`http://localhost:4000/recipes/${id}`, formData, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(`Something went wrong ${err}`);
      });
  };

  const sendRecipe = (formData) => {
    if (id) {
      updateRecipe(formData);
      console.log(id);
    } else {
      console.log(id);
      createRecipe(formData);
    }
  };

  const deleteRecipe = () => {
    if (id !== "") {
      axios
        .delete(`http://localhost:4000/recipes/${id}`, config)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <RecipesContext.Provider
      value={{
        getAllRecipes,
        getSingleRecipe,
        recipes,
        recipe,
        createRecipe,
        sendRecipe,
        deleteRecipe,
      }}
    >
      {props.children}
    </RecipesContext.Provider>
  );
};

export default RecipesContextProvider;
