import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Auth } from "@/type/type";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    auth: builder.mutation<void, Auth>({
      query: (data) => ({
        url: "auth/signIn",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAuthMutation } = authApiSlice;
