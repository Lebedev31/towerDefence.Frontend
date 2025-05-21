import Image from "next/image";
import styles from "@/styles/chat/chatUser.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Api/store";
import { setOpenModal, setIdUser } from "@/Api/Slice/mainSlice";
import { useLazyStartChatQuery } from "@/Api/ApiSlice/chat.api.slice";

interface ChatUserProps {
  name: string;
  id: string;
}

export default function ChatUser({ name, id }: ChatUserProps) {
  const [trigger] = useLazyStartChatQuery();
  const dispatch: AppDispatch = useDispatch();
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
      <button
        className={styles.message_button}
        onClick={() => {
          dispatch(setOpenModal(true));
          dispatch(setIdUser(id));
          trigger(id);
        }}
      >
        Написать пользователю
      </button>
    </div>
  );
}
