import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  startSocketClient,
  socketConnect,
  socketDisconnect,
  socketError,
} from "../soket/soket"; // ваш клиент
import { SocketChatListener } from "../soket/soket";
import { RootState } from "../store";

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
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }
      ) {
        const socket = startSocketClient();
        const state = getState() as RootState;
        const payload = state.main.personalData;
        try {
          await cacheDataLoaded;
          if (!socket.connected) socketConnect(socket);

          socket.emit(SocketChatListener.PESRSONALDATA, payload);

          socket.on(SocketChatListener.GETCHATLIST, (listUsers: ChatUser[]) => {
            console.log(5);
            updateCachedData((draft) => {
              console.log(draft);
              Object.assign(draft, listUsers);
            });
          });
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          socketError(socket);
        }

        await cacheEntryRemoved;
        if (socket.connected) socketDisconnect(socket);
      },
    }),
  }),
});

export const { useGetChatUsersQuery } = chatApiSlice;
