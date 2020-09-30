export const addRecepiesToPlan = (day, savedRecepies) => {
  return {
    type: "ADD_RECEPIES_TO_PLAN",
    payload: {
      day,
      savedRecepies,
    },
  };
};

export const quickAddRecepie = (day, meal, item) => {
  return {
    type: "QUICK_ADD",
    payload: {
      day,
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
