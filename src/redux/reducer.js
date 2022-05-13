var initState = {
  userInfo: JSON.parse(window.localStorage.getItem("userInfo")),
  tokenInfo: JSON.parse(localStorage.getItem("tokenInfo")),
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_USERINFO":
      return { ...state, userInfo: action.payload };
    case "SET_TOKENINFO":
      return { ...state, tokenInfo: action.payload };

    default:
      return state;
  }
};

export default rootReducer;
