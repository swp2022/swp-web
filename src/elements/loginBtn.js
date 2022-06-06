import React from "react";
import "./loginBtn.css";

const KAKAO_AUTH_URL = `https://api.ostudy.cf/oauth2/authorization/kakao?redirect-uri=${window.location.protocol}//${window.location.host}/login/oauth2/code/kakao`;

const loginBtn = () => (
  <div className="login-btn">
    <a className="login-text" href={KAKAO_AUTH_URL}>
      login
    </a>
  </div>
);

export default loginBtn;
