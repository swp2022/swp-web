const getStorage = (storageKey) => JSON.parse(localStorage.getItem(storageKey));

export const storageState = (storageKey, predefined) => {
  const stored = getStorage(storageKey);
  if (stored) return stored;
  return predefined;
};

export const removeTokenInfo = () => {
  localStorage.removeItem("tokenInfo");
};

export const removeUserInfo = () => {
  localStorage.removeItem("userInfo");
};
