import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.js";
import Auth from "./utils/Auth";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import StudyLogPage from "./pages/StudyLogPage";
import { HomePrivateRoute, PrivateRoute } from "./routers/PrivateRoute";
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "./utils/Theme";

const App = () => (
  <ThemeProvider theme={Theme}>
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <HomePrivateRoute>
              <LoginPage />
            </HomePrivateRoute>
          }
        />
        <Route path="/login/oauth2/code/kakao" element={<Auth />} />
        <Route
          path="/mainpage"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/mypage"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/studylog"
          element={
            <PrivateRoute>
              <StudyLogPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
