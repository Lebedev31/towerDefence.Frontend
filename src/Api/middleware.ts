// src/Api/middleware.ts
import { Middleware, isAction } from "@reduxjs/toolkit";
import {
  startSocketClient,
  SocketGameListiner,
  socketDisconnect,
} from "./soket/soket";
import { Socket } from "socket.io-client"; // Импортируем тип Socket
import { getFromLocalStorage } from "@/components/Game/helpers/settingGameSession";
import { setConfiguration } from "./Slice/mainGameSlice";

export enum KeyActionType {
  SetTypeGame = "mainGame/setTypeGame",
  CreateGameObject = "mainGame/createGameObject",
}

// Объявляем переменную для экземпляра сокета, но не инициализируем ее сразу
let socketInstance: Socket | null = null;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const socketMiddleware: Middleware = (store) => (next) => (action) => {
  const path = window.location.pathname;
  // Инициализируем сокет только один раз и только на клиентской стороне
  if (
    typeof window !== "undefined" &&
    !socketInstance &&
    (path === "/game" || path === "/preload")
  ) {
    socketInstance = startSocketClient("/game");
    socketInstance.connect();
  }

  if (socketInstance && path !== "/game" && path !== "/preload") {
    socketInstance.disconnect();
    socketDisconnect(socketInstance);
    socketInstance = null;
    store.dispatch(setConfiguration(null));
  }
  // Если экшен является обычным экшеном Redux, его тип есть в outbox, и сокет инициализирован
  if (isAction(action) && "payload" in action && socketInstance) {
    switch (action.type) {
      case KeyActionType.SetTypeGame:
        socketInstance.emit(SocketGameListiner.TypeGame, {
          game: action.payload,
        });
        break;
      case KeyActionType.CreateGameObject:
        const session = getFromLocalStorage("session");
        console.log(session);
        const newPayload =
          action.payload && typeof action.payload === "object"
            ? { ...action.payload, session }
            : null;
        socketInstance.emit(SocketGameListiner.CreateGameObject, {
          gameObject: newPayload,
        });
    }
  }

  return next(action);
};
