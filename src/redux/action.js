export const setUser = (userInfo) => {
  window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
  return {
    type: "SET_USER",
    payload: userInfo,
  };
};

export const setToken = (tokenInfo) => {
  window.localStorage.setItem("tokenInfo", JSON.stringify(tokenInfo));
  return {
    type: "SET_TOKEN",
    payload: tokenInfo,
  };
};
