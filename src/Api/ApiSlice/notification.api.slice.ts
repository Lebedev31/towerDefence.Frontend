/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { startSocketClient, socketConnect, socketError } from "../soket/soket"; // ваш клиент
import { SocketNotificationsListiner } from "../soket/soket";
import { MessageServer } from "@/type/type";

export interface NotificationItem {
  id: string;
  text: string;
  time: string;
  userId: string;
}

export const notifitionsApiSlice = createApi({
  reducerPath: "notificationApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    // Получение списка уведомлений
    getNotifications: builder.query<NotificationItem[], void>({
      async queryFn() {
        return { data: [] };
      },
      keepUnusedDataFor: 0,
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = startSocketClient("/chat");
        try {
          await cacheDataLoaded;
          if (!socket.connected) {
            socket.connect();
            socketConnect(socket);
          }
          socket.emit(SocketNotificationsListiner.GETNOTIFICATIONS);

          socket.on(
            SocketNotificationsListiner.NOTIFICATIONSLIST,
            (notifications: NotificationItem[]) => {
              if (Array.isArray(notifications)) {
                updateCachedData(() => {
                  return [...notifications];
                });
              }
            }
          );
        } catch (error) {
          socketError(socket);
        }

        await cacheEntryRemoved;
      },
    }),

    // Удаление уведомления
    removeNotification: builder.mutation<MessageServer, string>({
      async queryFn(notificationId) {
        const socket = startSocketClient("/chat");
        if (!socket.connected) {
          socket.connect();
          socketConnect(socket);
        }
        try {
          socket.emit(SocketNotificationsListiner.REMOVENOTIFICATION, {
            notificationId,
          });
        } catch (error) {
          socketError(socket);
        }
        return { data: { message: { success: true } } };
      },
    }),
  }),
});

export const { useRemoveNotificationMutation, useGetNotificationsQuery } =
  notifitionsApiSlice;
