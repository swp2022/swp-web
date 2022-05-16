import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { tokenReducer, userReducer } from "./auth-reducer";

const rootReducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
});

const Store = configureStore({
  reducer: rootReducer,
});

export { Store, rootReducer };
