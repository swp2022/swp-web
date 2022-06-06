import axios from "axios";

const baseURL = "https://api.ostudy.cf";

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

export const myContentGetApi = async (page) => {
  return Axios.get(`/v1/board/my?page=${page}`, {
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

export const studyGetApi = async (page) => {
  return Axios.get(`/v1/study?page=${page}`, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("tokenInfo")).accessToken
      }`,
    },
  });
};

export const postStudyContent = async (content, studyId) => {
  return Axios.post(
    "/v1/board",
    {
      content: content,
      studyId: studyId,
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
