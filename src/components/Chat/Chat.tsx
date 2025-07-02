"use client";
import styles from "@/styles/chat/chat.module.scss";
import { useGetChatUsersQuery } from "../../Api/ApiSlice/chat.api.slice";
import ChatUser from "./ChatUser";
import { PushGlobalMessage } from "@/type/type";
import MessageGlobal from "./MessageGlobal";
import { useRef } from "react";
import {
  useGetChatGlobalUsersQuery,
  useSendMessageMutation,
} from "@/Api/ApiSlice/global.api.chats.slice";
import { rtkError } from "@/Api/function/errorFunction";
import { toast } from "react-toastify";
import { useState } from "react";

export default function Chat() {
  const { data } = useGetChatUsersQuery();
  const { data: globalMessageData } = useGetChatGlobalUsersQuery();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [infoMessage, setInfoMessage] = useState<PushGlobalMessage>({
    message: "",
  });
  function handleFocus(): void;
  function handleFocus(parentId: string, answers: string): void;
  function handleFocus(parentId?: string, answers?: string): void {
    textAreaRef.current?.focus();
    setInfoMessage({
      message: "",
      ...(parentId ? { parentId } : {}),
      ...(answers ? { answers } : {}),
    });
  }
  const [sendMessage] = useSendMessageMutation();

  const sendGlobalMessage = async (message: PushGlobalMessage) => {
    console.log(message);
    try {
      await sendMessage(message).unwrap();
      setInfoMessage({
        message: "",
      });
      if (textAreaRef.current) {
        textAreaRef.current.value = "";
      }
    } catch (error) {
      const err = rtkError(error);
      toast.error(err);
    }
  };
  return (
    <div className={styles.chat_container}>
      <h2 className={styles.centered_title}>Глобальный чат</h2>
      <div className={styles.chat_content}>
        <div className={styles.online_users}>
          <h3 className={styles.centered_subtitle}>В сети</h3>
          <div className={styles.sections_wrapper}>
            <div className={styles.section}>
              {data &&
                data.map((user, num) => (
                  <ChatUser key={num} id={user.id} name={user.name} />
                ))}
            </div>
          </div>
        </div>
        <div className={styles.messages}>
          <h3 className={styles.centered_subtitle}>Сообщения</h3>
          <div className={styles.container_messages}>
            {globalMessageData &&
              globalMessageData.map((message) => (
                <MessageGlobal
                  key={message._id}
                  {...message}
                  handleFocus={handleFocus}
                />
              ))}
          </div>
          <textarea
            className={styles.global_chat_textarea}
            placeholder="Введите сообщение"
            ref={textAreaRef}
          ></textarea>
          <div className={styles.buttons}>
            <button
              className={styles.send_button}
              onClick={() =>
                sendGlobalMessage({
                  ...infoMessage,
                  message: textAreaRef.current?.value
                    ? textAreaRef.current.value
                    : "",
                })
              }
            >
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
