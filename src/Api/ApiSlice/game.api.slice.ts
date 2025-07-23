import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { startSocketClient, socketConnect, socketError } from "../soket/soket"; // ваш клиент
import { SocketGameListiner } from "../soket/soket";
import { saveToLocalStorage } from "@/components/Game/helpers/settingGameSession";
import {
  setConfiguration,
  gameObjectReceived,
} from "@/Api/Slice/mainGameSlice";
import { GameObject } from "@/Api/Slice/mainGameSlice";

export const gameApiSlice = createApi({
  reducerPath: "gameApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    proccesingSocketGameEvent: builder.query<void, void>({
      queryFn: async () => {
        return { data: "true" }; // 👈 важно вернуть data
      },
      async onCacheEntryAdded(arg, { dispatch }) {
        const socket = startSocketClient("/game");

        socket.on(SocketGameListiner.SendConfigGame, (data) => {
          console.log("Получили SendConfigGame:", data);
          saveToLocalStorage("session", data.roomName);
          dispatch(setConfiguration(data));
        });

        socket.on(SocketGameListiner.SendGameObject, (data: GameObject) => {
          console.log("Получили CreateGameObject:", data);
          dispatch(gameObjectReceived(data));
        });

        if (!socket.connected) {
          socketConnect(socket);
        }

        socketError(socket);
      },
    }),
  }),
});

export const { useProccesingSocketGameEventQuery } = gameApiSlice;
