import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Auth, MessageRegistration } from "@/type/type";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND}/auth`,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    auth: builder.mutation<MessageRegistration, Auth>({
      query: (data) => ({
        url: "/signIn",
        method: "POST",
        body: data,
      }),
      transformResponse: (response, meta) => {
        const header = new Map(meta?.response?.headers);
        const token = header.get("authorization")?.slice(6);
        if (token) {
          const keyToken = process.env.NEXT_PUBLIC_TOKEN_KEY;
          if (keyToken) {
            localStorage.setItem(keyToken, token);
          }
        } else {
          const errorResponse = response as MessageRegistration;
          errorResponse.message.success = false;
          return errorResponse;
        }
        return response as MessageRegistration;
      },
    }),

    logout: builder.mutation<MessageRegistration, void>({
      query: () => ({
        url: "/logout",
        method: "Post",
      }),
    }),
  }),
});

export const { useAuthMutation, useLogoutMutation } = authApiSlice;


