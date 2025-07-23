import { configureStore } from "@reduxjs/toolkit";
import { registerApiSlice } from "./ApiSlice/register.api.slice";
import { authApiSlice } from "./ApiSlice/auth.api.slice";
import mainReduser from "./Slice/mainSlice";
import { chatApiSlice } from "./ApiSlice/chat.api.slice";
import { friendsApiSlice } from "./ApiSlice/friends.api.slice";
import { notifitionsApiSlice } from "./ApiSlice/notification.api.slice";
import { globalChatApi } from "./ApiSlice/global.api.chats.slice";
import mainGameReduser from "./Slice/mainGameSlice";
import { socketMiddleware } from "./middleware";
import { gameApiSlice } from "./ApiSlice/game.api.slice";

export const store = configureStore({
  reducer: {
    main: mainReduser,
    [registerApiSlice.reducerPath]: registerApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [chatApiSlice.reducerPath]: chatApiSlice.reducer,
    [friendsApiSlice.reducerPath]: friendsApiSlice.reducer,
    [notifitionsApiSlice.reducerPath]: notifitionsApiSlice.reducer,
    [globalChatApi.reducerPath]: globalChatApi.reducer,
    [gameApiSlice.reducerPath]: gameApiSlice.reducer,
    mainGame: mainGameReduser,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      registerApiSlice.middleware,
      authApiSlice.middleware,
      chatApiSlice.middleware,
      friendsApiSlice.middleware,
      notifitionsApiSlice.middleware,
      globalChatApi.middleware,
      gameApiSlice.middleware,
      socketMiddleware
    ),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
