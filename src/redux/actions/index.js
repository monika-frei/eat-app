export const addRecepiesToPlan = (day, date, savedRecepies) => {
  return {
    type: "ADD_RECEPIES_TO_PLAN",
    payload: {
      day,
      date,
      savedRecepies,
    },
  };
};

export const quickAddRecepie = (day, date, meal, item) => {
  return {
    type: "QUICK_ADD",
    payload: {
      day,
      date,
      meal,
      recepie: {
        meal,
        id: item.id,
        title: item.title,
        ingredients: item.ingredients,
        appUrl: `/recepies/:${item.id}`,
      },
    },
  };
};
export const deleteRecepie = (recepie) => {
  return {
    type: "DELETE_RECEPIE",
    payload: {
      recepie,
    },
  };
};

export const createRecepie = (recepie) => {
  return {
    type: "CREATE_RECEPIE",
    payload: {
      recepie,
    },
  };
};

export const displayRecepies = () => {
  return {
    type: "DISPLAY_RECEPIES",
  };
};

export const displayRecepieDetails = (recepie) => {
  return {
    type: "DISPLAY_RECEPIE_DETAILS",
    payload: {
      recepie,
    },
  };
};
export const generateGroceryList = (list) => {
  return {
    type: "GENERATE_NEW_GROCERY_LIST",
    payload: {
      list,
    },
  };
};

export const addGroceryList = (list) => {
  return {
    type: "ADD_GROCERY_LIST",
    payload: {
      list,
    },
  };
};

export const addItemToGroceryList = (item) => {
  return {
    type: "ADD_ITEM_TO_GROCERY_LIST",
    payload: {
      item,
    },
  };
};

export const deleteItemFromGroceryList = (item) => {
  return {
    type: "DELETE_ITEM_FROM_GROCERY_LIST",
    payload: {
      item,
    },
  };
};
