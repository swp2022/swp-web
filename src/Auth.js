import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTokenInfo, setUserInfo } from "./redux/reducer";

const baseUrl = "https://test.chll.it";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setUserDispatch = (userInfo) => dispatch(setUserInfo(userInfo));
  const setTokenInfoDispatch = (tokenInfo) => dispatch(setTokenInfo(tokenInfo));

  const getToken = async () => {
    const tokenInfo = {
      accessToken: new URL(window.location.href).searchParams.get(
        "accessToken"
      ),
      refreshToken: new URL(window.location.href).searchParams.get(
        "refreshToken"
      ),
    };

    try {
      axios
        .get(`${baseUrl}/v1/user`, {
          headers: {
            Authorization: `Bearer ${tokenInfo.accessToken}`,
          },
        })
        .then((response) => {
          const { data: userInfo } = response;
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          localStorage.setItem("tokenInfo", JSON.stringify(tokenInfo));
          setUserDispatch(userInfo);
          setTokenInfoDispatch(tokenInfo);
          navigate("/mainpage");
        });
    } catch (error) {
      console.error({ error });
    }
  };

  getToken();
};

export default Auth;
