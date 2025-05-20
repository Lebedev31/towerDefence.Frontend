"use client";
import styles from "@/styles/chat/chat.module.scss";
import { useGetChatUsersQuery } from "../../Api/ApiSlice/chat.api.slice";
import ChatUser from "./ChatUser";

export default function Chat() {
  const { data } = useGetChatUsersQuery();
  return (
    <div className={styles.chat_container}>
      <h2 className={styles.centered_title}>Глобальный чат</h2>
      <div className={styles.chat_content}>
        <div className={styles.online_users}>
          <h3 className={styles.centered_subtitle}>В сети</h3>
          <div className={styles.sections_wrapper}>
            <div className={styles.section}>
              {data &&
                data.map((user, id) => <ChatUser key={id} name={user.name} />)}
            </div>
          </div>
        </div>
        <div className={styles.messages}>
          <h3 className={styles.centered_subtitle}>Сообщения</h3>
        </div>
      </div>
    </div>
  );
}
