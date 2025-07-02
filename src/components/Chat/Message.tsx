// Этот компонент будет использоваться для отображения сообщений в чате
import styles from "@/styles/chat/message.module.scss";

type MessageProps = {
  message: string;
  date: string;
  isRead: boolean; // Этот флаг пока не используется в стилях, но оставлен
  id: string;
  idUser: string;
};

function Message({ message, date, isRead, id, idUser }: MessageProps) {
  return (
    <div
      className={`${styles.messageContainer} ${
        isRead ? styles.read : styles.unread
      }`}
    >
      <p
        className={
          idUser === id ? styles.messageText : styles.messageTextOpponent
        }
      >
        {message}
      </p>
      <span className={styles.messageDate}>{date}</span>
    </div>
  );
}
export default Message;
