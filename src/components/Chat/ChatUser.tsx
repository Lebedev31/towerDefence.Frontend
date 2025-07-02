"use client";
import Image from "next/image";
import styles from "@/styles/chat/chatUser.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Api/store";
import { setOpenModal, setIdUser } from "@/Api/Slice/mainSlice";
import { useState } from "react";
import {
  useAddFriendMutation,
  useRemoveFriendMutation,
} from "@/Api/ApiSlice/friends.api.slice";

interface ChatUserProps {
  name: string;
  id: string;
  isFriend?: boolean;
}

export default function ChatUser({
  name,
  id,
  isFriend = false,
}: ChatUserProps) {
  const dispatch: AppDispatch = useDispatch();
  const [isUserFriend, setIsUserFriend] = useState(isFriend);
  const [addFriend] = useAddFriendMutation();
  const [removeFriend] = useRemoveFriendMutation();

  const handleFriendAction = async () => {
    try {
      if (isUserFriend) {
        await removeFriend(id);
      } else {
        await addFriend(id);
      }
      setIsUserFriend(!isUserFriend);
    } catch (error) {
      console.error("Ошибка при работе с друзьями:", error);
    }
  };

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
      <div className={styles.buttons_container}>
        <button
          className={styles.message_button}
          onClick={() => {
            dispatch(setOpenModal(true));
            dispatch(setIdUser(id));
          }}
        >
          Написать пользователю
        </button>
        <button
          className={`${styles.friend_button} ${
            isUserFriend ? styles.remove_friend : styles.add_friend
          }`}
          onClick={handleFriendAction}
        >
          {isUserFriend ? "Удалить из друзей" : "Добавить в друзья"}
        </button>
      </div>
    </div>
  );
}
