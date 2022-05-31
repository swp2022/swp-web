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

export const followerContentGetApi = async (page) => {
  return Axios.get(`/v1/board/follow?page=${page}`, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("tokenInfo")).accessToken
      }`,
    },
  });
};

export const BoardCommentGetApi = async (boardId) => {
  return Axios.get(`/v1/board/${boardId}/comment`, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("tokenInfo")).accessToken
      }`,
    },
  });
};

export const BoardCommentPostApi = async (boardId, comment) => {
  return Axios.post(
    `/v1/board/${boardId}/comment`,
    {
      content: comment,
    },
    {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("tokenInfo")).accessToken
        }`,
      },
    },
  );
};
