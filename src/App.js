import Home from "./home";
import LoginPage from "./LoginPage.js";
import Auth from "./Auth"
import {BrowserRouter, Routes, Route} from 'react-router-dom';



const App = () => (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<LoginPage/>} />
        <Route path = "/login/oauth2/code/kakao:token" element = {<Auth/>} />
        <Route path = "/mainpage/:id" element = {Home} />
      </Routes>
    </BrowserRouter>
);

export default App;
