import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageServer } from "@/type/type";
import { getToken } from "../function/deleteToken";

export interface FriendItem {
  id: string;
  name: string;
  status: "online" | "offline";
}

export const friendsApiSlice = createApi({
  reducerPath: "friendsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND,
    timeout: 6000,
    credentials: "include", // для работы с куками
    prepareHeaders(headers) {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Friends"], // для инвалидации кэша
  endpoints: (builder) => ({
    getFriends: builder.query<FriendItem[], void>({
      query: () => ({
        url: "/friends",
        method: "GET",
      }),
      providesTags: ["Friends"],
    }),

    addFriend: builder.mutation<MessageServer, string>({
      query: (id) => ({
        url: "/friends",
        method: "POST",
        body: { id },
      }),
      invalidatesTags: ["Friends"], // обновляем список друзей после добавления
    }),

    removeFriend: builder.mutation<MessageServer, string>({
      query: (id) => ({
        url: "/friends",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Friends"], // обновляем список друзей после удаления
    }),
  }),
});

export const {
  useGetFriendsQuery,
  useAddFriendMutation,
  useRemoveFriendMutation,
} = friendsApiSlice;
