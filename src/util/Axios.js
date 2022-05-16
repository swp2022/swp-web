import axios from "axios";

const baseURL = "https://test.chll.it";

export const Axios = axios.create({
  baseURL,
});

export const userInfoGetApi = async () => {
  return Axios.get("/v1/user", {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("tokenInfo")).accessToken
      }`,
    },
  });
};
