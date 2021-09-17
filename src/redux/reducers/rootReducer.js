import { combineReducers } from "redux";
import unitReducer from "./unitReducer";
import locationReducer from "./locationReducer";
import tempReducer from "./tempReducer";
import colorReducer from "./colorReducer";

const rootReducer = combineReducers({
  unitReducer,
  locationReducer,
  tempReducer,
  colorReducer,
});

export default rootReducer;
