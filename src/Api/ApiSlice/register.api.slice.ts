import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Registration, MessageRegistration } from "@/type/type";

export const registerApiSlice = createApi({
  reducerPath: "registerApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND }),
  endpoints: (builder) => ({
    registration: builder.mutation<MessageRegistration, Registration>({
      query: (newUser) => ({
        url: "auth/register",
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

export const { useRegistrationMutation } = registerApiSlice;
