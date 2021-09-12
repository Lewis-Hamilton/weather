import { combineReducers } from "redux";
import unitReducer from "./unitReducer";
import locationReducer from "./locationReducer";
import tempReducer from "./tempReducer";

const rootReducer = combineReducers({
  unitReducer,
  locationReducer,
  tempReducer,
});

export default rootReducer;
