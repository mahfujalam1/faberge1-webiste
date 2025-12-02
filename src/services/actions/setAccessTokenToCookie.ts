/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { authKey } from "@/constants/auth";
import Cookies from 'js-cookie';

import { redirect } from "next/navigation";
const setAccessTokenToCookies = (token: string, option?: any) => {
  Cookies.set(authKey, token);
  if (option && option.redirect) {
    redirect(option.redirect);
  }
};

export default setAccessTokenToCookies;
