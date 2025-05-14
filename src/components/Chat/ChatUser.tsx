import Image from "next/image";
import styles from "@/styles/chat/chatUser.module.scss";

interface ChatUserProps {
  name: string;
}

export default function ChatUser({ name }: ChatUserProps) {
  return (
    <div className={styles.user_container}>
      <div className={styles.user_avatar}>
        <Image
          src={"/default-avatar.png"}
          alt={`${name} аватар`}
          width={40}
          height={40}
          className={styles.avatar_image}
        />
      </div>
      <div className={styles.user_name}>{name}</div>
      <button className={styles.message_button}>Написать пользователю</button>
    </div>
  );
}
