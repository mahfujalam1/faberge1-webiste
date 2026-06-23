import { baseApi } from "./baseApi";

const subscriberApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    subscribe: build.mutation({
      query: (data) => ({
        url: `/subscriber/subscribe`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSubscribeMutation } = subscriberApi;

export default subscriberApi;
