const initialState = {
  funColors: true,
};

export default function colorReducer(state = initialState, action) {
  switch (action.type) {
    case "COLORS":
      return { funColors: true };
    case "BLACK":
      return { funColors: false };
    default:
      return state;
  }
}
