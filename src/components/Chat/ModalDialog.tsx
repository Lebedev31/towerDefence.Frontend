"use client";
import styles from "@/styles/chat/modalDialog.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Api/store";
import { setOpenModal } from "@/Api/Slice/mainSlice";
import { useRef } from "react";
import { useSendMessageMutation } from "@/Api/ApiSlice/chat.api.slice";
import Message from "./Message";
import { useSelector } from "react-redux";
import { RootState } from "@/Api/store";
import { useStartChatQuery } from "@/Api/ApiSlice/chat.api.slice";

function ModalDialog() {
  const dispatch: AppDispatch = useDispatch();
  const idUser = useSelector((state: RootState) => state.main.idUser);
  const [sendMessage] = useSendMessageMutation();
  const messageRef = useRef<HTMLTextAreaElement>(null); // Типизируем ref
  const { data: messages } = useStartChatQuery(idUser);

  async function handleSendMessage(): Promise<void> {
    // Исправлено название функции для ясности
    if (messageRef.current && messageRef.current.value && idUser) {
      await sendMessage({
        id: idUser, // Убедитесь, что это правильный ID для диалога/получателя
        message: messageRef.current.value,
        date: new Date().toISOString(),
        isRead: false, // Сообщения, отправленные пользователем, могут не нуждаться в этом флаге здесь
      });
      messageRef.current.value = ""; // очищаем поле ввода после отправки сообщения
    }
  }

  return (
    <div className={styles.modalDialogOverlay}>
      {" "}
      <div className={styles.modalDialog}>
        <div className={styles.modalDialog__header}>
          <h2 className={styles.modalDialog__title}>Диалог с игроком</h2>
          <button
            className={styles.modalDialog__close}
            onClick={() => {
              dispatch(setOpenModal(false));
            }}
          >
            &times;
          </button>
        </div>

        <div className={styles.modalDialog__content}>
          {messages && messages.length > 0 ? (
            messages.map((msg, index) => {
              // msg вместо message, чтобы избежать конфликта имен
              return (
                <Message
                  key={index} // Ключ лучше делать уникальным, например msg.id если есть
                  message={msg.message}
                  date={msg.date}
                  isRead={msg.isRead}
                  id={msg.id}
                  idUser={idUser}
                />
              );
            })
          ) : (
            <p className={styles.modalDialog__noMessages}>
              Сообщений пока нет.
            </p>
          )}
        </div>

        <div className={styles.modalDialog__footer}>
          <textarea
            ref={messageRef}
            className={styles.modalDialog__textarea}
            placeholder="Введите сообщение..."
          />
          <div className={styles.modalDialog__buttons}>
            <button
              className={styles.modalDialog__button}
              onClick={handleSendMessage} // Используем обновленное название функции
            >
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ModalDialog;
