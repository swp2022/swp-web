import axios from "axios";

const baseURL = "https://test.chll.it";

export const Axios = axios.create({
  baseURL,
});

export const userInfoGetApi = async () =>
  Axios.get("/v1/user", {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("tokenInfo")).accessToken
      }`,
    },
  });

export const followerContentGetApi = async () => {
  return Axios.get("/v1/board/follow", {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("tokenInfo")).accessToken
      }`,
    },
  });
};

export const getBoardComment = async (boardId) => {
  return Axios.get(`/v1/board/${boardId}/comment`, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("tokenInfo")).accessToken
      }`,
    },
  });
};
