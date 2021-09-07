import { combineReducers } from "redux";

import unitReducer from "./unitReducer";
import locationReducer from "./locationReducer";

const rootReducer = combineReducers({
  unitReducer,
  locationReducer,
});

export default rootReducer;
