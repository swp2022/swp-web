import Home from "./home";
import LoginPage from "./LoginPage";
import Auth from "./Auth"
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import "./App.css";


const App = () => (
  <div >
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<LoginPage/>} />
        <Route path = "/login/oauth2/code/kakao" element = {<Auth/>} />
        <Route path = "/mainpage:id" element = {Home} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
