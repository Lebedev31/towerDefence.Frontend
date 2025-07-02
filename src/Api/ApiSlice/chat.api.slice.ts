import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  startSocketClient,
  socketConnect,
  socketError,
  socketDisconnect,
} from "../soket/soket"; // ваш клиент
import { SocketChatListener } from "../soket/soket";
import { MessageServer } from "@/type/type";


interface ChatUser {
  id: string;
  name: string;
}

export interface MessageUser {
  id: string;
  message: string;
  date: string;
  isRead: boolean;
}


export const chatApiSlice = createApi({
  reducerPath: "chatApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getChatUsers: builder.query < ChatUser[], void> ({
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

    startChat: builder.query < MessageUser[], string> ({
      async queryFn() {
        return { data: [] };
      },
      keepUnusedDataFor: 0,
      async onCacheEntryAdded(id, { updateCachedData, cacheDataLoaded }) {
        const socket = startSocketClient("/chat");
        try {
          await cacheDataLoaded;
          if (!socket.connected) {
            socket.connect();
            socketConnect(socket);
          }
          socket.emit(SocketChatListener.STARTCHAT, { id });
          socket.on(
            SocketChatListener.GETCASHDIALOGUE,
            (data: MessageUser[]) => {
              console.log(data);
              if (Array.isArray(data)) {
                updateCachedData(() => {
                  return [...data];
                });
              }
            }
          );
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          socketError(socket);
        }
      },
    }),

    sendMessage: builder.mutation < MessageServer, MessageUser> ({
      async queryFn(message) {
        const socket = startSocketClient("/chat");
        if (!socket.connected) {
          socket.connect();
          socketConnect(socket);
        }
        try {
          socket.emit(SocketChatListener.SENDMESSAGE, { message });
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          socketError(socket);
        }
        return { data: { message: { success: true } } };
      },
    }),
  }),
});

export const {
  useGetChatUsersQuery,
  useSendMessageMutation,
  useStartChatQuery,
} = chatApiSlice;
