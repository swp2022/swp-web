import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { tokenReducer, userReducer } from "./auth-reducer";
import { boardReducer } from "./board-reducer";
const rootReducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
  board: boardReducer,
});

const Store = configureStore({
  reducer: rootReducer,
});

export { Store, rootReducer };
