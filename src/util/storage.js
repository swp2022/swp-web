const getStorage = (storageKey) => JSON.parse(localStorage.getItem(storageKey));

export const storageState = (storageKey, predefined) => {
    const stored = getStorage(storageKey);
    if (stored)
        return stored;
    return predefined;
}

export const logoutClear = () => {
    window.localStorage.removeItem("tokenInfo");
    window.localStorage.removeItem("userInfo");
}