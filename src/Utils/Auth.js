import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userInfoGetApi } from "./Axios";
import { setTokenInfo, setUserInfo } from "../redux/auth-reducer";
const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setUserDispatch = (userInfo) => dispatch(setUserInfo(userInfo));
  const setTokenInfoDispatch = (tokenInfo) => dispatch(setTokenInfo(tokenInfo));

  const getToken = async () => {
    const tokenInfo = {
      accessToken: new URL(window.location.href).searchParams.get(
        "accessToken",
      ),
      refreshToken: new URL(window.location.href).searchParams.get(
        "refreshToken",
      ),
    };

    localStorage.setItem("tokenInfo", JSON.stringify(tokenInfo));

    try {
      const response = await userInfoGetApi();
      const { data: userInfo } = response;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      setUserDispatch(userInfo);
      setTokenInfoDispatch(tokenInfo);
      navigate("/mainpage");
    } catch (e) {
      if (e.response.status === 400) {
        alert("bad request");
      }
    }
  };
  getToken();
};

export default Auth;
