import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage.js";
import Auth from "./Auth";
import MainPage from "./MainPage";
import { HomePrivateRoute, PrivateRoute } from "./routers/PrivateRoute";
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "./util/Theme";

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
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
