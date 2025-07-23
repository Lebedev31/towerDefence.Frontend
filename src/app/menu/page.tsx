"use client";
import styles from "@/styles/menu/menu.module.scss";
import Link from "next/link";
import { deleteToken } from "@/Api/function/deleteToken";
import { useLogoutMutation } from "@/Api/ApiSlice/auth.api.slice";
import { rtkError } from "@/Api/function/errorFunction";
import { toast } from "react-toastify";
import Chat from "@/components/Chat/Chat";
import ModalDialog from "@/components/Chat/ModalDialog";
import NotificationPanel from "@/components/Notification/NotificationPanel"; // Добавляем импорт
import { useSelector } from "react-redux";
import { RootState } from "@/Api/store";

export default function Menu() {
  const [logout] = useLogoutMutation();
  const isOpen = useSelector((state: RootState) => state.main.isOpen);
  const hasNewNotifications = useSelector(
    (state: RootState) => state.main.hasNewNotifications
  );
  const hasNewFriendRequests = useSelector(
    (state: RootState) => state.main.hasNewFriendRequests
  );

  async function logoutUser(): Promise<void> {
    deleteToken();
    try {
      const log = await logout().unwrap();
      if (log.message.success) {
        toast.info("Вы вышли из аккаунта");
      }
    } catch (error) {
      const messageError = rtkError(error);
      toast.error(messageError);
    }
  }
  return (
    <div className="container">
      <div className={styles.menu_wrapper}>
        <div className={styles.button_block}>
          <button className={styles.button_item}>Личный кабинет</button>
          <Link href="/preload" className={styles.link}>
            <button className={styles.button_item}>В Бой!</button>
          </Link>
          {isOpen && <ModalDialog />}
          <Link href="/" className={styles.link}>
            {" "}
            <button onClick={() => logoutUser()} className={styles.button_item}>
              Выйти
            </button>
          </Link>
        </div>
        <div className={styles.chat_block}>
          <Chat />
        </div>

        {/* Добавляем панель уведомлений */}
        <NotificationPanel
          hasNewNotifications={hasNewNotifications}
          hasNewFriendRequests={hasNewFriendRequests}
        />
      </div>
    </div>
  );
}
