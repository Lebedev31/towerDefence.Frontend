"use client";
import styles from "@/styles/notification/notificationPanel.module.scss";
import { useRemoveFriendMutation } from "@/Api/ApiSlice/friends.api.slice";
import { useRemoveNotificationMutation } from "@/Api/ApiSlice/notification.api.slice";

interface NotificationItem {
  id: string;
  text: string;
  time: string;
  userId: string;
}

interface FriendItem {
  id: string;
  name: string;
  status: "online" | "offline";
}

interface NotificationTabProps {
  type: "notifications" | "friends";
  items: NotificationItem[] | FriendItem[];
  onOpenChat: (userId: string) => void;
}

export default function NotificationTab({
  type,
  items,
  onOpenChat,
}: NotificationTabProps) {
  const [removeFriend] = useRemoveFriendMutation();
  const [removeNotification] = useRemoveNotificationMutation();

  const handleRemoveFriend = async (id: string) => {
    try {
      await removeFriend(id);
    } catch (error) {
      console.error("Ошибка при удалении из друзей:", error);
    }
  };

  const handleRemoveNotification = async (id: string) => {
    try {
      await removeNotification(id);
    } catch (error) {
      console.error("Ошибка при удалении уведомления:", error);
    }
  };

  if (items.length === 0) {
    return (
      <div className={styles.empty_tab}>
        {type === "notifications"
          ? "Нет новых уведомлений"
          : "Список друзей пуст"}
      </div>
    );
  }

  return (
    <div className={styles.tab_content}>
      {type === "notifications" && (
        <ul className={styles.notification_list}>
          {(items as NotificationItem[]).map((item) => (
            <li key={item.id} className={styles.notification_item}>
              <div className={styles.notification_text}>{item.text}</div>
              <div className={styles.notification_time}>{item.time}</div>
              <div className={styles.notification_actions}>
                <button
                  className={styles.action_button}
                  onClick={() => onOpenChat(item.userId)}
                >
                  Написать
                </button>
                <button
                  className={`${styles.action_button} ${styles.remove_button}`}
                  onClick={() => handleRemoveNotification(item.id)}
                >
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {type === "friends" && (
        <ul className={styles.friends_list}>
          {(items as FriendItem[]).map((friend) => (
            <li key={friend.id} className={styles.friend_item}>
              <div className={styles.friend_info}>
                <span className={styles.friend_name}>{friend.name}</span>
                <span
                  className={`${styles.status_indicator} ${
                    styles[friend.status]
                  }`}
                ></span>
              </div>
              <div className={styles.friend_actions}>
                <button
                  className={styles.action_button}
                  onClick={() => onOpenChat(friend.id)}
                >
                  Написать
                </button>
                <button
                  className={`${styles.action_button} ${styles.remove_button}`}
                  onClick={() => handleRemoveFriend(friend.id)}
                >
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
