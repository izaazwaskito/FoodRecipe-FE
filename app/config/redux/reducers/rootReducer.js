import { combineReducers } from "redux";
import recipeReducer from "./recipeReducer";
import likeReducer from "./likeReducer";
import savedReducer from "./savedReducer";
import commentReducer from "./commentReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  recipe: recipeReducer,
  like: likeReducer,
  saved: savedReducer,
  comment: commentReducer,
  user: userReducer,
});

export default rootReducer;
