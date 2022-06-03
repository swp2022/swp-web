import axios from "axios";

const baseURL = "https://test.chll.it";
const test =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0dXNlciIsInByb3ZpZGVyIjoidGVzdHVzZXIiLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNjUyODAxNDY4LCJleHAiOjE2NTc4ODc4Njh9.qvR3b6Alms5tAuvB7_Ryr9e3BHKFMVTY-gnnHoEiYw4nQ8EpZtY3UFZhVSlMxlnWZQjNl36peK1g4zJdP-or5g";

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

export const searchUserInfoApi = async (userName) => {
  return Axios.get(`/v1/user/search/${userName}`, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("tokenInfo")).accessToken
      }`,
    },
  });
};

export const postFollowingApi = async (userId) => {
  return Axios.post(
    "/v1/relationship",
    {
      toUserId: userId,
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

export const deleteFollowingApi = async (userId) => {
  return Axios.delete("/v1/relationship", {
    data: {
      toUserId: userId,
    },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("tokenInfo")).accessToken
      }`,
    },
  });
};

export const studyLogGetApi = async (studyId) => {
  return Axios.get(`/v1/study/studylog/${studyId}`, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("tokenInfo")).accessToken
      }`,
    },
  });
};
