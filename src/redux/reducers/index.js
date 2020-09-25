const initialState = {
  recepies: [
    {
      id: 1,
      category: ["breakfast"],
      title: "oat meal",
      url: "",
      ingredients: [
        { title: "oat flakes", amount: "50", unit: "g" },
        { title: "nuts", amount: "50", unit: "g" },
        { title: "milk", amount: "200", unit: "ml" },
      ],
      preparation: {
        stepOne:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie efficitur lacus, eu elementum magna fermentum ut. Fusce interdum nunc sed nisi sagittis, mattis vulputate sem porttitor. ",
        stepTwo:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie efficitur lacus, eu elementum magna fermentum ut. Fusce interdum nunc sed nisi sagittis, mattis vulputate sem porttitor. ",
        stepThree:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie efficitur lacus, eu elementum magna fermentum ut. Fusce interdum nunc sed nisi sagittis, mattis vulputate sem porttitor. ",
      },
      extra: {
        time: "30min",
        servings: 1,
        info: "",
      },
    },
    {
      id: 2,
      category: ["breakfast", "lunch"],
      title: "sandwich",
      url: "",
      ingredients: [
        { title: "egg", amount: "2", unit: "" },
        { title: "salad", amount: "1", unit: "" },
        { title: "bread", amount: "50", unit: "g" },
      ],
      preparation: {
        stepOne:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie efficitur lacus, eu elementum magna fermentum ut. Fusce interdum nunc sed nisi sagittis, mattis vulputate sem porttitor. ",
        stepTwo:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie efficitur lacus, eu elementum magna fermentum ut. Fusce interdum nunc sed nisi sagittis, mattis vulputate sem porttitor. ",
      },
      extra: {
        time: "15min",
        servings: 1,
        info: "",
      },
    },
    {
      id: 3,
      category: ["breakfast"],
      title: "scrambled eggs",
      url: "",
      ingredients: [
        { title: "egg", amount: "3", unit: "" },
        { title: "onion", amount: "1", unit: "" },
        { title: "butter", amount: "200", unit: "ml" },
      ],
      preparation: {
        stepOne:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie efficitur lacus, eu elementum magna fermentum ut. Fusce interdum nunc sed nisi sagittis, mattis vulputate sem porttitor. ",
        stepTwo:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie efficitur lacus, eu elementum magna fermentum ut. Fusce interdum nunc sed nisi sagittis, mattis vulputate sem porttitor. ",
        stepThree:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie efficitur lacus, eu elementum magna fermentum ut. Fusce interdum nunc sed nisi sagittis, mattis vulputate sem porttitor. ",
      },
      extra: {
        time: "30min",
        servings: 1,
        info: "",
      },
    },
    {
      id: 4,
      category: ["lunch", "dinner"],
      title: "salad",
      url: "",
      ingredients: [
        { title: "egg", amount: "1", unit: "" },
        { title: "onion", amount: "1", unit: "" },
        { title: "salad", amount: "1", unit: "" },
        { title: "", amount: "1", unit: "1" },
      ],
      preparation: {
        stepOne:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie efficitur lacus, eu elementum magna fermentum ut. Fusce interdum nunc sed nisi sagittis, mattis vulputate sem porttitor. ",
        stepTwo:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie efficitur lacus, eu elementum magna fermentum ut. Fusce interdum nunc sed nisi sagittis, mattis vulputate sem porttitor. ",
        stepThree:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie efficitur lacus, eu elementum magna fermentum ut. Fusce interdum nunc sed nisi sagittis, mattis vulputate sem porttitor. ",
      },
      extra: {
        time: "30min",
        servings: 1,
        info: "",
      },
    },
  ],
  plan: {
    monday: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    },
    tuesday: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    },
    wednesday: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    },
    thursday: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    },
    friday: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    },
    saturday: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    },
    sunday: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    },
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_RECEPIES_TO_PLAN":
      return {
        ...state,
        plan: {
          ...state.plan,
          [action.payload.day]: {
            ...state.plan[action.payload.day],
            ...action.payload.savedRecepies,
          },
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
