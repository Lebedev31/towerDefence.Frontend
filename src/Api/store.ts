import { configureStore } from "@reduxjs/toolkit";
import { registerApiSlice } from "./ApiSlice/register.api.slice";
import { authApiSlice } from "./ApiSlice/auth.api.slice";
import mainReduser from "./Slice/mainSlice";

export const store = configureStore({
  reducer: {
    main: mainReduser,
    [registerApiSlice.reducerPath]: registerApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      registerApiSlice.middleware,
      authApiSlice.middleware
    ),
});

// Тип всего состояния
export type RootState = ReturnType<typeof store.getState>;

// Тип dispatch
export type AppDispatch = typeof store.dispatch;
