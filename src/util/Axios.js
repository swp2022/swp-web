import axios from "axios";

const baseURL = "https://test.chll.it";
const testToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0dXNlciIsInByb3ZpZGVyIjoidGVzdHVzZXIiLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNjUyODAxNDY4LCJleHAiOjE2NTc4ODc4Njh9.qvR3b6Alms5tAuvB7_Ryr9e3BHKFMVTY-gnnHoEiYw4nQ8EpZtY3UFZhVSlMxlnWZQjNl36peK1g4zJdP-or5g";
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

export const followerContentGetApi = async () => {
  return Axios.get("/v1/board/follow",{
    headers: {
      Authorization: `Bearer ${
        testToken
        //JSON.parse(localStorage.getItem("tokenInfo")).accessToken
      }`,
    },
  });
};

export const getBoardComment = async (boardId) => {
  return Axios.get(`/v1/board/${boardId}/comment`,{
    headers: {
      Authorization: `Bearer ${
        testToken
        //JSON.parse(localStorage.getItem("tokenInfo")).accessToken
      }`,
    },
  });
}; 
