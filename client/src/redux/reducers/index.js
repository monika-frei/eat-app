const initialState = {
  recepies: [
    {
      id: "1",
      category: ["breakfast"],
      title: "oat meal",
      url: "",
      ingredients: [
        { title: "oat flakes", amount: "50", unit: "g" },
        { title: "nuts", amount: "50", unit: "g" },
        { title: "milk", amount: "200", unit: "ml" },
      ],
      preparation: [
        {
          step: "1",
          content:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, ",
        },
        {
          step: "2",
          content:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, ",
        },
        {
          step: "3",
          content:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, ",
        },
      ],
      extra: {
        time: "30min",
        servings: "1",
        info: "",
      },
    },
    {
      id: "2",
      category: ["breakfast", "lunch"],
      title: "sandwich",
      url: "",
      ingredients: [
        { title: "egg", amount: "2", unit: "" },
        { title: "salad", amount: "1", unit: "" },
        { title: "bread", amount: "50", unit: "g" },
      ],
      preparation: [
        {
          step: "1",
          content:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, ",
        },
        {
          step: "2",
          content:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, ",
        },
        {
          step: "3",
          content:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, ",
        },
      ],
      extra: {
        time: "15min",
        servings: "1",
        info: "",
      },
    },
    {
      id: "3",
      category: ["breakfast"],
      title: "scrambled eggs",
      url: "",
      ingredients: [
        { title: "egg", amount: "3", unit: "" },
        { title: "onion", amount: "1", unit: "" },
        { title: "butter", amount: "200", unit: "ml" },
      ],
      preparation: [
        {
          step: "1",
          content:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, ",
        },
        {
          step: "2",
          content:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, ",
        },
        {
          step: "3",
          content:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, ",
        },
      ],
      extra: {
        time: "30min",
        servings: "1",
        info: "",
      },
    },
    {
      id: "4121323232123",
      category: ["lunch", "dinner"],
      title: "salad",
      url: "",
      ingredients: [
        { title: "egg", amount: "1", unit: "" },
        { title: "onion", amount: "1", unit: "" },
        { title: "salad", amount: "1", unit: "" },
      ],
      preparation: [
        {
          step: "1",
          content:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, ",
        },
        {
          step: "2",
          content:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, ",
        },
        {
          step: "3",
          content:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, ",
        },
      ],
      extra: {
        time: "",
        servings: "",
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
  groceryList: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DISPLAY_RECEPIES":
      return {
        recepies: state.recepies,
      };
    case "DISPLAY_RECEPIE_DETAILS":
      return {
        ...state,
        recepie: action.payload.recepie,
      };
    case "ADD_RECEPIES_TO_PLAN":
      return {
        ...state,
        plan: {
          ...state.plan,
          [action.payload.day]: {
            ...state.plan[action.payload.day],
            ...action.payload.savedRecepies,
            date: action.payload.date,
          },
        },
      };
    case "DELETE_RECEPIE":
      const filteredRecepies = state.recepies.filter(
        (item) => item.id !== action.payload.recepie.id
      );
      return {
        ...state,
        recepies: filteredRecepies,
      };
    case "QUICK_ADD":
      return {
        ...state,
        plan: {
          ...state.plan,
          [action.payload.day]: {
            ...state.plan[action.payload.day],
            [action.payload.meal]: [
              ...state.plan[action.payload.day][action.payload.meal],
              action.payload.recepie,
            ],
          },
        },
      };
    case "CREATE_RECEPIE":
      return {
        ...state,
        recepies: [...state.recepies, action.payload.recepie],
      };
    case "GENERATE_NEW_GROCERY_LIST":
      return {
        ...state,
        groceryList: action.payload.list,
        additionalItems: [],
      };
    case "ADD_GROCERY_LIST":
      return {
        ...state,
        groceryList: [...state.groceryList, ...action.payload.list],
      };
    case "ADD_ITEM_TO_GROCERY_LIST":
      return {
        ...state,
        groceryList: [...state.groceryList, action.payload.item],
      };
    case "DELETE_ITEM_FROM_GROCERY_LIST":
      const filteredList = state.groceryList.filter((ingredient) => {
        return ingredient !== action.payload.item;
      });
      return {
        ...state,
        groceryList: filteredList,
      };
    default:
      return state;
  }
};

export default rootReducer;
