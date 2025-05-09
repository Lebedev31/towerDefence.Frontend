"use client";
import styles from "@/styles/menu/menu.module.scss";
import Link from "next/link";
import { deleteToken } from "@/Api/function/deleteToken";
import { useLogoutMutation } from "@/Api/ApiSlice/auth.api.slice";
import { rtkError } from "@/Api/function/errorFunction";
import { toast } from "react-toastify";
import Chat from "@/components/Chat/Chat";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Api/store";
import { clearPersonalData } from "@/Api/Slice/mainSlice";

export default function Menu() {
  const [logout] = useLogoutMutation();
  const dispatch: AppDispatch = useDispatch();
  async function logoutUser(): Promise<void> {
    try {
      const log = await logout().unwrap();
      if (log.message.success) {
        deleteToken();
        dispatch(clearPersonalData());
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
          <button className={styles.button_item}>В Бой!</button>
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
      </div>
    </div>
  );
}
