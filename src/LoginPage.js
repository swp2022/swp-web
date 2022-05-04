import logo from './logo.svg';
import "./index.css";
import "./LoginPage.css"
import LoginBtn from './loginBtn';

function LoginPage(){
  return (
    <div className ="center-wrapper">
      <div className = "loading-circle"></div>
      <div className = "container">
        <div className = "center-logo"></div>
        <div className = "center-login">
          <LoginBtn></LoginBtn>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;