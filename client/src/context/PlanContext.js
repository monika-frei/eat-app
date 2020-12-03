import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";
import moment from "moment";

export const PlanContext = createContext();

const PlanContextProvider = (props) => {
  const { plan } = useContext(GlobalContext);
  const [dayPlan, setDayPlan] = useState({
    day: "",
    date: "",
    plan: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    },
  });
  const [planToEdit, setPlanToEdit] = useState({
    day: "",
    date: "",
    plan: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    },
  });
  const { token, userId } = useContext(GlobalContext);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getPlanById = (id) => {
    axios
      .get(`http://localhost:4000/plan/${id}`, config)
      .then((res) => {
        console.log(res);
        setDayPlan(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const savePlan = (date, day, savedRecepies) => {
    const dayPlan = {
      day,
      date,
      recepies: savedRecepies,
      userData: {
        userId,
      },
    };
    axios
      .post("http://localhost:4000/plan", dayPlan, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePlan = (planId) => {
    axios
      .delete(`http://localhost:4000/plan/${planId}`, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePlan = (planId, planToUpdate) => {
    axios
      .patch(`http://localhost:4000/plan/${planId}`, planToUpdate, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addRecepieToPlan = (date, meal, recepie) => {
    const formatDate = moment(date).format("YYYY-MM-DD");
    if (plan.filter((item) => item.date === formatDate).length === 0) {
      let savedRecepies = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: [],
      };
      savedRecepies[meal] = [...savedRecepies[meal], recepie];
      const day = moment(date).format("dddd");

      savePlan(formatDate, day, savedRecepies);
    } else {
      const [planToUpdate] = plan.filter((item) => {
        if (item.date === formatDate) {
          return item;
        }
      });
      const checkRepetition = planToUpdate.plan[meal].filter((item) => {
        if (item._id === recepie._id) {
          return item;
        }
      });
      if (planToUpdate && checkRepetition.length === 0) {
        planToUpdate.plan[meal] = [...planToUpdate.plan[meal], recepie];
        updatePlan(planToUpdate._id, planToUpdate);
      }
    }
  };
  const sendPlan = (date, day, savedRecepies) => {
    if (plan.filter((item) => item.date === date).length === 0) {
      savePlan(date, day, savedRecepies);
    } else {
      const [planInDb] = plan.filter((item) => {
        if (item.date === date) {
          return item;
        }
      });
      const planToUpdate = {
        date,
        day,
        plan: savedRecepies,
      };
      if (planToUpdate) {
        updatePlan(planInDb._id, planToUpdate);
      }
    }
  };

  return (
    <PlanContext.Provider
      value={{
        getPlanById,
        savePlan,
        sendPlan,
        deletePlan,
        dayPlan,
        planToEdit,
        setPlanToEdit,
        updatePlan,
        addRecepieToPlan,
      }}
    >
      {props.children}
    </PlanContext.Provider>
  );
};

export default PlanContextProvider;
