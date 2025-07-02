import style from "@/styles/main.module.scss";
import { Auth } from "./Auth/Auth";
import { Registration } from "./Auth/Registration";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Api/store";
import { setToggle } from "@/Api/Slice/mainSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/Api/store";

function Main() {
  const dispatch: AppDispatch = useDispatch();
  const selectorToggle = useSelector((state: RootState) => state.main.toggle);
  return (
    <div className={style.main_wrapper}>
      <div className={style.main_form}>
        <div className={style.main_button_container}>
          <button
            className={style.main_button}
            onClick={() => {
              dispatch(setToggle(false));
            }}
          >
            Войти
          </button>
          <button
            className={style.main_button}
            onClick={() => {
              dispatch(setToggle(true));
            }}
          >
            Зарегистрироваться
          </button>
        </div>
        {selectorToggle ? <Registration /> : <Auth />}
      </div>
    </div>
  );
}

export default Main;
