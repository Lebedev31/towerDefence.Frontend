import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Auth, MessageAuth, Registration } from "@/type/type";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND}/auth`,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    auth: builder.mutation<MessageAuth, Auth>({
      query: (data) => ({
        url: "/signIn",
        method: "POST",
        body: data,
      }),
      transformResponse: (response, meta) => {
        const header = new Map(meta?.response?.headers);
        const token = header.get("authorization")?.slice(6).trim();
        if (token) {
          const keyToken = process.env.NEXT_PUBLIC_TOKEN_KEY;
          if (keyToken) {
            localStorage.setItem(keyToken, token);
          }
        } else {
          const errorResponse = response as MessageAuth;
          errorResponse.message.success = false;
          return errorResponse;
        }
        return response as MessageAuth;
      },
    }),

    logout: builder.mutation<Registration, void>({
      query: () => ({
        url: "/logout",
        method: "Post",
      }),
    }),
  }),
});

export const { useAuthMutation, useLogoutMutation } = authApiSlice;
