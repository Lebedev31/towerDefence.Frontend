import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  startSocketClient,
  socketConnect,
  socketDisconnect,
  socketError,
} from "../soket/soket"; // ваш клиент

interface ChatUser {
  id: string;
  name: string;
}

export const chatApiSlice = createApi({
  reducerPath: "chatApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getChatUsers: builder.query<ChatUser[], void>({
      async queryFn() {
        return { data: [] };
      },

      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = startSocketClient();
        try {
          await cacheDataLoaded;
          socketConnect(socket);

          socket.on("getChatList", (list: ChatUser[]) => {
            console.log(45);
            console.log(list);
          });

          await cacheEntryRemoved;
          socketDisconnect(socket);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          socketError(socket);
        }
      },

      // (опционально) оставляем данные 20 секунд после закрытия
      keepUnusedDataFor: 20,
    }),
  }),
});

export const { useGetChatUsersQuery } = chatApiSlice;
