import axios from "axios";
import { loadAccessToken } from "./storage";
const baseURL = "https://test.chll.it";

axios.defaults.baseURL = baseURL;
axios.defaults.headers.common['Authorization'] = `Bearer ${loadAccessToken()}`;

export const setAxiosAuthorization = (accessToken) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

export const userInfoGetApi = async () => {
  return axios.get("/v1/user");
};