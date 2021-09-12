const initialState = {
  rounded: true,
};

export default function tempReducer(state = initialState, action) {
  switch (action.type) {
    case "ROUNDED":
      return { rounded: true };
    case "EXACT":
      return { rounded: false };
    default:
      return state;
  }
}
