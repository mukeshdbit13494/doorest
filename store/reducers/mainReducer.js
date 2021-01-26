import { combineReducers } from "redux";
import { partnerReducer } from "./partnerReducer";
import { serviceReducer } from "./serviceReducer";
import { userReducer } from "./userReducer";
import { adminReducer } from "./adminReducer";
import { globalReducer } from "./globalReducer";

const mainReducer = combineReducers({
  partnerReducer,
  serviceReducer,
  userReducer,
  adminReducer,
  globalReducer,
});

export default mainReducer;
