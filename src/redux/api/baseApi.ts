import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypes, tagTypesList } from "../tagTypes";
import Cookies from 'js-cookie'
import { authKey } from "@/constants/auth";

interface User {
  _id: string;
  email: string;
  role: 'customer' | 'worker';
  name?: string;
  avatar?: string;
}

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://10.10.20.16:5137`,
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
    getMe: builder.query<{ data: User }, void>({
      query: () => '/customer-or-worker/me',
      providesTags:[tagTypes.users]
    }),
  }),
});

export const { useGetMeQuery, useLazyGetMeQuery } = baseApi;