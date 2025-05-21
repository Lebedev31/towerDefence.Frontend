"use client";
import styles from "@/styles/chat/modalDialog.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Api/store";
import { setOpenModal } from "@/Api/Slice/mainSlice";
import { useRef } from "react";
import { useSendMessageMutation } from "@/Api/ApiSlice/chat.api.slice";
import { RootState } from "@/Api/store";
import { useSelector } from "react-redux";

function ModalDialog() {
  const dispatch: AppDispatch = useDispatch();
  const idUser = useSelector((state: RootState) => state.main.idUser);
  const [sendMessage] = useSendMessageMutation();
  const messageRef = useRef<HTMLTextAreaElement>(null);

  async function send(): Promise<void> {
    if (messageRef.current && messageRef.current.value && idUser) {
      await sendMessage({
        id: idUser,
        message: messageRef.current.value,
        date: new Date().toISOString(),
        isRead: false,
      });

      messageRef.current.value = ""; // очищаем поле ввода после отправки сообщения
    }
  }
  return (
    <div className={styles.modalDialog}>
      <div className={styles.modalDialog__header}>
        <h3 className={styles.modalDialog__title}>Диалог с игроком</h3>
        <button
          className={styles.modalDialog__close}
          onClick={() => dispatch(setOpenModal(false))}
        >
          ×
        </button>
      </div>
      <div className={styles.modalDialog__content}>
        {/* Здесь можно разместить основное содержимое модального окна */}
      </div>
      <div className={styles.modalDialog__footer}>
        <textarea
          ref={messageRef}
          className={styles.modalDialog__textarea}
          placeholder="Введите сообщение..."
        ></textarea>
        <div className={styles.modalDialog__buttons}>
          <button
            className={styles.modalDialog__button}
            type="button"
            onClick={() => send()}
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDialog;
