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
            invalidatesTags: [tagTypes.users],
        }),
        forgotPassowrd: build.mutation({
            query: (data) => {
                return {
                    url: `/customer-or-worker/forgot-password`,
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: [tagTypes.users],
        }),

        verifyOtp: build.mutation({
            query: (data) => {
                return {
                    url: `/customer-or-worker/verify-otp`,
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: [tagTypes.users],
        }),


        setNewPassword: build.mutation({
            query: (data) => {
                return {
                    url: `/customer-or-worker/set-new-password`,
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: [tagTypes.users],
        }),

        getProfile: build.query({
            query: () => {
                return {
                    url: `/customer-or-worker/me`,
                    method: "GET",
                };
            },
            providesTags: [
                tagTypes.users,
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
            invalidatesTags: [tagTypes.users],
        }),

        updateUserRole: build.mutation({
            query: ({ id, role }) => {
                return {
                    url: `/user/update-role/${id}`,
                    method: "PATCH",
                    body: { role },
                };
            },
            invalidatesTags: [tagTypes.users],
        }),
    }),
});

export const {
    useLoginUserMutation,
    useForgotPassowrdMutation,
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUpdateUserRoleMutation,
    useSetNewPasswordMutation,
    useVerifyOtpMutation
} = authApi;
