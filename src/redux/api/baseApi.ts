import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypes, tagTypesList } from "../tagTypes";
import Cookies from 'js-cookie'
import { authKey } from "@/constants/auth";

export interface User {
  email?: string;
  title?: string;
  address?: string;
  workerId?: string;
  firstName?: string;
  lastName?: string;
  role?: "worker" | "customer";
  uploadPhoto?: string;
  _id?: string;
}

// API response interface
export interface GetMeResponse {
  data: User;
  isLoading: boolean
}

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
    prepareHeaders: (headers) => {
      const token = Cookies.get(authKey);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // ✅ Cache configuration to reduce API calls
  keepUnusedDataFor: 300, // Keep cache for 5 minutes (300 seconds)
  refetchOnMountOrArgChange: 30, // Only refetch if data is older than 30 seconds
  refetchOnFocus: false, // Don't refetch when window regains focus
  refetchOnReconnect: false, // Don't refetch when reconnecting
  tagTypes: tagTypesList,
  endpoints: (builder) => ({}),
});

export default baseApi;