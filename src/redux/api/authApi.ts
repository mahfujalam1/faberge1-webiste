import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        loginUser: build.mutation({
            query: (data) => {
                return {
                    url: `/customer-or-worker/login`,
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: [tagTypes.users, tagTypes.auth,],
        }),
        forgotPassowrd: build.mutation({
            query: (data) => {
                return {
                    url: `/auth/forgot-password`,
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: [tagTypes.users, tagTypes.auth],
        }),
        getProfile: build.query({
            query: () => {
                return {
                    url: `/customer-or-worker/me`,
                    method: "GET",
                };
            },
            providesTags: [
                tagTypes.users, tagTypes.auth,
            ],
        }),

        updateProfile: build.mutation({
            query: ({ data, id }) => {
                return {
                    url: `/user/user/${id}`,
                    method: "PATCH",
                    body: data,
                };
            },
            invalidatesTags: [tagTypes.users, tagTypes.auth],
        }),

        updateUserRole: build.mutation({
            query: ({ id, role }) => {
                console.log(id, role);
                return {
                    url: `/user/update-role/${id}`,
                    method: "PATCH",
                    body: { role },
                };
            },
            invalidatesTags: [tagTypes.users, tagTypes.auth],
        }),
    }),
});

export const {
    useLoginUserMutation,
    useForgotPassowrdMutation,
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUpdateUserRoleMutation,
} = authApi;
