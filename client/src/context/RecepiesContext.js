import React, { createContext, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";

export const RecepiesContext = createContext();

const RecepiesContextProvider = (props) => {
  const [recepies, setRecepies] = useState([]);
  const [recepie, setRecepie] = useState({
    title: "",
    category: [],
    ingredients: [],
    preparation: [],
    time: "",
    servings: "",
    info: "",
    recepieImage: "",
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

  const getAllRecepies = () => {
    axios
      .get("http://localhost:4000/recepies", config)
      .then((res) => {
        setRecepies(res.data.recepies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSingleRecepie = async (id) => {
    const res = await axios.get(`http://localhost:4000/recepies/${id}`, config);
    const data = await res.data;
    setRecepie(data);
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

  const createRecepie = (formData) => {
    axios
      .post("http://localhost:4000/recepies", formData, configPost)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(`Something went wrong ${err}`);
      });
  };

  const updateRecepie = (formData) => {
    axios
      .patch(`http://localhost:4000/recepies/${id}`, formData, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(`Something went wrong ${err}`);
      });
  };

  const sendRecepie = (formData) => {
    if (id) {
      updateRecepie(formData);
      console.log(id);
    } else {
      console.log(id);
      createRecepie(formData);
    }
  };

  const deleteRecepie = () => {
    if (id !== "") {
      axios
        .delete(`http://localhost:4000/recepies/${id}`, config)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <RecepiesContext.Provider
      value={{
        getAllRecepies,
        getSingleRecepie,
        recepies,
        recepie,
        createRecepie,
        sendRecepie,
        deleteRecepie,
      }}
    >
      {props.children}
    </RecepiesContext.Provider>
  );
};

export default RecepiesContextProvider;
