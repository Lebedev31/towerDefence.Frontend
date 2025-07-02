import { useForm } from "react-hook-form";
import styles from "@/styles/auth.module.scss";
import { Registration as RegistrationType } from "@/type/type";
import { validationRules } from "./validation";
import { useRegistrationMutation } from "@/Api/ApiSlice/register.api.slice";
import { setToggle } from "@/Api/Slice/mainSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Api/store";
import { toast } from "react-toastify";
import { rtkError } from "@/Api/function/errorFunction";
import { ClipLoader } from "react-spinners";

export function Registration() {
  const dispatch: AppDispatch = useDispatch();
  const [registration, { isLoading }] = useRegistrationMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationType>({ mode: "onChange" });

  const onSubmit = async (data: RegistrationType) => {
    delete data.confirmPassword;
    try {
      const response = await registration(data).unwrap();
      if (response) {
        toast.success("Регистрация прошла успешно!");
        dispatch(setToggle(false));
      } else {
      }
    } catch (error) {
      const errorMessage = rtkError(error);
      toast.error(errorMessage);
    }
  };

  return (
    <form className={styles.auth_form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form_group}>
        <input
          {...register("name", validationRules.name)}
          placeholder="Имя"
          className={styles.form_input}
        />
        {errors.name && (
          <span className={styles.error_message}>{errors.name.message}</span>
        )}
      </div>

      <div className={styles.form_group}>
        <input
          {...register("email", validationRules.email)}
          placeholder="Email"
          className={styles.form_input}
        />
        {errors.email && (
          <span className={styles.error_message}>{errors.email.message}</span>
        )}
      </div>

      <div className={styles.form_group}>
        <input
          {...register("password", validationRules.password)}
          placeholder="Пароль"
          className={styles.form_input}
        />
        {errors.password && (
          <span className={styles.error_message}>
            {errors.password.message}
          </span>
        )}
      </div>

      <div className={styles.form_group}>
        <input
          {...register("confirmPassword", validationRules.confirmPassword)}
          type="password"
          placeholder="Повторить пароль"
          className={styles.form_input}
        />
        {errors.confirmPassword && (
          <span className={styles.error_message}>
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <button type="submit" className={styles.form_button}>
        {!isLoading && "Зарегестрироваться"}
        <ClipLoader
          color="#36d7b7" // Цвет спиннера
          loading={isLoading} // Видимость контролируется пропсом loading
          size={25} // Размер в px
          aria-label="Загрузка" // Текст для скринридеров
          data-testid="loader"
        />
      </button>
    </form>
  );
}
