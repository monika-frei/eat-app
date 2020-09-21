export const addRecepiesToPlan = (day, savedRecepies) => {
  return {
    type: "ADD_RECEPIES_TO_PLAN",
    payload: {
      day,
      savedRecepies,
    },
  };
};
