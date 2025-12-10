
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import deleteCookies from "./deleteCookies";
import { authKey } from "@/constants/auth";
import Cookies from "js-cookie";

export const logoutUser = (router: AppRouterInstance) => {
  if (typeof window !== undefined) {
    Cookies.remove(authKey);
    deleteCookies([authKey]);
    router.refresh();
  }
};
