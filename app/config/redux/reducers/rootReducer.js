import { combineReducers } from "redux";
import recipeReducer from "./recipeReducer";

const rootReducer = combineReducers({
  recipe: recipeReducer,
});

export default rootReducer;
