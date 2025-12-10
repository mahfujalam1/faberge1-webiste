import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypes, tagTypesList } from "../tagTypes";
import Cookies from 'js-cookie'
import { authKey } from "@/constants/auth";

export interface User {
  email?: string;
  title?:string;
  address?:string;
  workerId?:string;
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
    baseUrl: `https://x91h36px-5137.inc1.devtunnels.ms`,
    prepareHeaders: (headers) => {
      const token = Cookies.get(authKey);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: tagTypesList,
  endpoints: (builder) => ({
    getMe: builder.query<GetMeResponse, void>({
      query: () => '/customer-or-worker/me',
      providesTags: [tagTypes.users]
    }),
  }),
});

export const { useGetMeQuery, useLazyGetMeQuery } = baseApi;