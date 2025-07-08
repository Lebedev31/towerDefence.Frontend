// src/Api/middleware.ts
import { Middleware, isAction } from "@reduxjs/toolkit";
import { startSocketClient } from "./soket/soket";
import { Socket } from "socket.io-client"; // Импортируем тип Socket

const outbox: string[] = []; // Предполагается, что здесь будут типы экшенов, которые нужно отправлять через сокет

// Объявляем переменную для экземпляра сокета, но не инициализируем ее сразу
let socketInstance: Socket | null = null;

export const socketMiddleware: Middleware = (store) => (next) => (action) => {
  // Инициализируем сокет только один раз и только на клиентской стороне
  if (typeof window !== "undefined" && !socketInstance) {
    socketInstance = startSocketClient("/game");
  }
  // Если экшен является обычным экшеном Redux, его тип есть в outbox, и сокет инициализирован
  if (isAction(action) && outbox.includes(action.type) && socketInstance) {
    // Убедимся, что socketInstance не null перед использованием
    socketInstance.emit(
      action.type,
      (action as unknown as { payload: any }).payload
    );
  }

  return next(action);
};
