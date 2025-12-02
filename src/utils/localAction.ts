import Cookies from "js-cookie";
export const setToLocalStorage = (key: string, token: string) => {
    if (!key || typeof window === "undefined") {
        return "";
    }
    return Cookies.set(key, token);
};

export const getFromLocalStorage = (key: string) => {
    if (!key || typeof window === "undefined") {
        return "";
    }
    return Cookies.get(key);
};

export const removeFromLocalStorage = (key: string) => {
    if (!key || typeof window === "undefined") {
        return "";
    }
    return Cookies.remove(key);
};