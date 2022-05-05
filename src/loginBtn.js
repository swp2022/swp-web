import React from 'react';
import "./loginBtn.css"
const REST_API_KEY = "2cc475ed61ab76bc4dd417b0440ab04b";
const REDIRECT_URL = "http://localhost:3000/login/oauth2/code/kakao";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;  

const loginBtn = () => {
    (
        <div className ="login-btn">
            <a className ="login-text" href = {KAKAO_AUTH_URL}>login</a>
        </div>
    );
}

export default loginBtn;