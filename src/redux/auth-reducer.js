import { createSlice } from "@reduxjs/toolkit";

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

export const { setUserInfo } = userSlice.actions;
export const { setTokenInfo } = tokenSlice.actions;
export const userReducer = userSlice.reducer;
export const tokenReducer = tokenSlice.reducer;
