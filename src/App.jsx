import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.js";
import Auth from "./Utils/Auth";
import MainPage from "./Pages/MainPage";
import MyPage from "./Pages/MyPage";
import StudyLogPage from "./Pages/StudyLogPage";
import { HomePrivateRoute, PrivateRoute } from "./Routers/PrivateRoute";
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "./Utils/Theme";

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
