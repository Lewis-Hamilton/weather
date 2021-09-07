const initialState = {
  unit: "imperial",
};

export default function unitReducer(state = initialState, action) {
  switch (action.type) {
    case "IMPERIAL":
      return { unit: "imperial" };
    case "METRIC":
      return { unit: "metric" };
    default:
      return state;
  }
}
