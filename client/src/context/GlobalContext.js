import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [plan, setPlan] = useState([]);
  const [plannedRecipes, setPlannedRecipes] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    let allRecipes = [];
    plan.map((item) => {
      allRecipes = [...allRecipes, ...item.recipes];
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
    setPlannedRecipes(plannedRecipes);
  }, [plan]);

  const handleSignUp = (e, email, password) => {
    e.preventDefault();
    const newUser = {
      email,
      password,
    };
    axios
      .post("http://localhost:4000/user/signup", newUser)
      .then((res) => {
        console.log(res);
        return axios.post("http://localhost:4000/user/login", newUser);
      })
      .then((res) => {
        console.log(res);
        setUserLoggedIn(true);
        setToken(res.data.token);
        setUserId(res.data.userId);
      })
      .catch((err) => console.log(err));
  };

  const handleLogIn = (e, email, password) => {
    e.preventDefault();
    const newUser = {
      email,
      password,
    };
    axios
      .post("http://localhost:4000/user/login", newUser)
      .then((res) => {
        setUserLoggedIn(true);
        setToken(res.data.token);
        setUserId(res.data.userId);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleLogOut = (e, email, password) => {
    e.preventDefault();
    const newUser = {
      email,
      password,
    };
    axios
      .post("http://localhost:4000/user/logout", newUser)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getPlan = () => {
    const today = moment().format("YYYY-MM-DD");
    axios
      .get("http://localhost:4000/plan", config)
      .then((res) => {
        console.log(res);
        const updatedPlan = res.data.plan.filter((dayPlan) => {
          if (
            moment(dayPlan.date).isAfter(today) ||
            moment(dayPlan.date).isSame(today)
          ) {
            return dayPlan;
          }
        });
        setPlan(updatedPlan);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <GlobalContext.Provider
      value={{
        userLoggedIn,
        token,
        userId,
        handleSignUp,
        handleLogIn,
        handleLogOut,
        getPlan,
        plan,
        setPlan,
        plannedRecipes,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
