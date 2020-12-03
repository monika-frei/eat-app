import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [plan, setPlan] = useState([]);
  const [plannedRecepies, setPlannedRecepies] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    let allRecepies = [];
    plan.map((item) => {
      allRecepies = [...allRecepies, ...item.recepies];
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
    setPlannedRecepies(plannedRecepies);
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
        plannedRecepies,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
