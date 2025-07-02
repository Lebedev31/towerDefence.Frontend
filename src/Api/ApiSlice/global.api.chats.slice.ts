import { GlobalMessages, MessageServer, PushGlobalMessage } from "@/type/type";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  startSocketClient,
  socketConnect,
  socketError,
  socketDisconnect,
} from "../soket/soket";
import { SocketGlobalChatListiner } from "../soket/soket";

export const globalChatApi = createApi({
  reducerPath: "globalChatApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["GlobalChat"],
  endpoints: (builder) => ({
    getChatGlobalUsers: builder.query<GlobalMessages[], void>({
      async queryFn() {
        return { data: [] };
      },
      keepUnusedDataFor: 0,
      providesTags: ["GlobalChat"],
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
          socket.on(
            SocketGlobalChatListiner.GETGLOBALIST,
            (listUsers: GlobalMessages[]) => {
              if (Array.isArray(listUsers)) {
                updateCachedData(() => {
                  return [...listUsers];
                });
              }
            }
          );

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

    sendMessage: builder.mutation<MessageServer, PushGlobalMessage>({
      async queryFn(message) {
        const socket = startSocketClient("/chat");
        if (!socket.connected) {
          socket.connect();
          socketConnect(socket);
        }
        try {
          socket.emit(SocketGlobalChatListiner.SENDMESSAGEGLOBAL, { message });
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          socketError(socket);
        }
        return { data: { message: { success: true } } };
      },
      invalidatesTags: ["GlobalChat"],
    }),
  }),
});

export const { useGetChatGlobalUsersQuery, useSendMessageMutation } =
  globalChatApi;
