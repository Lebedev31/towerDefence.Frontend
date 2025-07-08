import { useEffect, RefObject, useState } from "react";
import {
  startSocketClient,
  socketConnect,
  SocketGameListiner,
  socketError,
} from "@/Api/soket/soket";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Api/store";
import { useSelector } from "react-redux";
import { RootState } from "@/Api/store";
import { Socket } from "socket.io-client";

const useSocketGameAdapter = (game: RefObject<null | HTMLDivElement>) => {
  const dispatch: AppDispatch = useDispatch();
  const typeGame = useSelector((state: RootState) => state.mainGame.typeGame);
  useEffect(() => {
    if (game) {
      const socket = startSocketClient("/game");
      if (typeof window !== "undefined") {
        if (!socket.connected) {
          console.log(socket.connected);
          socket.connect();
          socket.emit(SocketGameListiner.TypeGame, typeGame);

          socket.on(SocketGameListiner.SendConfigGame, (data) => {
            console.log(data);
          });

          socketError(socket);
        }
      }
    }
  }, []);
};

export default useSocketGameAdapter;
