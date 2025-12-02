/* eslint-disable @typescript-eslint/no-explicit-any */

import { authKey } from "@/constants/auth";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localAction";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const storeUserInfo = (accessToken: string) => {
  return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
    const authToken = Cookies.get(authKey);
    if (authToken) {
      const decodedInfo: any = jwtDecode(authToken);
      return {
        ...decodedInfo
      }
    }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  }
};
