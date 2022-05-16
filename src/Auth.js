import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "./redux/action";
const baseUrl = "https://test.chll.it";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          const { data } = response;
          console.log(response);
          dispatch(setUser(data));
          dispatch(setToken(tokenInfo));
          navigate("/mainpage");
        });
        
    } catch (error) {}
  };

  getToken();
};

export default Auth;
