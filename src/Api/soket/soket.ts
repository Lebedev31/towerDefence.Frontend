import { io, Socket } from "socket.io-client";
import { getToken } from "../function/deleteToken";

export enum SocketBasikListener {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  CONNECT_ERROR = "connect_error",
  CONNECT_TIMEOUT = "connect_timeout",
  ERROR = "error",
}

export enum SocketChatListener {
  GETCHATLIST = "getChatList",
  PESRSONALDATA = "personalData",
  STARTCHAT = "startChat",
  GETCASHDIALOGUE = "getCashDialogue",
  SENDMESSAGE = "sendMessage",
}

export enum SocketNotificationsListiner {
  GETNOTIFICATIONS = "getNotifications",
  NOTIFICATIONSLIST = "notificationsList",
  REMOVENOTIFICATION = "removeNotification",
}

export enum SocketGlobalChatListiner {
  GETGLOBALIST = "getGlobalList",
  SENDMESSAGEGLOBAL = "sendMessageGlobal",
}

const path = process.env.NEXT_PUBLIC_BACKEND;
let socket: Socket;
export function startSocketClient(namespace: string): Socket {
  if (typeof window === "undefined") {
    throw new Error("сокет вызвался не на клиенте");
  }
  if (!socket) {
    socket = io(`${path + namespace}`, {
      transports: ["websocket", "polling"],
      auth: {
        token: getToken(),
      },
      autoConnect: false,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });
  }
  return socket;
}

export function socketConnect(socket: Socket): void {
  socket.on(SocketBasikListener.CONNECT, () => {
    console.log("есть подключение к серверу");
  });
}

export function socketDisconnect(socket: Socket): void {
  socket.on(SocketBasikListener.DISCONNECT, () => {
    console.log("отключение от сервера");
    socket.off();
  });
}

export function socketError(socket: Socket): void {
  socket.on(SocketBasikListener.CONNECT_ERROR, (error) => {
    console.log(error.message);
  });

  socket.on(SocketBasikListener.CONNECT_TIMEOUT, (error) => {
    if (error instanceof Error) {
      console.log(error.message);
    }
  });

  socket.on(SocketBasikListener.ERROR, (error) => {
    if (error instanceof Error) {
      console.log(error.message);
    }
  });
}
