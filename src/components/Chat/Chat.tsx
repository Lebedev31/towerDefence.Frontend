"use client";
import styles from "@/styles/menu/chat.module.scss";
import { useGetChatUsersQuery } from "../../Api/ApiSlice/chat.api.slice";

export default function Chat() {
  const { data = [] } = useGetChatUsersQuery();
  console.log(data);
  return (
    <div className={styles.chat_container}>
      <h2>Глобальный чат</h2>
      <div className={styles.chat_content}>
        <div className={styles.online_users}>
          <h3>В сети</h3>
          {/* Здесь будет список пользователей */}
        </div>
        <div className={styles.messages}>
          <h3>Cообщения</h3>
        </div>
      </div>
    </div>
  );
}
