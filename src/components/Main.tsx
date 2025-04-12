"use client";
import style from "@/styles/main.module.scss";
import { Auth } from "./Auth/Auth";
import { Registration } from "./Auth/Registration";
import { useState } from "react";

function Main() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className={style.main_wrapper}>
      <div className={style.main_form}>
        <div className={style.main_button_container}>
          <button
            className={style.main_button}
            onClick={() => setToggle(false)}
          >
            Войти
          </button>
          <button className={style.main_button} onClick={() => setToggle(true)}>
            Зарегистрироваться
          </button>
        </div>
        {toggle ? <Registration /> : <Auth />}
      </div>
    </div>
  );
}

export default Main;
