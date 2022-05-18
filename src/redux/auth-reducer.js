import { createSlice } from "@reduxjs/toolkit";
import { storageState } from "../util/storage";

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
  initialState: storageState("userInfo", userInitialState),
  reducers: {
    setUserInfo(state, action) {
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.profileImage = action.payload.profileImage;
      state.role = action.payload.role;
    },
    eraseUserInfo(state) {
      state.email = "";
      state.nickname = "";
      state.profileImage = "";
      state.role = "";
    },
  },
});

const tokenSlice = createSlice({
  name: "token",
  initialState: storageState("tokenInfo", tokenInitialState),
  reducers: {
    setTokenInfo(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    eraseTokenInfo(state) {
      state.accessToken = "";
      state.refreshToken = "";
    }
  },
});

export const { setUserInfo, eraseUserInfo } = userSlice.actions;
export const { setTokenInfo ,eraseTokenInfo} = tokenSlice.actions;
export const userReducer = userSlice.reducer;
export const tokenReducer = tokenSlice.reducer;
