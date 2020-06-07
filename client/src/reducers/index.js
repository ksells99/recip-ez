import { combineReducers } from "redux";

import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import recipeReducer from "./recipeReducer";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  recipe: recipeReducer,
});
