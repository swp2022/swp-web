import { configureStore, createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const userInitialState = {
  email: "",
  nickname: "",
  profileImage: "",
  role: "",
};

const tokenInitialState = {
  accessToken: "",
  refreshToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUserInfo(state, action) {
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.profileImage = action.payload.profileImage;
      state.role = action.payload.role;
    },
  },
});

const tokenSlice = createSlice({
  name: "token",
  initialState: tokenInitialState,
  reducers: {
    setTokenInfo(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

const rootReducer = combineReducers({
  user: userSlice.reducer,
  token: tokenSlice.reducer,
});

const Store = configureStore({
  reducer: rootReducer,
});

export { Store, rootReducer };
export const { setUserInfo } = userSlice.actions;
export const { setTokenInfo } = tokenSlice.actions;
