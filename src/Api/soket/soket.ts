import { io, Socket } from "socket.io-client";
import { getToken } from "../function/deleteToken";

const path = process.env.NEXT_PUBLIC_BACKEND;
let socket: Socket;
export function startSocketClient(): Socket {
  if (typeof window === "undefined") {
    throw new Error("сокет вызвался не на клиенте");
  }
  if (!socket) {
    socket = io(path, {
      transports: ["websocket", "polling"],
      auth: {
        token: getToken(),
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });
  }
  return socket;
}

export function socketConnect(socket: Socket): void {
  socket.on("connect", () => {
    console.log("есть подключение к серверу");
  });
}

export function socketDisconnect(socket: Socket): void {
  socket.on("disconnect", () => {
    console.log("клиент отключен от сервера");
  });
}

export function socketError(socket: Socket): void {
  socket.on("connect_error", (error) => {
    console.log(error.message);
  });

  socket.on("connect_timeout", (error) => {
    if (error instanceof Error) {
      console.log(error.message);
    }
  });

  socket.on("error", (error) => {
    if (error instanceof Error) {
      console.log(error.message);
    }
  });
}
