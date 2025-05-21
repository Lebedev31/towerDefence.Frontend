import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Registration, MessageServer } from "@/type/type";

export const registerApiSlice = createApi({
  reducerPath: "registerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND,
    timeout: 6000,
  }),
  endpoints: (builder) => ({
    registration: builder.mutation<MessageServer, Registration>({
      query: (newUser) => ({
        url: "auth/register",
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

export const { useRegistrationMutation } = registerApiSlice;
