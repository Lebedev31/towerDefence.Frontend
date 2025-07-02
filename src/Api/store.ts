import { configureStore } from "@reduxjs/toolkit";
import { registerApiSlice } from "./ApiSlice/register.api.slice";
import { authApiSlice } from "./ApiSlice/auth.api.slice";
import mainReduser from "./Slice/mainSlice";
import { chatApiSlice } from "./ApiSlice/chat.api.slice";
import { friendsApiSlice } from "./ApiSlice/friends.api.slice";
import { notifitionsApiSlice } from "./ApiSlice/notification.api.slice";
import { globalChatApi } from "./ApiSlice/global.api.chats.slice";
import mainGameReduser from "./Slice/mainGameSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      main: mainReduser,
      [registerApiSlice.reducerPath]: registerApiSlice.reducer,
      [authApiSlice.reducerPath]: authApiSlice.reducer,
      [chatApiSlice.reducerPath]: chatApiSlice.reducer,
      [friendsApiSlice.reducerPath]: friendsApiSlice.reducer,
      [notifitionsApiSlice.reducerPath]: notifitionsApiSlice.reducer,
      [globalChatApi.reducerPath]: globalChatApi.reducer,
      mainGame: mainGameReduser,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        registerApiSlice.middleware,
        authApiSlice.middleware,
        chatApiSlice.middleware,
        friendsApiSlice.middleware,
        notifitionsApiSlice.middleware,
        globalChatApi.middleware
      ),
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
