const initialState = {
  location: "",
};

export default function locationReducer(state = initialState, action) {
  switch (action.type) {
    case "LOCATION":
      return { location: action.text };
    default:
      return state;
  }
}

export const changeLocation = (location) => {
  return {
    type: "LOCATION",
    text: location,
  };
};
