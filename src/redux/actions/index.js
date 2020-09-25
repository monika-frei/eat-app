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
        appUrl: `/recepies/:${item.id}`,
      },
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
