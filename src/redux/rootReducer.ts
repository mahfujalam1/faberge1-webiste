import { baseApi } from "./api/baseApi";
import userReducer from "./features/user/userSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  user: userReducer,
};