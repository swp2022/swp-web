import LoginPage from "./LoginPage.js";
import Auth from "./Auth"
import MainPage from "./MainPage";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import{ HomePrivateRoute,PrivateRoute} from './PrivateRoute';


function App(){
    return(
      <BrowserRouter>
        <Routes>
          <Route exact path = "/" element = {
                                    <HomePrivateRoute>
                                      <LoginPage/>
                                    </HomePrivateRoute>
                                  } />
          <Route path = "/login/oauth2/code/kakao" element = {<Auth/>} />
          <Route path = "/mainpage" element = {
                                      <PrivateRoute>
                                        <MainPage/>
                                      </PrivateRoute>
                                    }/>
        </Routes>
      </BrowserRouter>
    );
};

export default App;
