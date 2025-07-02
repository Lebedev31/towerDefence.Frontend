"use client";
import { useState } from "react";
import styles from "@/styles/notification/notificationPanel.module.scss";
import NotificationTab from "./NotificationTab";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Api/store";
import { setOpenModal, setIdUser } from "@/Api/Slice/mainSlice";
import { useGetFriendsQuery } from "@/Api/ApiSlice/friends.api.slice";
import { useGetNotificationsQuery } from "@/Api/ApiSlice/notification.api.slice";

interface NotificationMenuProps {
  onClose: () => void;
}

type TabType = "friends" | "notifications";

export default function NotificationMenu({ onClose }: NotificationMenuProps) {
  const [activeTab, setActiveTab] = useState<TabType>("notifications");
  const { data: friends = [] } = useGetFriendsQuery();
  const { data: notifications = [] } = useGetNotificationsQuery();
  const dispatch: AppDispatch = useDispatch();

  const handleOpenChat = (userId: string) => {
    dispatch(setOpenModal(true));
    dispatch(setIdUser(userId));
    onClose();
  };

  return (
    <div className={styles.notification_menu}>
      <div className={styles.menu_header}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab_button} ${
              activeTab === "notifications" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            Оповещения
          </button>
          <button
            className={`${styles.tab_button} ${
              activeTab === "friends" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("friends")}
          >
            Друзья
          </button>
        </div>
        <button className={styles.close_button} onClick={onClose}>
          &times;
        </button>
      </div>

      <div className={styles.menu_content}>
        {activeTab === "notifications" && (
          <NotificationTab
            type="notifications"
            items={notifications}
            onOpenChat={handleOpenChat}
          />
        )}

        {activeTab === "friends" && (
          <NotificationTab
            type="friends"
            items={friends}
            onOpenChat={handleOpenChat}
          />
        )}
      </div>
    </div>
  );
}
