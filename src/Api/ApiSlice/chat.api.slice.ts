import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  startSocketClient,
  socketConnect,
  socketError,
  socketDisconnect,
} from "../soket/soket"; // ваш клиент
import { SocketChatListener } from "../soket/soket";

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
      keepUnusedDataFor: 0,
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = startSocketClient("/chat");
        try {
          await cacheDataLoaded;
          if (!socket.connected) {
            socket.connect();
            socketConnect(socket);
          }
          socket.emit(SocketChatListener.PESRSONALDATA);

          socket.on(SocketChatListener.GETCHATLIST, (listUsers: ChatUser[]) => {
            if (Array.isArray(listUsers)) {
              updateCachedData(() => {
                return [...listUsers];
              });
            }
          });

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          socketError(socket);
        }

        await cacheEntryRemoved;
        if (socket.connected) {
          socket.disconnect();
          socketDisconnect(socket);
        }
      },
    }),

    dialogueUser: builder.query({
      async queryFn() {
        return { data: [] };
      },
      keepUnusedDataFor: 0,
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = startSocketClient("/chat");
        try {
          await cacheDataLoaded;
          if (!socket.connected) {
            socket.connect();
            socketConnect(socket);
          }
          socket.emit(SocketChatListener.STARTCHAT);
          socket.on(SocketChatListener.STARTCHAT, () => {
            console.log(233455);
          });
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          socketError(socket);
        }

        await cacheEntryRemoved;
        if (socket.connected) {
          socket.disconnect();
          socketDisconnect(socket);
        }
      },
    }),
  }),
});

export const { useGetChatUsersQuery, useLazyDialogueUserQuery } = chatApiSlice;
