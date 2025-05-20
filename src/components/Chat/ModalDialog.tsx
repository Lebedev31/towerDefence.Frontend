"use client";
import styles from "@/styles/chat/modalDialog.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Api/store";
import { setOpenModal } from "@/Api/Slice/mainSlice";

function ModalDialog() {
  const dispatch: AppDispatch = useDispatch();
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
          className={styles.modalDialog__textarea}
          placeholder="Введите сообщение..."
        ></textarea>
        <div className={styles.modalDialog__buttons}>
          <button className={styles.modalDialog__button} type="button">
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDialog;
